/**
 * Configuración del servidor
 * Centraliza todas las configuraciones para facilitar cambios
 * y mantener valores consistentes en toda la aplicación
 */

module.exports = {
  // Puerto del servidor - Lee de variables de entorno o usa 3000 por defecto
  PORT: process.env.PORT || 3000,

  // Host donde escuchará el servidor
  HOST: process.env.HOST || 'localhost',

  // Configuración de CORS
  CORS: {
    allowedOrigins: process.env.ALLOWED_ORIGINS || '*',
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
  }
}
