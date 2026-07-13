const app = require('./app');
const config = require('./config/config');
const db = require('./config/database');
const logger = require('./utils/logger/logger');
const fs = require('fs');
const path = require('path');

const PORT = config.port;

// Ensure required directories exist
const requiredDirs = [
    config.uploadDir,
    config.videoUploadDir || path.join(__dirname, 'storage/uploads/videos'),
    config.processedDir,
    config.tempDir || path.join(__dirname, 'storage/temp'),
    path.join(__dirname, 'storage/temp/frames'),
    path.dirname(config.logging.errorLogPath)
];

requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        logger.info(`Created directory: ${dir}`);
    }
});

// Initialize database
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS analysis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            filePath TEXT NOT NULL,
            result TEXT NOT NULL,
            newsCategory TEXT,
            confidence REAL,
            processingTime INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            logger.error('Error creating analysis table:', err);
        } else {
            logger.info('✅ Database initialized successfully');
        }
    });
});

// Start server directly (models load on-demand)
async function startServer() {
    try {
        const server = app.listen(PORT, () => {
            console.log('\n' + '='.repeat(60));
            console.log('🚀 Deep Learning Content Recognition Server');
            console.log('='.repeat(60));
            console.log(`📡 API running at: http://localhost:${PORT}`);
            console.log(`🌐 Environment: ${config.nodeEnv}`);
            console.log(`📊 Models: CNN (Images) + RNN (Videos)`);
            console.log(`ℹ️  Status: Using mock predictions until models are trained`);
            console.log('='.repeat(60));
            console.log('\n✅ Server ready for news content analysis!\n');
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            logger.info('SIGTERM signal received: closing server');
            server.close(() => {
                logger.info('Server closed');
                db.close();
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            logger.info('SIGINT signal received: closing server');
            server.close(() => {
                logger.info('Server closed');
                db.close();
                process.exit(0);
            });
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();