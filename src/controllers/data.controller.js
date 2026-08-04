/**
 * Controlador para el manejo de datos.
 * Este archivo contiene las funciones que gestionan las solicitudes HTTP relacionadas con los datos.
 * Las operaciones principales incluyen obtener, crear, actualizar y eliminar datos.
 */

const {
  getAllData,
  getDataById: getDataByIdService,
  createData: createDataService,
  updateData: updateDataService,
  deleteData: deleteDataService
} = require('../services/data.service')
const { parseBody } = require('../utils/bodyParser')

/**
 * Maneja la solicitud GET a /api/data.
 * Devuelve todos los elementos disponibles.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const getData = (req, res) => {
  const data = getAllData()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({
    success: true,
    count: data.length,
    data
  }))
}

/**
 * Maneja la solicitud GET a /api/data/:id.
 * Devuelve un elemento específico basado en su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {number} id - ID del elemento a obtener.
 */
const getDataById = (req, res, id) => {
  const item = getDataByIdService(id)

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
 * Maneja la solicitud POST a /api/data.
 * Crea un nuevo elemento basado en los datos proporcionados en el cuerpo de la solicitud.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
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

    const newItem = createDataService(body)

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
 * Maneja la solicitud PUT a /api/data/:id.
 * Actualiza un elemento existente basado en su ID y los datos proporcionados.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {number} id - ID del elemento a actualizar.
 */
const updateData = async (req, res, id) => {
  try {
    const body = await parseBody(req)
    const updatedItem = updateDataService(id, body)

    if (!updatedItem) {
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
      message: 'Item actualizado exitosamente',
      data: updatedItem
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
 * Maneja la solicitud DELETE a /api/data/:id.
 * Elimina un elemento existente basado en su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {number} id - ID del elemento a eliminar.
 */
const deleteData = (req, res, id) => {
  const deletedItem = deleteDataService(id)

  if (!deletedItem) {
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
    message: 'Item eliminado exitosamente',
    data: deletedItem
  }))
}

module.exports = { getData, getDataById, createData, updateData, deleteData }
