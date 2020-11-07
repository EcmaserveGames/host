const { Rule } = require('../../../src/rules')

const rule = new Rule('clockWiseTurnOrder')
rule.forActions('completeTurn', 'rollDice')
rule.use(({ actions, mutate, gameState, user }) => {
  if (actions.rollDice && user) {
    if (gameState.currentPlayerId !== user.sub) {
      return false
    }
  }

  if (actions.completeTurn) {
    mutate((state) => {
      state.currentPlayerId = 'player-next'
    })
  }

  return true
})

module.exports = rule
