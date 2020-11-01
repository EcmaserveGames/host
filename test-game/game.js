const { GameServer } = require('../src')
const path = require('path')
const clockwiseTurnOrder = require('./rules/clockwiseTurnOrder')
const mustRollOncePerTurn = require('./rules/mustRollAllDiceOncePerTurn')

const createGameServer = () => {
  const game = new GameServer()
  return game
    .useActions(path.resolve(__dirname, './Actions.proto'), 'testgame')
    .useRules(clockwiseTurnOrder, mustRollOncePerTurn)
    .useState(path.resolve(__dirname, './State.proto'), 'testgame', {
      roundNumber: 0,
      currentPlayerId: 'player-1',
    })
}

module.exports = {
  createGameServer,
}
