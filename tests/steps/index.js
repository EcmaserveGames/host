const runtime = require('./runtime')
const action = require('./action')
const state = require('./state')
const rules = require('./rule')
const mechanics = require('./mechanics')
const game = require('./game')
const users = require('./users')

module.exports = {
  ...runtime,
  ...action,
  ...state,
  ...rules,
  ...mechanics,
  ...game,
  ...users,
}
