/**
 * Controlador para el endpoint de status
 * Responsable de devolver información del estado del servidor
 */

/**
 * Maneja la petición GET a /api/status
 * Devuelve información sobre el estado actual del servidor
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const getStatus = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  }));
};

module.exports = { getStatus };
