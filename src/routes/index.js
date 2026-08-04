/**
 * Archivo principal de rutas de la aplicación.
 */

const { extractId } = require('../utils/extractId')

const createRouter = ({ homeController, statusController, dataController, responseBuilder }) => {
  /**
   * Maneja las rutas principales de la aplicación.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @returns {boolean} - True si se manejó la ruta, de lo contrario false.
   */
  const handleRoute = (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      homeController.getHome(req, res)
      return true
    }

    if (req.method === 'GET' && req.url === '/api/status') {
      statusController.getStatus(req, res)
      return true
    }

    if (req.method === 'GET' && req.url === '/api/data') {
      dataController.getData(req, res)
      return true
    }

    if (req.method === 'GET' && req.url.startsWith('/api/data/')) {
      const id = extractId(req.url, '/api/data')
      if (id !== null) {
        dataController.getDataById(req, res, id)
        return true
      }
    }

    if (req.method === 'POST' && req.url === '/api/data') {
      dataController.createData(req, res)
      return true
    }

    if (req.method === 'PUT' && req.url.startsWith('/api/data/')) {
      const id = extractId(req.url, '/api/data')
      if (id !== null) {
        dataController.updateData(req, res, id)
        return true
      }
    }

    if (req.method === 'DELETE' && req.url.startsWith('/api/data/')) {
      const id = extractId(req.url, '/api/data')
      if (id !== null) {
        dataController.deleteData(req, res, id)
        return true
      }
    }

    return false
  }

  const handleNotFound = (req, res) => {
    responseBuilder.error(res, 404, 'Endpoint no encontrado', {
      path: req.url,
      method: req.method
    })
  }

  return { handleRoute, handleNotFound }
}

module.exports = { createRouter }
