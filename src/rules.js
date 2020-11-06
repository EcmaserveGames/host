/**
 * Will clear out other failed rules as an exception to the rule
 * @callback  ExceptionToRule
 * @param {...string} ruleNames
 * @return {void}
 *
 * @callback GameStateMutationCallback
 * @param {any} state
 * @return {void|Promise<void>}
 *s
 * Allows mutation of the game state
 * @callback  MutateGameState
 * @param {GameStateMutationCallback} mutation
 * @return {void}
 *
 * @typedef {Object} RuleResult
 * @property {string} name
 * @property {boolean} result
 *
 * @typedef {Object} RuleContext
 * @property {any} actions
 * @property {any} gameState
 * @property {RuleResult[]} ruleResults
 * @property {MutateGameState} mutate
 * @property {ExceptionToRule} exceptionTo
 *
 * @callback RuleMiddleware
 * @param {RuleContext} ctx
 * @returns {boolean|Promise<boolean>} Whether or not the rule passed validation
 */

class Rule {
  /** @type {string} */
  name
  /** @type {string[]} */
  actionHooks = []

  /**
   * Create a new game rule
   * @param {string} name The name of the rule
   */
  constructor(name) {
    this.name = name
  }

  /**
   * Create a new game rule
   * @param {string} name
   */
  static create(name) {
    return new Rule(name)
  }

  /**
   * Only evaluate for the specified actions
   * @param  {...string} actions The name of the action to apply to
   */
  forActions(...actions) {
    this.actionHooks = this.actionHooks.concat(actions)
    return this
  }

  /**
   *
   * @param {RuleMiddleware} middleware
   */
  use(middleware) {
    this.__use = middleware
    return this
  }

  /**
   * @param {RuleContext} ctx
   */
  async __execute(ctx) {
    let result
    try {
      // TODO this should make a copy of gamestate and actions so that side-effects are not performed
      result = await this.__use(ctx)
    } catch (e) {
      result = false
    }
    ctx.ruleResults.push({ name: this.name, result })
    return ctx
  }
}

class RulesPipeline {
  __rules = {}

  /**
   * Create the rules pipeline
   * @param {Rule[]} rules
   */
  constructor(rules) {
    for (let rule of rules) {
      for (let action of rule.actionHooks) {
        this.__rules[action] = this.__rules[action] || []
        this.__rules[action].push(rule)
      }
    }
  }

  async run(actions, gameState) {
    // Figure out which action is being performed
    const action = actions.Action
    // Narrow down relevant rules
    const applicableRules = this.__rules[action] || []
    // Queue of mutations
    /** @type {GameStateMutationCallback[]} */
    let mutations = []

    /** @type {RuleContext} */
    let initialContext = {
      actions,
      gameState,
      mutate: (mutation) => {
        mutations.push(mutation)
      },
      ruleResults: [],
      exceptionTo: (...ruleNames) => {
        for (let ruleName of ruleNames) {
          initialContext.ruleResults = initialContext.ruleResults.filter(
            (ruleResult) => ruleResult.name !== ruleName
          )
        }
        a
      },
    }

    /** @type {Promise<RuleContext>} */
    let steps = Promise.resolve(initialContext)
    for (let rule of applicableRules) {
      steps = steps.then((ctx) => rule.__execute(ctx))
    }
    const final = await steps
    return {
      ruleResults: final.ruleResults,
      performMutations: (state) => {
        let updates = Promise.resolve(state)
        for (let mutation of mutations) {
          updates = updates.then((state) => {
            mutation(state)
            return state
          })
        }
        return updates
      },
    }
  }
}

module.exports = {
  Rule,
  RulesPipeline,
}
