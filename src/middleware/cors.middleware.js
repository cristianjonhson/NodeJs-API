/**
 * Middleware de CORS (Cross-Origin Resource Sharing)
 * Configura los headers necesarios para permitir peticiones desde otros orígenes
 */

const config = require('../config/server.config')

const getAllowedOrigins = () => {
  if (config.CORS.allowedOrigins === '*') return '*'

  return config.CORS.allowedOrigins
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
}

const isOriginAllowed = (origin) => {
  const allowedOrigins = getAllowedOrigins()

  if (!origin) return true
  if (allowedOrigins === '*') return true

  return allowedOrigins.includes(origin)
}

/**
 * Aplica headers CORS a la respuesta
 * @param {Object} res - Objeto de respuesta HTTP
 */
const applyCors = (req, res) => {
  const origin = req.headers.origin
  const allowedOrigins = getAllowedOrigins()

  if (allowedOrigins === '*') {
    res.setHeader('Access-Control-Allow-Origin', '*')
  } else if (isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || allowedOrigins[0] || '')
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', config.CORS.allowedMethods)
  res.setHeader('Access-Control-Allow-Headers', config.CORS.allowedHeaders)
}

/**
 * Maneja peticiones OPTIONS (preflight)
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {boolean} - True si es petición OPTIONS, false en caso contrario
 */
const handleOptions = (req, res, responseBuilder) => {
  if (req.method === 'OPTIONS') {
    if (!isOriginAllowed(req.headers.origin)) {
      responseBuilder.error(res, 403, 'Origen no permitido por CORS')
      return true
    }

    res.statusCode = 204 // No Content
    res.end()
    return true
  }
  return false
}

module.exports = { applyCors, handleOptions, isOriginAllowed }
