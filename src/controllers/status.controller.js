/**
 * Controlador para el endpoint de status.
 */

const createStatusController = ({ responseBuilder, config, dataService }) => {
  const getStatus = (req, res) => {
    const memory = process.memoryUsage()
    const heapUsedRatio = memory.heapUsed / memory.heapTotal
    const checks = {
      server: 'OK',
      memory: heapUsedRatio < config.HEALTH.maxHeapUsedRatio ? 'OK' : 'DEGRADED',
      dataStore: Array.isArray(dataService.getAllData()) ? 'OK' : 'ERROR'
    }
    const healthy = Object.values(checks).every(check => check === 'OK')

    responseBuilder.success(res, healthy ? 200 : 503, {
      status: healthy ? 'OK' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      checks,
      memory: {
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external
      }
    })
  }

  return { getStatus }
}

module.exports = { createStatusController }
