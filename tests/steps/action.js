const { Given, Then } = require('@cucumber/cucumber')
const { createSocketClientForPathAsync } = require('./setup')
const path = require('path')
/** FOR TYPES ONLY */
const WebSocket = require('ws')
const { loadActionsAsync } = require('../../src/loadProtobufAsync')

/** @type {WebSocket} */
let actionsSocket

Given('participant is connected to an actions socket', async function () {
  const { client, promise } = createSocketClientForPathAsync('actions')
  actionsSocket = client
  await promise
})

Then('an action may be sent', async function () {
  const Actions = await loadActionsAsync(
    path.resolve(__dirname, '../../test-game/Actions.proto'),
    'testgame'
  )

  const action = {
    rollDice: {
      dice1: true,
      dice2: true,
      dice3: true,
      dice4: true,
      dice5: true,
    },
  }
  const error = Actions.verify(action)
  if (error) {
    throw error
  }

  let message = Actions.create(action)
  let buffer = Actions.encode(message).finish()
  actionsSocket.send(buffer)
})

module.exports = {
  getActionsSocket: () => actionsSocket,
}
