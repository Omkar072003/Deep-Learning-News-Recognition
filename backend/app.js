const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config/config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger/logger');

const app = express();

// CORS configuration - Fixed for multiple origins
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:1234',
            'http://localhost:3000',
            'http://localhost:5000',
            'http://127.0.0.1:1234',
            'http://127.0.0.1:3000'
        ];
        
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all origins in development
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600 // Cache preflight request for 10 minutes
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// HTTP request logging
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }));
}

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'storage/uploads')));

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Deep Learning Content Recognition API',
        version: '1.0.0',
        endpoints: {
            health: '/api/v1/health',
            analyzeImage: '/api/v1/analyze/image',
            analyzeVideo: '/api/v1/analyze/video',
            results: '/api/v1/results'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;