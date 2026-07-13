const express = require('express');
const router = express.Router();

// Import API version routers
const v1Routes = require('./api/v1');

// Mount version routes
router.use('/v1', v1Routes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;