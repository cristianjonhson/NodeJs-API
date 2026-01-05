/**
 * Utilidad para parsear el body de peticiones HTTP
 * Extrae y parsea datos JSON del stream de la petición
 */

/**
 * Parsea el body de una petición HTTP
 * @param {Object} req - Objeto de petición HTTP
 * @returns {Promise<Object>} - Promesa que resuelve con el body parseado
 */
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {}
        resolve(parsed)
      } catch (error) {
        reject(new Error('Invalid JSON'))
      }
    })

    req.on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = { parseBody }
