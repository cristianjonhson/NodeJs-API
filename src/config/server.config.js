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
  }
}
