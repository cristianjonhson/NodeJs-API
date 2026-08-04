/**
 * Utilidad para construir respuestas JSON consistentes.
 */

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

const success = (res, statusCode, payload = {}) => {
  sendJson(res, statusCode, {
    success: true,
    ...payload
  })
}

const error = (res, statusCode, message, details = undefined) => {
  const payload = {
    success: false,
    error: message
  }

  if (details !== undefined) {
    payload.details = details
  }

  sendJson(res, statusCode, payload)
}

module.exports = { sendJson, success, error }
