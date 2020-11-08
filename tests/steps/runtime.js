const { Given, Then } = require('@cucumber/cucumber')
const http = require('http')
const { getServerInstance } = require('./setup')

Given('server is running', async () => {
  if (!getServerInstance()) throw new Error('Game not running yet')
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

Then('the game can provide their own routes', async () => {
  const data = await new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: 'localhost',
        port: 4443,
        path: '/',
        method: 'GET',
      },
      (res) => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          resolve(data)
        })
      }
    )
    request.on('error', reject)
    request.end()
  })
  if (data !== 'MY CUSTOM SITE') throw new Error('did not get custom page')
})
