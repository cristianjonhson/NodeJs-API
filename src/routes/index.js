/**
 * Router principal de la aplicación
 * Centraliza el manejo de rutas y las conecta con sus controladores
 */

const homeController = require('../controllers/home.controller');
const statusController = require('../controllers/status.controller');
const dataController = require('../controllers/data.controller');

/**
 * Enruta las peticiones a sus controladores correspondientes
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {boolean} - True si se encontró una ruta, false si no
 */
const handleRoute = (req, res) => {
  // Ruta principal (Home)
  if (req.method === 'GET' && req.url === '/') {
    homeController.getHome(req, res);
    return true;
  }
  
  // Ruta de estado del servidor
  if (req.method === 'GET' && req.url === '/api/status') {
    statusController.getStatus(req, res);
    return true;
  }
  
  // Ruta de datos de ejemplo
  if (req.method === 'GET' && req.url === '/api/data') {
    dataController.getData(req, res);
    return true;
  }
  
  // No se encontró la ruta
  return false;
};

/**
 * Maneja errores 404 (Not Found)
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const handleNotFound = (req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: 'Endpoint no encontrado',
    path: req.url,
    method: req.method
  }));
};

module.exports = { handleRoute, handleNotFound };
