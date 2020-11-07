const { performAction, createActionResponse } = require('./performAction')
const Router = require('@koa/router')

function createSocketRouter(
  StateDefinition,
  ActionsDefinition,
  GameRegistry,
  RulesPipeline,
  Mechanics
) {
  const socketRouter = new Router()
  socketRouter.all('/games/:id/actions', async ({ websocket, params }) => {
    const { id: gameId } = params
    const hasGame = await GameRegistry.has(gameId)
    if (!hasGame) {
      websocket.close(1003)
      return
    }
    websocket.on('message', async (message) => {
      const Game = await GameRegistry.get(gameId)
      const actionContext = {
        Game,
        RulesPipeline,
        ActionsDefinition,
        StateDefinition,
        Mechanics,
      }
      const result = await performAction(message, actionContext)
      const buffer = await createActionResponse(...result)
      websocket.send(buffer)
    })
  })
  socketRouter.all('/games/:id/state', async ({ websocket, params }) => {
    const { id: gameId } = params
    const hasGame = await GameRegistry.has(gameId)
    if (!hasGame) {
      websocket.close(1003)
      return
    }
    const Game = await GameRegistry.get(gameId)
    await Game.connect(websocket)
  })
  return socketRouter
}
module.exports = {
  createSocketRouter,
}
