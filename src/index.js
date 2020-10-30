const Koa = require('koa')
const websockify = require('koa-websocket')
const enableDestroy = require('server-destroy')

const defaultApiPort = 4443
const defaultSocketPort = 8443

class GameServer {
  __apiPort = defaultApiPort
  __socketPort = defaultSocketPort
  __api = new Koa()
  __sockets = websockify(this.__api)
  __servers = []

  constructor() {
    this.__api.use((ctx, next) => {
      ctx.body = 'Hello World'
      next(ctx)
    })
  }

  shutdown() {
    this.__servers.forEach((s) => s.destroy())
  }

  run() {
    this.__servers.push(
      this.__api.listen(this.__apiPort),
      this.__sockets.listen(this.__socketPort)
    )
    this.__servers.forEach((s) => enableDestroy(s))
    return this
  }
}

module.exports = {
  GameServer,
  defaultApiPort,
  defaultSocketPort,
}
