const { Rule } = require('../../src/rules')

const rule = new Rule('mustRollOncePerTurn')
rule.forActions('completeTurn', 'rollDice')
rule.use(({ actions, gameState, mutate }) => {
  if (actions.rollDice) {
    // TODO this should be a basic game mechanic manipulating
    mutate((state) => {
      state.currentPlayerRollCount = state.currentPlayerRollCount + 1
    })

    const { dice1, dice2, dice3, dice4, dice5 } = actions.rollDice

    const firstRoll = gameState.currentPlayerRollCount === 0
    if (firstRoll) {
      return dice1 && dice2 && dice3 && dice4 && dice5
    }
    return true
  }

  if (actions.completeTurn) {
    mutate((state) => {
      state.currentPlayerRollCount = 0
    })
    return gameState.currentPlayerRollCount > 0
  }

  return true
})

module.exports = rule
