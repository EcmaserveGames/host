const { Mechanic } = require('../../src/mechanics')

const DiceRoll = Mechanic.create('rollDice')
  .forActions('rollDice')
  .use(({ actions, gameState }) => {
    const action = actions.rollDice
    gameState.diceNumbers = gameState.diceNumbers || {}
    if (action.dice1) {
      gameState.diceNumbers.dice1 = Math.ceil(Math.random() * 6)
    }
    if (action.dice2) {
      gameState.diceNumbers.dice2 = Math.ceil(Math.random() * 6)
    }
    if (action.dice3) {
      gameState.diceNumbers.dice3 = Math.ceil(Math.random() * 6)
    }
    if (action.dice4) {
      gameState.diceNumbers.dice4 = Math.ceil(Math.random() * 6)
    }
    if (action.dice5) {
      gameState.diceNumbers.dice5 = Math.ceil(Math.random() * 6)
    }
  })

module.exports = {
  DiceRoll,
}
