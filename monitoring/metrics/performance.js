const os = require('os');

function getPerformanceMetrics() {
  return {
    memory: process.memoryUsage(),
    cpuLoad: os.loadavg(),
    uptime: process.uptime(),
    freeMemory: os.freemem(),
    totalMemory: os.totalmem()
  };
}

module.exports = getPerformanceMetrics;