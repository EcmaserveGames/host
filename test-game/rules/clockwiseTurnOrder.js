const { Rule } = require('../../src/rules')

const rule = new Rule('clockWiseTurnOrder')
rule.forActions('completeTurn')
rule.use(({ actions, mutate }) => {
  if (actions.completeTurn) {
    mutate((state) => {
      state.currentPlayerId = 'player-next'
    })
  }

  return true
})

module.exports = rule
