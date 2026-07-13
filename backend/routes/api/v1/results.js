const express = require('express');
const router = express.Router();
const Analysis = require('../../../models/entities/Analysis');
const logger = require('../../../utils/logger/logger');

// Get all analysis results
router.get('/', async (req, res) => {
    try {
        const { type, category, limit } = req.query;

        let results;

        if (type) {
            results = await Analysis.findByType(type, limit ? parseInt(limit) : 20);
        } else if (category) {
            results = await Analysis.findByCategory(category, limit ? parseInt(limit) : 20);
        } else {
            results = await Analysis.findAll(limit ? parseInt(limit) : 50);
        }

        res.json({
            success: true,
            count: results.length,
            results: results
        });
    } catch (error) {
        logger.error('Error fetching results:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get single result by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await Analysis.findById(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Result not found'
            });
        }

        res.json({
            success: true,
            result: result
        });
    } catch (error) {
        logger.error('Error fetching result:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get statistics
router.get('/stats/summary', async (req, res) => {
    try {
        const stats = await Analysis.getStats();

        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        logger.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;