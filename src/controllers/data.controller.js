/**
 * Controlador para el endpoint de datos
 * Responsable de la lógica de negocio relacionada con datos de ejemplo
 */

const { parseBody } = require('../utils/bodyParser')

/**
 * Simula una base de datos en memoria
 * En producción, esto vendría de una base de datos real
 */
const mockData = [
  { id: 1, name: 'Item 1', description: 'Primer elemento de ejemplo' },
  { id: 2, name: 'Item 2', description: 'Segundo elemento de ejemplo' },
  { id: 3, name: 'Item 3', description: 'Tercer elemento de ejemplo' }
]

// Contador para IDs auto-incrementales
let nextId = 4

/**
 * Maneja la petición GET a /api/data
 * Devuelve un array de datos de ejemplo
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const getData = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({
    success: true,
    count: mockData.length,
    data: mockData
  }))
}

/**
 * Maneja la petición GET a /api/data/:id
 * Devuelve un elemento específico por ID
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {number} id - ID del elemento a obtener
 */
const getDataById = (req, res, id) => {
  const item = mockData.find(item => item.id === id)

  if (!item) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
      success: false,
      error: 'Item no encontrado',
      id
    }))
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({
    success: true,
    data: item
  }))
}

/**
 * Maneja la petición POST a /api/data
 * Crea un nuevo elemento
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
const createData = async (req, res) => {
  try {
    const body = await parseBody(req)

    if (!body.name) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({
        success: false,
        error: 'El campo "name" es requerido'
      }))
      return
    }

    const newItem = {
      id: nextId++,
      name: body.name,
      description: body.description || ''
    }

    mockData.push(newItem)

    res.statusCode = 201
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
      success: true,
      message: 'Item creado exitosamente',
      data: newItem
    }))
  } catch (error) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
      success: false,
      error: 'Error al parsear el body: ' + error.message
    }))
  }
}

/**
 * Maneja la petición PUT a /api/data/:id
 * Actualiza un elemento existente
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {number} id - ID del elemento a actualizar
 */
const updateData = async (req, res, id) => {
  try {
    const body = await parseBody(req)
    const index = mockData.findIndex(item => item.id === id)

    if (index === -1) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({
        success: false,
        error: 'Item no encontrado',
        id
      }))
      return
    }

    // Actualizar solo los campos proporcionados
    mockData[index] = {
      ...mockData[index],
      name: body.name !== undefined ? body.name : mockData[index].name,
      description: body.description !== undefined ? body.description : mockData[index].description
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
      success: true,
      message: 'Item actualizado exitosamente',
      data: mockData[index]
    }))
  } catch (error) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
      success: false,
      error: 'Error al parsear el body: ' + error.message
    }))
  }
}

/**
 * Maneja la petición DELETE a /api/data/:id
 * Elimina un elemento
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {number} id - ID del elemento a eliminar
 */
const deleteData = (req, res, id) => {
  const index = mockData.findIndex(item => item.id === id)

  if (index === -1) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
      success: false,
      error: 'Item no encontrado',
      id
    }))
    return
  }

  const deletedItem = mockData.splice(index, 1)[0]

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({
    success: true,
    message: 'Item eliminado exitosamente',
    data: deletedItem
  }))
}

module.exports = { getData, getDataById, createData, updateData, deleteData }
