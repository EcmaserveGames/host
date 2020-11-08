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
