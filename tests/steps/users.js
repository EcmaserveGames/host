const {
  getLastCreatedGame,
  createSocketClientForPathAsync,
} = require('./setup')
const path = require('path')
const protobuf = require('protobufjs')
const { When, Then } = require('@cucumber/cucumber')
const { loadActionResponseAsync } = require('../../src/loadProtobufAsync')

let actionsSocket

When('an action is performed by an ineligible participant', async function () {
  const game = getLastCreatedGame()
  const { promise } = createSocketClientForPathAsync(
    game.relativePathActionsSocket,
    {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwbGF5ZXItMiIsIm5hbWUiOiJKYW5lIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.rIrI-0ORPsaC90qKVhPs3UefrR7gac7mbtAeW69rP0w`,
      },
    }
  )
  actionsSocket = await promise
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
  actionsSocket.send(buffer)
})

Then('the ineligile action is rejected by rules', async function () {
  // Write code here that turns the phrase above into concrete actions
  const nextMessageBuffer = await new Promise((resolve) => {
    actionsSocket.on('message', resolve)
  })
  const ActionResponse = await loadActionResponseAsync()
  const response = ActionResponse.decode(nextMessageBuffer)
  if (response.accepted) throw new Error('action should not be accepted')
})
