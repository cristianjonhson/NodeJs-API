/**
 * Controlador para el manejo de datos.
 * Este archivo contiene las funciones que gestionan las solicitudes HTTP relacionadas con los datos.
 * Las operaciones principales incluyen obtener, crear, actualizar y eliminar datos.
 */

const { parseBody } = require('../utils/bodyParser')
const { validateDataPayload, validateId } = require('../validators/data.validator')

const createDataController = ({ dataService, responseBuilder, logger, config }) => {
  /**
   * Maneja la solicitud GET a /api/data.
   * Devuelve todos los elementos disponibles.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  const getData = (req, res) => {
    const data = dataService.getAllData()
    responseBuilder.success(res, 200, {
      count: data.length,
      data
    })
  }

  /**
   * Maneja la solicitud GET a /api/data/:id.
   * Devuelve un elemento específico basado en su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @param {number} id - ID del elemento a obtener.
   */
  const getDataById = (req, res, id) => {
    const idErrors = validateId(id)
    if (idErrors.length > 0) {
      responseBuilder.error(res, 400, 'ID inválido', idErrors)
      return
    }

    const item = dataService.getDataById(id)

    if (!item) {
      responseBuilder.error(res, 404, 'Item no encontrado', { id })
      return
    }

    responseBuilder.success(res, 200, {
      data: item
    })
  }

  /**
   * Maneja la solicitud POST a /api/data.
   * Crea un nuevo elemento basado en los datos proporcionados en el cuerpo de la solicitud.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  const createData = async (req, res) => {
    try {
      const body = await parseBody(req, { limitBytes: config.BODY_LIMIT_BYTES })
      const errors = validateDataPayload(body, { requireName: true })

      if (errors.length > 0) {
        responseBuilder.error(res, 400, 'Datos inválidos', errors)
        return
      }

      const newItem = dataService.createData(body)

      logger.info('Item created', { id: newItem.id })
      responseBuilder.success(res, 201, {
        message: 'Item creado exitosamente',
        data: newItem
      })
    } catch (error) {
      responseBuilder.error(res, error.statusCode || 400, 'Error al procesar el body', error.message)
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
      const idErrors = validateId(id)
      if (idErrors.length > 0) {
        responseBuilder.error(res, 400, 'ID inválido', idErrors)
        return
      }

      const body = await parseBody(req, { limitBytes: config.BODY_LIMIT_BYTES })
      const errors = validateDataPayload(body)

      if (errors.length > 0) {
        responseBuilder.error(res, 400, 'Datos inválidos', errors)
        return
      }

      const updatedItem = dataService.updateData(id, body)

      if (!updatedItem) {
        responseBuilder.error(res, 404, 'Item no encontrado', { id })
        return
      }

      logger.info('Item updated', { id })
      responseBuilder.success(res, 200, {
        message: 'Item actualizado exitosamente',
        data: updatedItem
      })
    } catch (error) {
      responseBuilder.error(res, error.statusCode || 400, 'Error al procesar el body', error.message)
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
    const idErrors = validateId(id)
    if (idErrors.length > 0) {
      responseBuilder.error(res, 400, 'ID inválido', idErrors)
      return
    }

    const deletedItem = dataService.deleteData(id)

    if (!deletedItem) {
      responseBuilder.error(res, 404, 'Item no encontrado', { id })
      return
    }

    logger.info('Item deleted', { id })
    responseBuilder.success(res, 200, {
      message: 'Item eliminado exitosamente',
      data: deletedItem
    })
  }

  return { getData, getDataById, createData, updateData, deleteData }
}

module.exports = { createDataController }
