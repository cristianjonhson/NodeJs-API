/**
 * Rutas relacionadas con la gestión de datos.
 * Este archivo define las rutas para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * y las conecta con los controladores correspondientes.
 */

const dataController = require('../controllers/data.controller')
const { extractId } = require('../utils/extractId')

/**
 * Maneja las rutas relacionadas con datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {boolean} - Devuelve true si se manejó la ruta, de lo contrario false.
 */
const dataRoutes = (req, res) => {
  // Ruta GET /api/data - Obtener todos los elementos
  if (req.method === 'GET' && req.url === '/api/data') {
    dataController.getData(req, res)
    return true
  }

  // Ruta GET /api/data/:id - Obtener un elemento específico por ID
  if (req.method === 'GET' && req.url.startsWith('/api/data/')) {
    const id = extractId(req.url, '/api/data')
    if (id !== null) {
      dataController.getDataById(req, res, id)
      return true
    }
  }

  // Ruta POST /api/data - Crear un nuevo elemento
  if (req.method === 'POST' && req.url === '/api/data') {
    dataController.createData(req, res)
    return true
  }

  // Ruta PUT /api/data/:id - Actualizar un elemento existente por ID
  if (req.method === 'PUT' && req.url.startsWith('/api/data/')) {
    const id = extractId(req.url, '/api/data')
    if (id !== null) {
      dataController.updateData(req, res, id)
      return true
    }
  }

  // Ruta DELETE /api/data/:id - Eliminar un elemento por ID
  if (req.method === 'DELETE' && req.url.startsWith('/api/data/')) {
    const id = extractId(req.url, '/api/data')
    if (id !== null) {
      dataController.deleteData(req, res, id)
      return true
    }
  }

  // Si ninguna ruta coincide, devolver false
  return false
}

module.exports = dataRoutes
