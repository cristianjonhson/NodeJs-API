/**
 * Validaciones de entrada para el recurso data.
 */

const isPlainObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

const validateDataPayload = (body, options = {}) => {
  const errors = []
  const requireName = options.requireName === true

  if (!isPlainObject(body)) {
    return ['El body debe ser un objeto JSON']
  }

  const allowedFields = ['name', 'description']
  Object.keys(body).forEach((field) => {
    if (!allowedFields.includes(field)) {
      errors.push(`El campo "${field}" no está permitido`)
    }
  })

  if (requireName && body.name === undefined) {
    errors.push('El campo "name" es requerido')
  }

  if (body.name !== undefined) {
    if (typeof body.name !== 'string') {
      errors.push('El campo "name" debe ser texto')
    } else if (body.name.trim().length === 0) {
      errors.push('El campo "name" no puede estar vacío')
    } else if (body.name.length > 100) {
      errors.push('El campo "name" no puede superar 100 caracteres')
    }
  }

  if (body.description !== undefined) {
    if (typeof body.description !== 'string') {
      errors.push('El campo "description" debe ser texto')
    } else if (body.description.length > 500) {
      errors.push('El campo "description" no puede superar 500 caracteres')
    }
  }

  return errors
}

const validateId = (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    return ['El ID debe ser un número entero positivo']
  }

  return []
}

module.exports = { validateDataPayload, validateId }
