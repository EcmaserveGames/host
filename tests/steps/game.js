const { When, Then } = require('@cucumber/cucumber')
const {
  getServerInstance,
  createSocketClientForPathAsync,
  createAGame,
  getLastCreatedGame,
  getGameStateFromBuffer,
  getLastGameStateBuffer,
} = require('./setup')

When('a client creates a new game', async function () {
  await createAGame()
})

When('the host is restarted', async function () {
  const server = getServerInstance()
  await server.shutdown()
  await server.run()
})

Then('a game instance id is returned', function () {
  const game = getLastCreatedGame()
  if (
    !game.id ||
    !game.relativePathActionsSocket ||
    !game.relativePathStateSocket
  ) {
    throw new Error('game was not created')
  }
})

Then('that game is available on a websocket', async function () {
  const location = getLastCreatedGame().relativePathActionsSocket
  const { promise } = createSocketClientForPathAsync(location)
  await promise
})

Then('the game state is persisted', async function () {
  const gameState = await getGameStateFromBuffer(getLastGameStateBuffer())
  if (gameState.diceNumbers.dice1 === 0)
    throw new Error('did not persist last roll!')
})
