const logger = require('../utils/logger/logger');

// File validation middleware
const validateFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'File is required. Please upload an image or video.'
        });
    }

    const file = req.file;

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
    const allAllowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

    if (!allAllowedTypes.includes(file.mimetype)) {
        return res.status(415).json({
            success: false,
            error: 'Invalid file type. Only images (JPEG, PNG, GIF) and videos (MP4, MPEG, MOV) are allowed.'
        });
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
        return res.status(413).json({
            success: false,
            error: 'File too large. Maximum size is 50MB.'
        });
    }

    // Log validation success
    logger.info('File validation passed', {
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    });

    next();
};

// Request body validation
const validateAnalysisRequest = (req, res, next) => {
    // Can add additional validation for request body here
    // For example, if user sends metadata along with file
    
    next();
};

module.exports = {
    validateFile,
    validateAnalysisRequest
};

// Default export for backward compatibility
module.exports = validateFile;