/**
 * Middleware de CORS (Cross-Origin Resource Sharing)
 * Configura los headers necesarios para permitir peticiones desde otros orígenes
 */

const config = require('../config/server.config')

/**
 * Aplica headers CORS a la respuesta
 * @param {Object} res - Objeto de respuesta HTTP
 */
const applyCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', config.CORS.allowedOrigins)
  res.setHeader('Access-Control-Allow-Methods', config.CORS.allowedMethods)
  res.setHeader('Access-Control-Allow-Headers', config.CORS.allowedHeaders)
}

/**
 * Maneja peticiones OPTIONS (preflight)
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {boolean} - True si es petición OPTIONS, false en caso contrario
 */
const handleOptions = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204 // No Content
    res.end()
    return true
  }
  return false
}

module.exports = { applyCors, handleOptions }
