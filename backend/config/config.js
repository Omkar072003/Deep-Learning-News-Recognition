require('dotenv').config();
const path = require('path');

module.exports = {
    // Server configuration
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // Storage paths
    uploadDir: process.env.UPLOAD_DIR || path.join(__dirname, '../storage/uploads/images'),
    videoUploadDir: path.join(__dirname, '../storage/uploads/videos'),
    processedDir: process.env.PROCESSED_DIR || path.join(__dirname, '../storage/processed'),
    tempDir: path.join(__dirname, '../storage/temp'),

    // Database
    dbUrl: process.env.DATABASE_URL || path.join(__dirname, '../data/databases/content_recognition.db'),

    // Model paths
    modelDir: path.join(__dirname, '../data/models/trained'),
    cnnModelPath: path.join(__dirname, '../data/models/trained/cnn_model.json'),
    rnnModelPath: path.join(__dirname, '../data/models/trained/rnn_model.json'),

    // Authentication
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-here',

    // Cloud services
    cloudApiKey: process.env.CLOUD_API_KEY,

    // File upload limits
    maxFileSize: 50 * 1024 * 1024, // 50MB
    allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    allowedVideoTypes: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'],

    // ML Model configuration
    ml: {
        cnn: {
            inputShape: [224, 224, 3],
            numClasses: 25,
            batchSize: 32
        },
        rnn: {
            sequenceLength: 10,
            featureDim: 2048,
            numClasses: 12
        }
    },

    // CORS configuration - Fixed (array format)
    cors: {
        origins: [
            'http://localhost:1234',
            'http://localhost:3000',
            'http://localhost:5000',
            'http://127.0.0.1:1234',
            'http://127.0.0.1:3000'
        ],
        credentials: true
    },

    // Logging
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        errorLogPath: path.join(__dirname, '../logs/error.log'),
        appLogPath: path.join(__dirname, '../logs/app.log')
    }
};