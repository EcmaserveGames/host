const { Given, When, Then } = require('@cucumber/cucumber')
const { createSocketClientForPathAsync } = require('./setup')
const protobuf = require('protobufjs')
const path = require('path')
/** FOR TYPES ONLY */
const WebSocket = require('ws')

let firstGameState
let lastGameState
/** @type {WebSocket} */
let stateSocket

Given('the client is receiving game state messages', async () => {
  const { client, promise } = createSocketClientForPathAsync('state')
  stateSocket = client
  stateSocket.on('message', function (message) {
    if (!firstGameState) {
      firstGameState = message
    }
    lastGameState = message
  })
  await promise
})

When('an action is performed', async function () {
  const { promise } = await createSocketClientForPathAsync('actions')
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
  const action = { rollDice: { dice1: true, dice2: true, dice3: true } }
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
    const gameStateChanged = firstGameState !== lastGameState
    if (waited > 1000 && !gameStateChanged) {
      throw new Error('there is no last game state')
    } else if (gameStateChanged) {
      clearInterval(interval)
    }
  }, 2)
})

module.exports = {
  getInitialGameStateBuffer: () => firstGameState,
  getLastGameStateBuffer: () => lastGameState,
  getStateSocket: () => stateSocket,
}
