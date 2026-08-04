/**
 * Contenedor de dependencias de la aplicación.
 */

const config = require('./config/server.config')
const dataService = require('./services/data.service')
const responseBuilder = require('./utils/responseBuilder')
const logger = require('./utils/logger')
const { createHomeController } = require('./controllers/home.controller')
const { createStatusController } = require('./controllers/status.controller')
const { createDataController } = require('./controllers/data.controller')
const { createRouter } = require('./routes')
const { createRateLimiter } = require('./middleware/rateLimit.middleware')

const createContainer = () => {
  const dependencies = {
    config,
    dataService,
    responseBuilder,
    logger
  }

  const homeController = createHomeController(dependencies)
  const statusController = createStatusController(dependencies)
  const dataController = createDataController(dependencies)
  const router = createRouter({
    ...dependencies,
    homeController,
    statusController,
    dataController
  })
  const rateLimiter = createRateLimiter(config.RATE_LIMIT, responseBuilder, logger)

  return {
    config,
    logger,
    router,
    rateLimiter
  }
}

module.exports = { createContainer }
