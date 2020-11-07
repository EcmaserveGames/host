class GameRegistry {
  __map = new Map()
  __storage
  __state = {
    definition: undefined,
    initial: undefined,
  }

  constructor(StorageEngine, State, initialState) {
    this.__state.definition = State
    this.__state.initial = initialState
    this.__storage = StorageEngine
  }

  async create() {
    const State = this.__state.definition
    const newGame = State.create(this.__state.initial)
    const buffer = State.encode(newGame).finish()
    const id = await this.__storage.create({ buffer })
    const game = new Game(id, this.__storage)
    this.__map.set(id, game)
    return id
  }

  async has(id) {
    return await this.__storage.has(id)
  }

  async get(id) {
    if (this.__map.has(id)) {
      return this.__map.get(id)
    }
    const gamePersisted = await this.__storage.has(id)
    if (gamePersisted) {
      const data = await this.__storage.read(id)
      const game = Game.fromObject(this.__storage, data)
      this.__map.set(id, game)
      return game
    }
    throw new Error('Game could not be found for id: ' + id)
  }
}

class Game {
  __id
  __connections = []
  __storage

  constructor(id, StorageEngine) {
    this.__id = id
    this.__storage = StorageEngine
  }

  async getStateBuffer() {
    const game = await this.__storage.read(this.__id)
    return game.buffer
  }

  async connect(websocket) {
    this.__connections.push(websocket)
    websocket.on('close', () => {
      const websocketIndex = this.__connections.indexOf(websocket)
      this.__connections.splice(websocketIndex, 1)
    })
    const buffer = await this.getStateBuffer()
    websocket.send(buffer)
  }

  async commit(newStateBuffer) {
    // persist to storage engine
    await this.__storage.update(this.__id, this.toObject(newStateBuffer))
    // Update all connections
    this.__connections.forEach((c) => c.send(newStateBuffer))
    return this
  }

  toObject(stateBuffer) {
    return {
      id: this.__id,
      buffer: stateBuffer,
    }
  }

  static fromObject(StorageEngine, data) {
    return new Game(data.id, StorageEngine)
  }
}

module.exports = {
  Game,
  GameRegistry,
}
