const { defaultSocketPort } = require('../../src')
const WebSocket = require('ws')
const { AfterAll } = require('@cucumber/cucumber')

let socketClient
let game

const runGameOrDefault = async () => {
  if (!game) {
    game = require('../../test-game')
  }
  return await game
}

const createSocketClientForPathAsync = (path) => {
  return new Promise(async (resolve, reject) => {
    await runGameOrDefault()
    const client = new WebSocket(`ws://localhost:${defaultSocketPort}/${path}`)
    client.on('open', () => {
      resolve(client)
    })
    client.on('error', (err) => {
      reject(err)
    })
  })
}

const createSocketClientOrDefault = () => {
  if (socketClient) return socketClient
  socketClient = createSocketClientForPathAsync('')
}

AfterAll(async () => {
  const resolvedServer = await game
  if (resolvedServer) {
    resolvedServer.shutdown()
  }
})

module.exports = {
  runGameOrDefault,
  createSocketClientOrDefault,
  createSocketClientForPathAsync,
}
