const runtime = require('./runtime')
const action = require('./action')
const state = require('./state')
const rules = require('./rule')
const mechanics = require('./mechanics')

module.exports = {
  ...runtime,
  ...action,
  ...state,
  ...rules,
  ...mechanics,
}
