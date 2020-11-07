const { loadActionResponseAsync } = require('./loadProtobufAsync')
const { __applyMechanicsToState } = require('./mechanics')

async function createActionResponse(accepted, ruleResults) {
  const ActionResponse = await loadActionResponseAsync()
  const message = ActionResponse.create({
    accepted,
    ruleResults,
  })
  return ActionResponse.encode(message).finish()
}

async function performAction(
  binary,
  { Game, RulesPipeline, ActionsDefinition, StateDefinition, Mechanics, User }
) {
  const stateBuffer = await Game.getStateBuffer()
  let state = StateDefinition.decode(stateBuffer)
  const Actions = ActionsDefinition.decode(binary)
  /// Run Rules
  const rules = await RulesPipeline.run(Actions, state, User)
  const accepted = rules.ruleResults.every((r) => r.result)

  if (accepted) {
    state = await __applyMechanicsToState(Actions, state, Mechanics, User)
    // Run the rule specific mutations
    state = await rules.performMutations(state)

    await Game.commit(StateDefinition.encode(state).finish())
  }
  return [accepted, rules.ruleResults]
}

module.exports = {
  performAction,
  createActionResponse,
}
