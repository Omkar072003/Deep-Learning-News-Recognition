const { analyzeImage, analyzeVideo } = require('../services/aiService');
const Analysis = require('../models/entities/Analysis');

exports.analyzeImageContent = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: 'No file uploaded' 
            });
        }

        const filePath = req.file.path;
        const result = await analyzeImage(filePath);

        // Save analysis to DB with new fields
        await Analysis.create({ 
            type: 'image', 
            filePath, 
            result: JSON.stringify(result),
            description: result.description,
            categoryPredictions: JSON.stringify(result.categoryPredictions),
            confidenceRange: result.confidenceRange,
            topCategory: result.newsCategory
        });

        res.status(200).json({ 
            success: true, 
            result,
            filename: req.file.filename,
            originalName: req.file.originalname
        });

    } catch (error) {
        console.error('Image analysis error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

exports.analyzeVideoContent = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: 'No file uploaded' 
            });
        }

        const filePath = req.file.path;
        const result = await analyzeVideo(filePath);

        // Save analysis to DB with new fields
        await Analysis.create({ 
            type: 'video', 
            filePath, 
            result: JSON.stringify(result),
            description: result.description,
            categoryPredictions: JSON.stringify(result.categoryPredictions),
            confidenceRange: result.confidenceRange,
            topCategory: result.newsCategory
        });

        res.status(200).json({ 
            success: true, 
            result,
            filename: req.file.filename,
            originalName: req.file.originalname
        });

    } catch (error) {
        console.error('Video analysis error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};