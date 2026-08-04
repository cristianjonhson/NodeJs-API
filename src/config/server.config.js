/**
 * Configuración del servidor
 * Centraliza todas las configuraciones para facilitar cambios
 * y mantener valores consistentes en toda la aplicación
 */

const environment = process.env.NODE_ENV || 'development'
const defaultAllowedOrigins = environment === 'production' ? '' : '*'

module.exports = {
  // Entorno de ejecución
  ENVIRONMENT: environment,

  // Puerto del servidor - Lee de variables de entorno o usa 3000 por defecto
  PORT: process.env.PORT || 3000,

  // Host donde escuchará el servidor
  HOST: process.env.HOST || 'localhost',

  // Configuración de CORS
  CORS: {
    allowedOrigins: process.env.ALLOWED_ORIGINS || defaultAllowedOrigins,
    allowedMethods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type'
  },

  // Límite máximo del body JSON en bytes
  BODY_LIMIT_BYTES: Number(process.env.BODY_LIMIT_BYTES || 1024 * 1024),

  // Protección básica contra abuso por IP
  RATE_LIMIT: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000),
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100)
  },

  // Umbral de memoria para reportar degradación en health check
  HEALTH: {
    maxHeapUsedRatio: Number(process.env.HEALTH_MAX_HEAP_USED_RATIO || 0.98)
  },

  // Timeouts del servidor HTTP en milisegundos
  TIMEOUTS: {
    requestTimeout: Number(process.env.REQUEST_TIMEOUT_MS || 30000),
    headersTimeout: Number(process.env.HEADERS_TIMEOUT_MS || 10000),
    keepAliveTimeout: Number(process.env.KEEP_ALIVE_TIMEOUT_MS || 5000)
  }
}
