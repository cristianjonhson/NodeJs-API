/**
 * Archivo principal de rutas de la aplicación.
 * Este archivo centraliza todas las rutas y delega su manejo a los módulos correspondientes.
 */

const homeController = require('../controllers/home.controller')
const statusController = require('../controllers/status.controller')
const dataController = require('../controllers/data.controller')
const { extractId } = require('../utils/extractId')

/**
 * Maneja las rutas principales de la aplicación.
 * Este método delega las rutas específicas a sus respectivos módulos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {boolean} - Devuelve true si se manejó la ruta, de lo contrario false.
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
 * Maneja errores 404 (Not Found).
 * Este método se utiliza cuando no se encuentra una ruta válida.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const handleNotFound = (req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({
    error: 'Endpoint no encontrado',
    path: req.url,
    method: req.method
  }))
}

module.exports = { handleRoute, handleNotFound }
