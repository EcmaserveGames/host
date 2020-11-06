/**
 * @typedef {Object} MechanicContext
 * @property {any} actions
 * @property {any} gameState
 *
 * @callback MechanicMiddleware
 * @param {MechanicContext} ctx
 * @returns {void|Promise<void>}
 */

class Mechanic {
  /** @type {string} */
  name
  /** @type {string[]} */
  actionHooks = []

  /**
   * Creates a new game mechanic
   * @param {string} name
   */
  constructor(name) {
    this.name = name
  }

  /**
   * Creates a new game mechanic
   * @param {string} name
   */
  static create(name) {
    return new Mechanic(name)
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
   * @param {MechanicMiddleware} middleware
   */
  use(middleware) {
    this.__use = middleware
    return this
  }

  /**
   * @param {MechanicContext} ctx
   */
  async __mutate(ctx) {
    return this.__use(ctx)
  }
}

/**
 * @param {any} actions
 * @param {any} gameState
 * @param {object} mechanics
 */
async function __applyMechanicsToState(actions, gameState, mechanics) {
  const actionMechanics = mechanics[actions.Action]
  if (!actionMechanics) {
    return gameState
  }

  return Promise.all(
    actionMechanics.map(
      async (mechanic) => await mechanic.__mutate({ actions, gameState })
    )
  ).then(() => gameState)
}

module.exports = {
  Mechanic,
  __applyMechanicsToState,
}
