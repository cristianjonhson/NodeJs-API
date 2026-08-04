/**
 * Rate limiting simple en memoria por IP.
 */

const createRateLimiter = ({ windowMs, maxRequests }, responseBuilder, logger) => {
  const clients = new Map()

  return (req, res) => {
    const now = Date.now()
    const ip = req.socket.remoteAddress || 'unknown'
    const current = clients.get(ip)

    if (!current || current.resetAt <= now) {
      clients.set(ip, { count: 1, resetAt: now + windowMs })
      return false
    }

    current.count += 1

    if (current.count <= maxRequests) {
      return false
    }

    const retryAfter = Math.ceil((current.resetAt - now) / 1000)
    res.setHeader('Retry-After', retryAfter)
    logger.warn('Rate limit exceeded', { ip, method: req.method, url: req.url, retryAfter })
    responseBuilder.error(res, 429, 'Demasiadas peticiones. Intenta nuevamente más tarde.', { retryAfter })
    return true
  }
}

module.exports = { createRateLimiter }
