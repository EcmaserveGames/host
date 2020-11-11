const { defaultPort } = require('../../src')
const WebSocket = require('ws')
const http = require('http')
const path = require('path')
const { After, Before } = require('@cucumber/cucumber')
/** ONLY FOR TYPE INFORMATION */
const { createGameServer } = require('../test-game/game')
const { loadStateAsync } = require('../../src/loadProtobufAsync')
const { sampleToken } = require('../test-game/auth')

let lastCreatedGame

function getLastCreatedGame() {
  return lastCreatedGame
}

let serverInstance = createGameServer()

async function createAGame() {
  lastCreatedGame = await new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: 'localhost',
        port: 4443,
        path: '/games',
        method: 'POST',
      },
      (res) => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      }
    )
    request.on('error', reject)
    request.end()
  })
}

/**
 * Create a WebSocket on a relative path of th server
 * Will start the GameServer if necessary
 * @param {string} path The relative path on the server
 */
const createSocketClientForPathAsync = (path, socketOptions) => {
  const client = new WebSocket(
    `ws://localhost:${defaultPort}${path}`,
    socketOptions || {
      headers: {
        Authorization: sampleToken,
      },
    }
  )
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

let firstGameState
let lastGameState
/** @type {WebSocket} */
let stateSocket

const createAStateSocket = async () => {
  const game = getLastCreatedGame()
  const { client, promise } = createSocketClientForPathAsync(
    game.relativePathStateSocket
  )
  stateSocket = client
  stateSocket.on('message', function (message) {
    if (!firstGameState) {
      firstGameState = message
    }
    lastGameState = message
  })
  await promise
}

async function getGameStateFromBuffer(buffer) {
  const GameState = await loadStateAsync(
    path.resolve(__dirname, '../test-game/State.proto'),
    'testgame'
  )
  return GameState.decode(buffer)
}

async function waitForNextGameState() {
  const buffer = await new Promise((resolve) => {
    stateSocket.addEventListener('message', (event) => resolve(event.data), {
      once: true,
    })
  })
  return getGameStateFromBuffer(buffer)
}

Before(async () => {
  await serverInstance.run()
})

After(async () => {
  if (serverInstance.__running) {
    await serverInstance.shutdown()
  }
})

module.exports = {
  createAGame,
  createAStateSocket,
  getServerInstance: () => serverInstance,
  createSocketClientForPathAsync,
  getInitialGameStateBuffer: () => firstGameState,
  getLastGameStateBuffer: () => lastGameState,
  getStateSocket: () => stateSocket,
  getLastCreatedGame,
  getGameStateFromBuffer,
  waitForNextGameState,
}
