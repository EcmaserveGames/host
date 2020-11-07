const { Given, When, Then } = require('@cucumber/cucumber')
const {
  createSocketClientForPathAsync,
  createAStateSocket,
  getLastCreatedGame,
  getInitialGameStateBuffer,
  getLastGameStateBuffer,
  getGameStateFromBuffer,
} = require('./setup')
const protobuf = require('protobufjs')
const path = require('path')
/** FOR TYPES ONLY */
const WebSocket = require('ws')

When('the client connects to game state', createAStateSocket)

Given('the client is receiving game state messages', createAStateSocket)

When('an action is performed', async function () {
  const game = getLastCreatedGame()
  const { promise } = createSocketClientForPathAsync(
    game.relativePathActionsSocket
  )
  const client = await promise
  const actions = await new Promise((resolve, reject) => {
    protobuf.load(
      path.resolve(__dirname, '../test-game/Actions.proto'),
      (err, root) => {
        if (err) return reject(err)
        resolve(root.lookupType('testgame.Actions'))
      }
    )
  })
  const action = {
    rollDice: {
      dice1: true,
      dice2: true,
      dice3: true,
      dice4: true,
      dice5: true,
    },
  }
  const error = actions.verify(action)
  if (error) {
    throw error
  }

  let message = actions.create(action)
  let buffer = actions.encode(message).finish()
  client.send(buffer)
})

Then('the game state is emitted on all connections', function () {
  let waited = 0
  const interval = setInterval(() => {
    waited += 2
    const gameStateChanged =
      getInitialGameStateBuffer() !== getLastGameStateBuffer()
    if (waited > 1000 && !gameStateChanged) {
      throw new Error('there is no last game state')
    } else if (gameStateChanged) {
      clearInterval(interval)
    }
  }, 2)
})

Then('private game state can be hidden', async function () {
  const gameState = await getGameStateFromBuffer(getLastGameStateBuffer())
  if (gameState.secretValue)
    throw new Error('secretValue should not be published')
})

module.exports = {}
