const { Given, Then, AfterAll } = require('@cucumber/cucumber')
const { defaultSocketPort } = require('../../src')
const http = require('http')
const { resolve } = require('path')

let game

Given('server is running', () => {
  game = require('../../test-game')
})

Then('a websocket is available', async () => {
  await new Promise((resolve, reject) => {
    const net = require('net')
    const client = net.createConnection({ port: defaultSocketPort }, () => {
      resolve()
    })
    client.on('end', reject)
    client.on('error', reject)
  })
})

Then('an API is available', async () => {
  await new Promise((resolve, reject) => {
    http.get(
      {
        hostname: 'localhost',
        port: 4443,
        path: '/',
      },
      (res) => {
        if (res.statusCode <= 400) {
          resolve(true)
        } else {
          reject(new Error('failed to connect'))
        }
      }
    )
  })
})

AfterAll(() => {
  if (game) {
    game.shutdown()
  }
})
