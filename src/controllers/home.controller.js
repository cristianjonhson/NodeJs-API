/**
 * Controlador para la ruta principal (Home)
 * Responsable de la lógica de negocio del endpoint raíz
 */

const config = require('../config/server.config')

/**
 * Maneja la petición GET a la raíz
 * Devuelve información de bienvenida y lista de endpoints
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const getHome = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    message: 'Bienvenido a la API de Node.js',
    server: {
      host: config.HOST,
      port: config.PORT
    },
    endpoints: {
      '/': 'GET - Home',
      '/api/status': 'GET - Estado del servidor',
      '/api/data': 'GET - Obtener todos los items',
      '/api/data/:id': 'GET - Obtener item por ID',
      '/api/data (POST)': 'POST - Crear nuevo item',
      '/api/data/:id (PUT)': 'PUT - Actualizar item existente',
      '/api/data/:id (DELETE)': 'DELETE - Eliminar item'
    },
    version: '1.0.0'
  }))
}

module.exports = { getHome }
