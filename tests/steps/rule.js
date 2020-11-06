const { When, Then } = require('@cucumber/cucumber')
const path = require('path')
const { getActionsSocket } = require('./action')
const { getLastGameStateBuffer } = require('./state')
const {
  loadStateAsync,
  loadActionsAsync,
  loadActionResponseAsync,
} = require('../../src/loadProtobufAsync')

const getNextActionResponsePromise = () => {
  return new Promise((resolve) => {
    const socket = getActionsSocket()
    socket.addEventListener('message', (event) => resolve(event.data), {
      once: true,
    })
  })
}

async function getGameStateFromBuffer(buffer) {
  const GameState = await loadStateAsync(
    path.resolve(__dirname, '../test-game/State.proto'),
    'testgame'
  )
  return GameState.decode(buffer)
}

let startingState

When('a game participant performs an action', async function () {
  startingState = getLastGameStateBuffer()
  const Actions = await loadActionsAsync(
    path.resolve(__dirname, '../test-game/Actions.proto'),
    'testgame'
  )
  const rollDiceAction = Actions.create({
    rollDice: {
      dice1: true,
      dice2: true,
      dice3: true,
      dice4: true,
      dice5: true,
    },
  })
  const nextActionResponsePromise = getNextActionResponsePromise()
  getActionsSocket().send(Actions.encode(rollDiceAction).finish())
  await nextActionResponsePromise

  const completeTurnAction = Actions.create({
    completeTurn: {}, // Must roll at least once
  })

  getActionsSocket().send(Actions.encode(completeTurnAction).finish())
})

Then('rules are applied to game state', async function () {
  const ActionResponse = await loadActionResponseAsync()
  const nextMessageBuffer = await getNextActionResponsePromise()
  const response = ActionResponse.decode(nextMessageBuffer)
  if (!response.accepted) throw new Error('action should be accepted')
})

Then('game state is updated', async function () {
  const lastGameState = await getGameStateFromBuffer(getLastGameStateBuffer())
  if (lastGameState.currentPlayerId !== 'player-next')
    throw new Error('expected the player to have changed from player-1')
})

When(
  'a game participant performs an action thats not allowed',
  async function () {
    startingState = getLastGameStateBuffer()
    const Actions = await loadActionsAsync(
      path.resolve(__dirname, '../test-game/Actions.proto'),
      'testgame'
    )
    const message = Actions.create({
      completeTurn: {}, // Must roll at least once
    })
    getActionsSocket().send(Actions.encode(message).finish())
  }
)

Then('the action is rejected by rules', async function () {
  // Write code here that turns the phrase above into concrete actions
  const nextMessageBuffer = await new Promise((resolve) => {
    getActionsSocket().on('message', resolve)
  })
  const ActionResponse = await loadActionResponseAsync()
  const response = ActionResponse.decode(nextMessageBuffer)
  if (response.accepted) throw new Error('action should not be accepted')
})

Then('game state is not updated', async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const lastGameState = await getGameStateFromBuffer(getLastGameStateBuffer())
  if (lastGameState.currentPlayerRollCount > 0) {
    throw new Error('Should not have updated state')
  }
})
