const { Given, Then, AfterAll } = require('@cucumber/cucumber')

const http = require('http')
const { createSocketClientOrDefault, runGameOrDefault } = require('./setup')

Given('server is running', async () => {
  await runGameOrDefault()
})

Then('a websocket is available', async () => {
  await createSocketClientOrDefault()
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

Given('I am connected to a socket', async function () {
  return await createSocketClientOrDefault()
})
