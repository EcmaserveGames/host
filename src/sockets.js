const { performAction, createActionResponse } = require('./performAction')
const Router = require('@koa/router')
const debug = require('./debug')

function createSocketRouter(
  StateDefinition,
  ActionsDefinition,
  GameRegistry,
  RulesPipeline,
  Mechanics,
  Masks
) {
  const socketRouter = new Router()
  socketRouter.all(
    '/games/:id/actions',
    async ({ websocket, params, state }) => {
      const { id: gameId } = params
      const hasGame = await GameRegistry.has(gameId)
      if (!hasGame) {
        websocket.close(1003)
        return
      }
      websocket.on('message', async (message) => {
        if (!(message instanceof Buffer)) {
          // This is not a protobuf message and can be ignored;
          debug('Actions message ignored')
          return
        }
        const Game = await GameRegistry.get(gameId)
        const actionContext = {
          User: state.user,
          Game,
          RulesPipeline,
          ActionsDefinition,
          StateDefinition,
          Mechanics,
        }
        const result = await performAction(message, actionContext)
        const buffer = await createActionResponse(
          ...result,
          ActionsDefinition,
          message
        )
        websocket.send(buffer)
      })
    }
  )
  socketRouter.all(
    '/games/:id/state',
    async ({ websocket, params, state: connectionState }) => {
      const { id: gameId } = params
      const hasGame = await GameRegistry.has(gameId)
      if (!hasGame) {
        websocket.close(1003)
        return
      }
      const Game = await GameRegistry.get(gameId)
      const revoke = await Game.connect(async (buffer) => {
        // Read the buffer
        const state = StateDefinition.decode(buffer)
        // Mask it
        const mutate = (mutation) => mutation(state)
        await Masks.reduce((chain, mask) => {
          return chain.then(() => mask({ User: connectionState.user, mutate }))
        }, Promise.resolve())
        // Encode new message
        const outputBuffer = StateDefinition.encode(state).finish()
        websocket.send(outputBuffer)
      })
      websocket.on('close', revoke)
    }
  )
  return socketRouter
}
module.exports = {
  createSocketRouter,
}
