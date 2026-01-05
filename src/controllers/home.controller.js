/**
 * Controlador para la ruta principal (Home)
 * Responsable de la lógica de negocio del endpoint raíz
 */

const config = require('../config/server.config');

/**
 * Maneja la petición GET a la raíz
 * Devuelve información de bienvenida y lista de endpoints
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const getHome = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: 'Bienvenido a la API de Node.js',
    endpoints: {
      '/': 'GET - Home',
      '/api/status': 'GET - Estado del servidor',
      '/api/data': 'GET - Datos de ejemplo'
    },
    version: '1.0.0'
  }));
};

module.exports = { getHome };
