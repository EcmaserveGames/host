const { Given, Then } = require('@cucumber/cucumber')

const http = require('http')
const { gameInstance, createSocketClientForPathAsync } = require('./setup')

Given('server is running', async () => {
  if (!gameInstance) throw new Error('Game not running yet')
})

Then('a websocket is available', async () => {
  const { promise } = createSocketClientForPathAsync('/')
  await promise
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
