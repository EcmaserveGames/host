const { GameServer } = require('../src')
const path = require('path')

const game = new GameServer()

module.exports = game
  .useActions(path.resolve(__dirname, './Actions.proto'), 'testgame')
  .useState(path.resolve(__dirname, './State.proto'), 'testgame', {
    roundNumber: 0,
  })
  .run()
