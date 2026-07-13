const cors = require('cors');

const allowedOrigins = [
    'http://localhost:1234',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:1234',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // In development, allow all origins
            if (process.env.NODE_ENV === 'development') {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

module.exports = cors(corsOptions);