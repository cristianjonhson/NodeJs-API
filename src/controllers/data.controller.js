/**
 * Controlador para el endpoint de datos
 * Responsable de la lógica de negocio relacionada con datos de ejemplo
 */

/**
 * Simula una base de datos en memoria
 * En producción, esto vendría de una base de datos real
 */
const mockData = [
  { id: 1, name: 'Item 1', description: 'Primer elemento de ejemplo' },
  { id: 2, name: 'Item 2', description: 'Segundo elemento de ejemplo' },
  { id: 3, name: 'Item 3', description: 'Tercer elemento de ejemplo' }
];

/**
 * Maneja la petición GET a /api/data
 * Devuelve un array de datos de ejemplo
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const getData = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    success: true,
    count: mockData.length,
    data: mockData
  }));
};

module.exports = { getData };
