/**
 * @this {GameServer} the instance of game server
 * @param {*} Actions the protobuf Actions type
 * @param {*} binary the binary message data
 */
function performAction(Actions, binary) {
  const action = Actions.decode(binary)
  const state =
    this.__state.current ||
    this.__state.initial ||
    this.__state.definition.create()
  /// Run Rules
  /// ...
  /// Push new Game State
  this.__state.current = state
  this.__state.connections.forEach((c) => {
    c.send(this.__state.definition.encode(state).finish())
  })
}

module.exports = {
  performAction,
}
