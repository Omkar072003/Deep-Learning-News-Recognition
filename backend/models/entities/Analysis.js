const db = require('../../config/database');
const logger = require('../../utils/logger/logger');

const Analysis = {
    // Create new analysis record
    create: async (data) => {
        try {
            const result = await db.runAsync(
                `INSERT INTO analysis (type, filePath, result, newsCategory, confidence, processingTime) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    data.type,
                    data.filePath,
                    JSON.stringify(data.result),
                    data.result.newsCategory || null,
                    data.result.overallConfidence || null,
                    data.result.processingTimeMs || null
                ]
            );

            logger.info('Analysis saved to database', {
                id: result.id,
                type: data.type,
                category: data.result.newsCategory
            });

            return { id: result.id, ...data };
        } catch (error) {
            logger.error('Error creating analysis:', error);
            throw error;
        }
    },

    // Find all analyses
    findAll: async (limit = 50) => {
        try {
            const rows = await db.allAsync(
                'SELECT * FROM analysis ORDER BY createdAt DESC LIMIT ?',
                [limit]
            );
            return rows;
        } catch (error) {
            logger.error('Error finding all analyses:', error);
            throw error;
        }
    },

    // Find by ID
    findById: async (id) => {
        try {
            const row = await db.getAsync(
                'SELECT * FROM analysis WHERE id = ?',
                [id]
            );
            return row;
        } catch (error) {
            logger.error('Error finding analysis by ID:', error);
            throw error;
        }
    },

    // Find by type (image/video)
    findByType: async (type, limit = 20) => {
        try {
            const rows = await db.allAsync(
                'SELECT * FROM analysis WHERE type = ? ORDER BY createdAt DESC LIMIT ?',
                [type, limit]
            );
            return rows;
        } catch (error) {
            logger.error('Error finding analyses by type:', error);
            throw error;
        }
    },

    // Find by news category
    findByCategory: async (category, limit = 20) => {
        try {
            const rows = await db.allAsync(
                'SELECT * FROM analysis WHERE newsCategory = ? ORDER BY createdAt DESC LIMIT ?',
                [category, limit]
            );
            return rows;
        } catch (error) {
            logger.error('Error finding analyses by category:', error);
            throw error;
        }
    },

    // Get statistics
    getStats: async () => {
        try {
            const totalCount = await db.getAsync('SELECT COUNT(*) as count FROM analysis');
            const byType = await db.allAsync(`
                SELECT type, COUNT(*) as count 
                FROM analysis 
                GROUP BY type
            `);
            const byCategory = await db.allAsync(`
                SELECT newsCategory, COUNT(*) as count 
                FROM analysis 
                WHERE newsCategory IS NOT NULL
                GROUP BY newsCategory
            `);

            return {
                total: totalCount.count,
                byType: byType,
                byCategory: byCategory
            };
        } catch (error) {
            logger.error('Error getting stats:', error);
            throw error;
        }
    },

    // Delete old records (cleanup)
    deleteOlderThan: async (days = 30) => {
        try {
            const result = await db.runAsync(
                `DELETE FROM analysis WHERE createdAt < datetime('now', '-${days} days')`
            );
            logger.info(`Deleted ${result.changes} old analysis records`);
            return result.changes;
        } catch (error) {
            logger.error('Error deleting old analyses:', error);
            throw error;
        }
    }
};

module.exports = Analysis;