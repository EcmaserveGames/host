const Koa = require('koa')
const websockify = require('koa-websocket')
const enableDestroy = require('server-destroy')
const {
  loadProtobufAsync,
  loadActionsAsync,
  loadStateAsync,
} = require('./loadProtobufAsync')
const { performAction } = require('./performAction')
const Router = require('@koa/router')
const { Rule, RulesPipeline } = require('./rules')

const defaultApiPort = 4443
const defaultSocketPort = 5252

class GameServer {
  __apiPort = defaultApiPort
  __socketPort = defaultSocketPort
  __api = new Koa()
  __sockets = websockify(this.__api)
  __servers = []
  __actions = {}
  __state = {
    resolver: undefined,
    definition: undefined,
    initial: undefined,
    // TODO isolate for multi-game hosting
    current: undefined,
    connections: [],
  }
  __rules = {
    /** @type {Rule[]} */
    ruleset: [],
    /** @type {RulesPipeline} */
    pipeline: undefined,
  }

  __running = false

  constructor() {
    const socketRouter = new Router()
    socketRouter.all('/actions', ({ websocket }) => {
      websocket.on(
        'message',
        performAction.bind(this, websocket, this.__actions.package)
      )
    })
    socketRouter.all('/state', ({ websocket }) => {
      this.__state.connections.push(websocket)
      const state =
        this.__state.current ||
        this.__state.initial ||
        this.__state.definition.create()
      websocket.send(this.__state.definition.encode(state).finish())
    })

    this.__api.use((ctx, next) => {
      ctx.body = 'Hello World'
      next(ctx)
    })
    this.__sockets.ws.use(socketRouter.routes())
  }

  addProtoFiles(...protoFilenames) {
    this.__actions.orderProtoFileResolvers =
      this.__actions.orderProtoFileResolvers || []
    this.__actions.orderProtoFileResolvers.push(
      Promise.all(protoFilenames.map(loadProtobufAsync))
    )
  }

  useActions(protoFilename, packageName) {
    this.__actions.resolver = () => loadActionsAsync(protoFilename, packageName)
    return this
  }

  /**
   * @param  {...Rule} rules
   */
  useRules(...rules) {
    this.__rules.ruleset = this.__rules.ruleset.concat(rules)
    return this
  }

  useState(protoFilename, packageName, initialValue) {
    this.__state.resolver = () =>
      loadStateAsync(protoFilename, packageName).then((State) => {
        const err = State.verify(initialValue || {})
        if (err) throw err
        this.__state.initial = State.create(initialValue)
        return State
      })
    return this
  }

  async shutdown() {
    const closeOperations = this.__servers.map((s) => {
      return new Promise((resolve) => {
        s.on('close', resolve)
        s.destroy()
      })
    })
    await Promise.all(closeOperations)
    this.__running = false
  }

  async run() {
    this.__rules.pipeline = new RulesPipeline(this.__rules.ruleset)
    // Run before getting into type definitions specific to the game implementation
    await Promise.all(this.__actions.orderProtoFileResolvers || [])
    // TODO: Could be run in parallel
    this.__actions.package = await this.__actions.resolver()
    this.__state.definition = await this.__state.resolver()
    // Setup a new game state
    this.__state.current = this.__state.initial
    this.__servers.push(
      this.__sockets.listen(this.__socketPort),
      this.__sockets.listen(this.__apiPort)
    )
    this.__servers.forEach((s) => enableDestroy(s))
    this.__running = true
    return this
  }
}

module.exports = {
  GameServer,
  defaultApiPort,
  defaultSocketPort,
}
