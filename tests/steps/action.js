const { Then } = require('@cucumber/cucumber')
const { createSocketClientForPathAsync } = require('./setup')
const protobuf = require('protobufjs')
const path = require('path')

Then('an action may be sent', async function () {
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
