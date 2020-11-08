const Router = require('@koa/router')

function createApiRouter(GameRegistry, configureRouter) {
  const router = new Router()

  router.post('/games', async (ctx) => {
    const id = await GameRegistry.create()
    ctx.body = {
      id,
      relativePathActionsSocket: `/games/${id}/actions`,
      relativePathStateSocket: `/games/${id}/state`,
    }
  })

  router.get('/games/:id', async (ctx) => {
    const { params } = ctx
    try {
      const game = await GameRegistry.get(params.id)
      ctx.body = {
        id: game.id,
        relativePathActionsSocket: `/games/${game.id}/actions`,
        relativePathStateSocket: `/games/${game.id}/state`,
      }
    } catch (e) {
      console.error(e)
    }
  })

  if (configureRouter) {
    configureRouter(router)
  } else {
    router.get('/', (ctx) => {
      ctx.body = 'OK'
    })
  }

  return router
}

module.exports = {
  createApiRouter,
}
