/**
 * Router declarativo de la aplicación.
 */

const { extractId } = require('../utils/extractId')

const createRouter = ({ homeController, statusController, dataController, responseBuilder }) => {
  const routes = [
    {
      method: 'GET',
      path: /^\/$/,
      handler: (req, res) => homeController.getHome(req, res)
    },
    {
      method: 'GET',
      path: /^\/api\/status$/,
      handler: (req, res) => statusController.getStatus(req, res)
    },
    {
      method: 'GET',
      path: /^\/api\/data$/,
      handler: (req, res) => dataController.getData(req, res)
    },
    {
      method: 'POST',
      path: /^\/api\/data$/,
      handler: (req, res) => dataController.createData(req, res)
    },
    {
      method: 'GET',
      path: /^\/api\/data\/\d+$/,
      handler: (req, res, pathname) => dataController.getDataById(req, res, extractId(pathname, '/api/data'))
    },
    {
      method: 'PUT',
      path: /^\/api\/data\/\d+$/,
      handler: (req, res, pathname) => dataController.updateData(req, res, extractId(pathname, '/api/data'))
    },
    {
      method: 'DELETE',
      path: /^\/api\/data\/\d+$/,
      handler: (req, res, pathname) => dataController.deleteData(req, res, extractId(pathname, '/api/data'))
    }
  ]

  const getPathname = (req) => {
    return new URL(req.url, 'http://localhost').pathname
  }

  const getMatchedRoutes = (pathname) => routes.filter(route => route.path.test(pathname))

  const handleRoute = async (req, res) => {
    const pathname = getPathname(req)
    const matchedRoutes = getMatchedRoutes(pathname)

    if (matchedRoutes.length === 0) {
      return false
    }

    const route = matchedRoutes.find(route => route.method === req.method)
    if (!route) {
      const allowedMethods = [...new Set(matchedRoutes.map(route => route.method))]
      res.setHeader('Allow', allowedMethods.join(', '))
      responseBuilder.error(res, 405, 'Método no permitido', { allowedMethods })
      return true
    }

    await route.handler(req, res, pathname)
    return true
  }

  const handleNotFound = (req, res) => {
    responseBuilder.error(res, 404, 'Endpoint no encontrado', {
      path: getPathname(req),
      method: req.method
    })
  }

  return { handleRoute, handleNotFound }
}

module.exports = { createRouter }
