class MemoryStorage {
  __counter = 0
  __map = new Map()
  has(id) {
    return Promise.resolve(this.__map.has(id))
  }
  create(data) {
    const id = '' + this.__counter
    this.__map.set(id, data)
    this.__counter++
    return Promise.resolve(id)
  }
  read(id) {
    if (!this.__map.has(id)) {
      throw new Error('Key does not exist: ' + id)
    }
    return Promise.resolve(this.__map.get(id))
  }
  update(id, data) {
    if (!this.__map.has(id)) {
      throw new Error('Key does not exist: ' + id)
    }
    this.__map.set(id, data)
    return this.read(id)
  }
}

module.exports = {
  MemoryStorage,
}
