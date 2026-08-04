/**
 * Controlador para la ruta principal (Home).
 */

const createHomeController = ({ config, responseBuilder }) => {
  const getHome = (req, res) => {
    responseBuilder.success(res, 200, {
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
    })
  }

  return { getHome }
}

module.exports = { createHomeController }
