/**
 * Servidor HTTP principal
 * Punto de entrada de la aplicación - Coordina todos los módulos
 * Responsabilidad: Inicializar el servidor y coordinar el flujo de peticiones
 */

const http = require('node:http')
const { applyCors, handleOptions } = require('./src/middleware/cors.middleware')
const { createContainer } = require('./src/container')

const { config, logger, router, rateLimiter, responseBuilder } = createContainer()

const handleRequestError = (error, req, res) => {
  const statusCode = error.statusCode || 500
  const message = statusCode === 500 ? 'Error interno del servidor' : error.message

  logger.error('Request failed', {
    method: req.method,
    url: req.url,
    statusCode,
    error: error.message,
    stack: error.stack
  })

  if (!res.headersSent) {
    responseBuilder.error(res, statusCode, message, error.details)
    return
  }

  res.end()
}

/**
 * Crea y configura el servidor HTTP
 * Aplica middleware y enruta las peticiones
 * @param {http.IncomingMessage} req - Objeto de petición HTTP
 * @param {http.ServerResponse} res - Objeto de respuesta HTTP
 */
const server = http.createServer(async (req, res) => {
  const startedAt = Date.now()

  res.on('finish', () => {
    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.socket.remoteAddress
    })
  })

  req.setTimeout(config.TIMEOUTS.requestTimeout, () => {
    if (!res.headersSent) {
      responseBuilder.error(res, 408, 'Tiempo de espera agotado')
    }
    req.destroy()
  })

  try {
    // Aplicar middleware CORS
    applyCors(req, res)

    // Manejar peticiones OPTIONS (CORS preflight)
    if (handleOptions(req, res, responseBuilder)) return

    // Aplicar protección básica contra abuso
    if (rateLimiter(req, res)) return

    // Intentar enrutar la petición
    const routeFound = await router.handleRoute(req, res)

    // Si no se encontró una ruta, devolver 404
    if (!routeFound) {
      router.handleNotFound(req, res)
    }
  } catch (error) {
    handleRequestError(error, req, res)
  }
})

server.requestTimeout = config.TIMEOUTS.requestTimeout
server.headersTimeout = config.TIMEOUTS.headersTimeout
server.keepAliveTimeout = config.TIMEOUTS.keepAliveTimeout

/**
 * Inicia el servidor en el puerto y host configurados
 * Callback ejecutado cuando el servidor está listo
 */
server.listen(config.PORT, config.HOST, () => {
  logger.info('Server started', {
    host: config.HOST,
    port: config.PORT,
    environment: process.env.NODE_ENV || 'development',
    timeouts: config.TIMEOUTS,
    endpoints: ['/', '/api/status', '/api/data']
  })
})

/**
 * Maneja errores del servidor
 * @param {Error} error - Objeto de error con información del fallo
 */
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    logger.error('Port already in use', { port: config.PORT })
  } else if (error.code === 'EACCES') {
    logger.error('Insufficient permissions for port', { port: config.PORT })
  } else {
    logger.error('Server error', { error: error.message, stack: error.stack })
  }
  process.exit(1)
})

/**
 * Manejo de señales de terminación para graceful shutdown
 * @param {string} signal - Nombre de la señal recibida (SIGTERM, SIGINT, etc.)
 */
const gracefulShutdown = (signal) => {
  logger.warn('Shutdown signal received', { signal })
  server.close(() => {
    logger.info('Server closed successfully')
    process.exit(0)
  })

  // Forzar cierre después de 10 segundos
  setTimeout(() => {
    logger.error('Forcing server shutdown')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))
