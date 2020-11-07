const { GameServer } = require('../../src')
const path = require('path')
const { DiceRoll } = require('./mechanics')
const { ClockWiseTurnOrder, MustRollAllDiceOncePerTurn } = require('./rules')
const { BearerAuth } = require('./auth')

const createGameServer = () => {
  const game = new GameServer()
  return game
    .useActions(path.resolve(__dirname, './Actions.proto'), 'testgame')
    .useMechanics(DiceRoll)
    .useRules(ClockWiseTurnOrder, MustRollAllDiceOncePerTurn)
    .useState(path.resolve(__dirname, './State.proto'), 'testgame', {
      diceNumbers: {
        dice1: 0,
        dice2: 0,
        dice3: 0,
        dice4: 0,
        dice5: 0,
      },
      roundNumber: 0,
      currentPlayerId: 'player-1',
      secretValue: 'do not reveal',
    })
    .useStateMask((ctx) => {
      ctx.mutate((state) => (state.secretValue = null))
    })
    .useAuthentication(BearerAuth)
}

module.exports = {
  createGameServer,
}
