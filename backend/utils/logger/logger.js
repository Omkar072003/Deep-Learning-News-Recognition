const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'deep-learning-content-recognition' },
    transports: [
        // Error logs
        new transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Combined logs
        new transports.File({
            filename: path.join(logsDir, 'app.log'),
            maxsize: 5242880,
            maxFiles: 5
        }),
        // Analysis-specific logs
        new transports.File({
            filename: path.join(logsDir, 'analysis.log'),
            level: 'info',
            maxsize: 5242880,
            maxFiles: 5
        })
    ]
});

// Console logging for development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        )
    }));
}

// Helper methods
logger.logAnalysis = (data) => {
    logger.info('Analysis completed', {
        type: data.type,
        category: data.newsCategory,
        confidence: data.overallConfidence,
        processingTime: data.processingTimeMs
    });
};

logger.logError = (error, context = {}) => {
    logger.error('Error occurred', {
        error: error.message,
        stack: error.stack,
        ...context
    });
};

module.exports = logger;