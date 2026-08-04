/**
 * Logger estructurado con salida JSON por línea.
 */

const write = (level, message, context = {}) => {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context
  }

  const output = JSON.stringify(entry)

  if (level === 'error') {
    console.error(output)
    return
  }

  console.log(output)
}

const info = (message, context) => write('info', message, context)
const warn = (message, context) => write('warn', message, context)
const error = (message, context) => write('error', message, context)

module.exports = { info, warn, error }
