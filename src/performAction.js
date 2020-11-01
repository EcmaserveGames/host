const { loadActionResponseAsync } = require('./loadProtobufAsync')

async function createActionResponse(accepted, ruleResults) {
  const ActionResponse = await loadActionResponseAsync()
  const message = ActionResponse.create({
    accepted,
    ruleResults,
  })
  return ActionResponse.encode(message).finish()
}

/**
 * @this {import("./").GameServer} the instance of game server
 * @param {WebSocket} websocket The websocket that the action was received on
 * @param {*} Actions the protobuf Actions type
 * @param {*} binary the binary message data
 */
async function performAction(websocket, Actions, binary) {
  const action = Actions.decode(binary)
  let state =
    this.__state.current ||
    this.__state.initial ||
    this.__state.definition.create()
  /// Run Rules
  const rules = await this.__rules.pipeline.run(action, state)
  const accepted = rules.ruleResults.every((r) => r.result)
  if (accepted) {
    state = await rules.performMutations(state)
  }

  const buffer = await createActionResponse(accepted, rules.ruleResults)
  websocket.send(buffer)

  /// Push new Game State
  this.__state.current = state
  this.__state.connections.forEach((c) => {
    c.send(this.__state.definition.encode(state).finish())
  })
}

module.exports = {
  performAction,
}
