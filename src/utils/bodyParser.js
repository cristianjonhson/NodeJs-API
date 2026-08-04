/**
 * Utilidad para parsear el body de peticiones HTTP
 * Extrae y parsea datos JSON del stream de la petición
 */

const { AppError } = require('./appError')

/**
 * Parsea el body de una petición HTTP
 * @param {Object} req - Objeto de petición HTTP
 * @returns {Promise<Object>} - Promesa que resuelve con el body parseado
 */
const parseBody = (req, options = {}) => {
  const limitBytes = options.limitBytes || 1024 * 1024

  return new Promise((resolve, reject) => {
    let body = ''
    let size = 0
    let rejected = false

    req.on('data', (chunk) => {
      if (rejected) return

      size += chunk.length

      if (size > limitBytes) {
        rejected = true
        reject(new AppError(413, 'Payload demasiado grande'))
        return
      }

      body += chunk.toString()
    })

    req.on('end', () => {
      if (rejected) return

      try {
        const parsed = body ? JSON.parse(body) : {}
        resolve(parsed)
      } catch (error) {
        reject(new AppError(400, 'JSON inválido'))
      }
    })

    req.on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = { parseBody }
