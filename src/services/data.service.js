/**
 * Servicio para la gestión de datos.
 * Este archivo contiene la lógica de negocio para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
 * Los datos se almacenan en una base de datos simulada en memoria.
 */

// Simula una base de datos en memoria
const mockData = [
  { id: 1, name: 'Item 1', description: 'Primer elemento de ejemplo' },
  { id: 2, name: 'Item 2', description: 'Segundo elemento de ejemplo' },
  { id: 3, name: 'Item 3', description: 'Tercer elemento de ejemplo' }
]

let nextId = 4

/**
 * Obtiene todos los elementos de la base de datos simulada.
 * @returns {Array} - Lista de todos los elementos.
 */
const getAllData = () => {
  return mockData
}

/**
 * Obtiene un elemento específico por su ID.
 * @param {number} id - ID del elemento a buscar.
 * @returns {Object|null} - El elemento encontrado o null si no existe.
 */
const getDataById = (id) => {
  return mockData.find(item => item.id === id)
}

/**
 * Crea un nuevo elemento y lo agrega a la base de datos simulada.
 * @param {Object} data - Datos del nuevo elemento.
 * @param {string} data.name - Nombre del elemento.
 * @param {string} [data.description] - Descripción del elemento.
 * @returns {Object} - El elemento creado.
 */
const createData = (data) => {
  const newItem = {
    id: nextId++,
    name: data.name,
    description: data.description || ''
  }
  mockData.push(newItem)
  return newItem
}

/**
 * Actualiza un elemento existente por su ID.
 * @param {number} id - ID del elemento a actualizar.
 * @param {Object} data - Datos a actualizar.
 * @param {string} [data.name] - Nuevo nombre del elemento.
 * @param {string} [data.description] - Nueva descripción del elemento.
 * @returns {Object|null} - El elemento actualizado o null si no se encontró.
 */
const updateData = (id, data) => {
  const index = mockData.findIndex(item => item.id === id)
  if (index === -1) return null

  mockData[index] = {
    ...mockData[index],
    name: data.name !== undefined ? data.name : mockData[index].name,
    description: data.description !== undefined ? data.description : mockData[index].description
  }

  return mockData[index]
}

/**
 * Elimina un elemento existente por su ID.
 * @param {number} id - ID del elemento a eliminar.
 * @returns {Object|null} - El elemento eliminado o null si no se encontró.
 */
const deleteData = (id) => {
  const index = mockData.findIndex(item => item.id === id)
  if (index === -1) return null

  return mockData.splice(index, 1)[0]
}

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData
}
