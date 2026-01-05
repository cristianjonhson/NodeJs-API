/**
 * Servidor HTTP principal
 * Punto de entrada de la aplicación - Coordina todos los módulos
 * Responsabilidad: Inicializar el servidor y coordinar el flujo de peticiones
 */

const http = require('node:http')
const config = require('./src/config/server.config')
const { applyCors, handleOptions } = require('./src/middleware/cors.middleware')
const { handleRoute, handleNotFound } = require('./src/routes')

/**
 * Crea y configura el servidor HTTP
 * Aplica middleware y enruta las peticiones
 */
const server = http.createServer((req, res) => {
  // Aplicar middleware CORS
  applyCors(res)

  // Manejar peticiones OPTIONS (CORS preflight)
  if (handleOptions(req, res)) return

  // Intentar enrutar la petición
  const routeFound = handleRoute(req, res)

  // Si no se encontró una ruta, devolver 404
  if (!routeFound) {
    handleNotFound(req, res)
  }
})

/**
 * Inicia el servidor en el puerto y host configurados
 */
server.listen(config.PORT, config.HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${config.HOST}:${config.PORT}`)
  console.log('📝 Endpoints disponibles:')
  console.log(`   - http://${config.HOST}:${config.PORT}/`)
  console.log(`   - http://${config.HOST}:${config.PORT}/api/status`)
  console.log(`   - http://${config.HOST}:${config.PORT}/api/data`)
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`)
})

/**
 * Maneja errores del servidor
 */
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Error: El puerto ${config.PORT} ya está en uso`)
  } else if (error.code === 'EACCES') {
    console.error(`❌ Error: Sin permisos para usar el puerto ${config.PORT}`)
  } else {
    console.error('❌ Error en el servidor:', error)
  }
  process.exit(1)
})

/**
 * Manejo de señales de terminación para graceful shutdown
 */
const gracefulShutdown = (signal) => {
  console.log(`\n⚠️  Señal ${signal} recibida, cerrando servidor...`)
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente')
    process.exit(0)
  })

  // Forzar cierre después de 10 segundos
  setTimeout(() => {
    console.error('⚠️  Forzando cierre del servidor')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))
