const { Given, Then } = require('@cucumber/cucumber')
const {
  createSocketClientForPathAsync,
  getLastCreatedGame,
} = require('./setup')
const path = require('path')
const {
  loadActionsAsync,
  loadActionResponseAsync,
} = require('../../src/loadProtobufAsync')

/** FOR TYPES ONLY */
const WebSocket = require('ws')

/** @type {WebSocket} */
let actionsSocket

const getNextActionResponsePromise = () => {
  return new Promise((resolve) => {
    actionsSocket.addEventListener('message', (event) => resolve(event.data), {
      once: true,
    })
  })
}

Given('participant is connected to an actions socket', async function () {
  const game = getLastCreatedGame()
  const { client, promise } = createSocketClientForPathAsync(
    game.relativePathActionsSocket
  )
  actionsSocket = client
  await promise
})

Then('an action may be sent', async function () {
  const Actions = await loadActionsAsync(
    path.resolve(__dirname, '../test-game/Actions.proto'),
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

Then('a response message will be returned', async () => {
  const response = await getNextActionResponsePromise()
  ActionsResponse = await loadActionResponseAsync()
  const message = ActionsResponse.decode(response)
  if (!message) {
    throw new Error('should have gotten a message')
  }
})

module.exports = {
  getActionsSocket: () => actionsSocket,
  getNextActionResponsePromise,
}
