/**
 * Extrae el ID numérico de una URL con base en una ruta base.
 * @param {string} url - URL de la petición.
 * @param {string} baseUrl - URL base del endpoint.
 * @returns {number|null} - ID extraído o null si no hay ID válido.
 */
function extractId (url, baseUrl) {
  const path = url.replace(baseUrl + '/', '')
  if (!/^\d+$/.test(path)) return null

  const id = parseInt(path, 10)
  return isNaN(id) ? null : id
}

module.exports = { extractId }
