const analyzeImage = require('../models/ai/imageAnalyzer');
const analyzeVideo = require('../models/ai/videoAnalyzer');
const logger = require('../utils/logger/logger');

module.exports = {
    analyzeImage: async (filePath) => {
        try {
            logger.info('Starting image analysis', { filePath });
            const result = await analyzeImage(filePath);
            logger.logAnalysis(result);
            return result;
        } catch (error) {
            logger.error('Image analysis failed:', error);
            throw error;
        }
    },

    analyzeVideo: async (filePath) => {
        try {
            logger.info('Starting video analysis', { filePath });
            const result = await analyzeVideo(filePath);
            logger.logAnalysis(result);
            return result;
        } catch (error) {
            logger.error('Video analysis failed:', error);
            throw error;
        }
    }
};