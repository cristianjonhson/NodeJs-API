/**
 * Router principal de la aplicación
 * Centraliza el manejo de rutas y las conecta con sus controladores
 */

const homeController = require('../controllers/home.controller')
const statusController = require('../controllers/status.controller')
const dataController = require('../controllers/data.controller')

/**
 * Extrae el ID de una URL con parámetros
 * @param {string} url - URL de la petición
 * @param {string} baseUrl - URL base del endpoint
 * @returns {number|null} - ID extraído o null si no hay ID
 */
const extractId = (url, baseUrl) => {
  const path = url.replace(baseUrl + '/', '')
  const id = parseInt(path, 10)
  return isNaN(id) ? null : id
}

/**
 * Enruta las peticiones a sus controladores correspondientes
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {boolean} - True si se encontró una ruta, false si no
 */
const handleRoute = (req, res) => {
  // Ruta principal (Home)
  if (req.method === 'GET' && req.url === '/') {
    homeController.getHome(req, res)
    return true
  }

  // Ruta de estado del servidor
  if (req.method === 'GET' && req.url === '/api/status') {
    statusController.getStatus(req, res)
    return true
  }

  // Ruta GET /api/data - Obtener todos los items
  if (req.method === 'GET' && req.url === '/api/data') {
    dataController.getData(req, res)
    return true
  }

  // Ruta GET /api/data/:id - Obtener un item específico
  if (req.method === 'GET' && req.url.startsWith('/api/data/')) {
    const id = extractId(req.url, '/api/data')
    if (id !== null) {
      dataController.getDataById(req, res, id)
      return true
    }
  }

  // Ruta POST /api/data - Crear nuevo item
  if (req.method === 'POST' && req.url === '/api/data') {
    dataController.createData(req, res)
    return true
  }

  // Ruta PUT /api/data/:id - Actualizar item existente
  if (req.method === 'PUT' && req.url.startsWith('/api/data/')) {
    const id = extractId(req.url, '/api/data')
    if (id !== null) {
      dataController.updateData(req, res, id)
      return true
    }
  }

  // Ruta DELETE /api/data/:id - Eliminar item
  if (req.method === 'DELETE' && req.url.startsWith('/api/data/')) {
    const id = extractId(req.url, '/api/data')
    if (id !== null) {
      dataController.deleteData(req, res, id)
      return true
    }
  }

  // No se encontró la ruta
  return false
}

/**
 * Maneja errores 404 (Not Found)
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const handleNotFound = (req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    error: 'Endpoint no encontrado',
    path: req.url,
    method: req.method
  }))
}

module.exports = { handleRoute, handleNotFound }
