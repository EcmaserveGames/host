const { Given, When, Then } = require('@cucumber/cucumber')
const { createSocketClientForPathAsync } = require('./setup')
const protobuf = require('protobufjs')
const path = require('path')

let lastGameState

Given('the client is receiving game state messages', async () => {
  const client = await createSocketClientForPathAsync('state')
  client.on('message', function (message) {
    lastGameState = message
  })
})

When('an action is performed', async function () {
  const client = await createSocketClientForPathAsync('actions')
  const actions = await new Promise((resolve, reject) => {
    protobuf.load(
      path.resolve(__dirname, '../../test-game/Actions.proto'),
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
    if (waited > 1000 && !lastGameState) {
      throw new Error('there is no last game state')
    } else if (lastGameState) {
      clearInterval(interval)
    }
  }, 2)
})
