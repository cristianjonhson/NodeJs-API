/**
 * Error de aplicación con status HTTP y detalles opcionales.
 */

class AppError extends Error {
  constructor (statusCode, message, details) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.details = details
  }
}

module.exports = { AppError }
