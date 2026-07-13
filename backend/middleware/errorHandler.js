const logger = require('../utils/logger/logger');

module.exports = (err, req, res, next) => {
    // Log error
    logger.logError(err, {
        method: req.method,
        url: req.url,
        ip: req.ip
    });

    // Multer errors
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large. Maximum size is 50MB'
            });
        }
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }

    // TensorFlow errors
    if (err.message && err.message.includes('tensor')) {
        return res.status(500).json({
            success: false,
            error: 'ML model processing error'
        });
    }

    // Default error
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};