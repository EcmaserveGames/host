const startup = require('./startup')
const action = require('./action')
const state = require('./state')

module.exports = {
  ...startup,
  ...action,
  ...state,
}
