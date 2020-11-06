const { Then } = require('@cucumber/cucumber')
const path = require('path')
const { loadStateAsync } = require('../../src/loadProtobufAsync')
const { getLastGameStateBuffer } = require('./state')
const { getActionsSocket } = require('./action')

const getNextActionResponsePromise = () => {
  return new Promise((resolve) => {
    const socket = getActionsSocket()
    socket.addEventListener('message', (event) => resolve(event.data), {
      once: true,
    })
  })
}

Then('the game mechanic is carried out', async function () {
  await getNextActionResponsePromise()
  const lastState = getLastGameStateBuffer()
  const State = await loadStateAsync(
    path.resolve(__dirname, '../test-game/State.proto'),
    'testgame'
  )
  const state = State.decode(lastState)
  if (
    state.diceNumbers.dice1 === 0 &&
    state.diceNumbers.dice2 === 0 &&
    state.diceNumbers.dice3 === 0 &&
    state.diceNumbers.dice4 === 0 &&
    state.diceNumbers.dice5 === 0
  ) {
    throw new Error('dice did not roll as expected')
  }
})
