const Koa = require('koa')
const websockify = require('koa-websocket')
const enableDestroy = require('server-destroy')
const debug = require('./debug')
const {
  loadProtobufAsync,
  loadActionsAsync,
  loadStateAsync,
} = require('./loadProtobufAsync')
const { Rule, RulesPipeline } = require('./rules')
const { createApiRouter } = require('./api')
const { createSocketRouter } = require('./sockets')
const { GameRegistry } = require('./game')
const { MemoryStorage } = require('./memory_storage')
const { Mechanic } = require('./mechanics')

const defaultPort = 4443

class GameServer {
  __port = defaultPort
  __servers = []
  __storage = new MemoryStorage()
  __dependencyResolvers = []
  __gameRegistry = undefined
  __actionsResolver = undefined
  __stateResolver = undefined
  __initialGameState = undefined
  __stateMasks = []
  __rules = []
  __mechanics = {}
  __running = false
  __authenticationMiddleware
  __configureRouter
  __configureMiddleware

  /**
   *
   * @param {object} options
   * @param {number} options.port
   */
  constructor(options) {
    options = options || {}
    this.__port = options.port || defaultPort
  }

  addProtoFiles(...protoFilenames) {
    const resolvers = protoFilenames.map((fn) => () => loadProtobufAsync(fn))
    this.__dependencyResolvers.push(...resolvers)
    return this
  }

  useActions(protoFilename, packageName) {
    this.__actionsResolver = () => loadActionsAsync(protoFilename, packageName)
    return this
  }

  /**
   * @param  {...Rule} rules
   */
  useRules(...rules) {
    this.__rules = this.__rules.concat(rules)
    return this
  }

  /**
   * @param  {...Mechanic} mechanics
   */
  useMechanics(...mechanics) {
    for (let mechanic of mechanics) {
      for (let hook of mechanic.actionHooks) {
        this.__mechanics[hook] = this.__mechanics[hook] || []
        this.__mechanics[hook].push(mechanic)
      }
    }
    return this
  }

  useState(protoFilename, packageName, initialValue) {
    this.__stateResolver = () =>
      loadStateAsync(protoFilename, packageName).then((State) => {
        const err = State.verify(initialValue || {})
        if (err) throw err
        this.__initialGameState = initialValue
        return State
      })
    return this
  }

  useStateMask(...stateMasks) {
    this.__stateMasks = this.__stateMasks.concat(stateMasks)
    return this
  }

  useAuthentication(authenticationMiddleware) {
    this.__authenticationMiddleware = authenticationMiddleware
    return this
  }

  addRoutes(routerConfigurationCallback) {
    this.__configureRouter = routerConfigurationCallback
    return this
  }

  addMiddleware(appliationConfigurationCallback) {
    this.__configureMiddleware = appliationConfigurationCallback
    return this
  }

  async run() {
    if (this.__running) {
      throw new Error('Server is already running')
    }
    // Build a rules pipeline
    const rulesPipeline = new RulesPipeline(this.__rules)

    // Pull in protobuf dependencies
    await Promise.all(this.__dependencyResolvers.map((func) => func()))

    const [ActionsDefinition, StateDefinition] = await Promise.all([
      this.__actionsResolver(),
      this.__stateResolver(),
    ])

    const gameRegistry = new GameRegistry(
      this.__storage,
      StateDefinition,
      this.__initialGameState
    )

    const socketRouter = createSocketRouter(
      StateDefinition,
      ActionsDefinition,
      gameRegistry,
      rulesPipeline,
      this.__mechanics,
      this.__stateMasks
    )
    const apiRouter = createApiRouter(gameRegistry, this.__configureRouter)

    const host = websockify(new Koa())
    if (this.__configureMiddleware) {
      this.__configureMiddleware(host)
    }
    host.use(apiRouter.routes())
    host.ws.use(this.__authenticationMiddleware)
    host.ws.use(socketRouter.routes())
    this.__servers = [host.listen(this.__port)]
    this.__servers.forEach(enableDestroy)
    this.__running = true

    const address = this.__servers[0].address()
    debug(`Listening at ${address.address}${address.port}`)

    return this
  }

  async shutdown() {
    if (!this.__running) {
      throw new Error('Servers are not running')
    }
    const closeOperations = this.__servers.map((s) => {
      return new Promise((resolve) => {
        s.on('close', resolve)
        s.destroy()
      })
    })
    await Promise.all(closeOperations)
    this.__running = false
    return this
  }
}

module.exports = {
  GameServer,
  defaultPort,
  Rule,
  Mechanic,
}
