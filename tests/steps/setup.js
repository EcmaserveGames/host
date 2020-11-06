const { defaultSocketPort } = require('../../src')
const WebSocket = require('ws')
const { After, Before } = require('@cucumber/cucumber')
/** ONLY FOR TYPE INFORMATION */
const { createGameServer } = require('../test-game/game')

let gameInstance = createGameServer()

/**
 * Create a WebSocket on a relative path of th server
 * Will start the GameServer if necessary
 * @param {string} path The relative path on the server
 */
const createSocketClientForPathAsync = (path) => {
  const client = new WebSocket(`ws://localhost:${defaultSocketPort}/${path}`)
  return {
    client,
    promise: new Promise(async (resolve, reject) => {
      client.on('open', () => {
        resolve(client)
      })
      client.on('error', (err) => {
        reject(err)
      })
    }),
  }
}

Before(async () => {
  await gameInstance.run()
})

After(async () => {
  if (gameInstance.__running) {
    await gameInstance.shutdown()
  }
})

module.exports = {
  gameInstance,
  createSocketClientForPathAsync,
}
