const express = require('express');
const router = express.Router();

// Import route modules
const analyzeRoutes = require('./analyze');
const uploadRoutes = require('./upload');
const resultsRoutes = require('./results');
const healthRoutes = require('./health');

// Mount routes
router.use('/analyze', analyzeRoutes);
router.use('/upload', uploadRoutes);
router.use('/results', resultsRoutes);
router.use('/health', healthRoutes);

module.exports = router;
