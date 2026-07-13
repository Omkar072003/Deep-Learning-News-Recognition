const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const sharp = require('sharp');
const path = require('path');

let cnnModel = null;

// Enhanced news-related labels mapping
const NEWS_LABELS = [
    'person', 'politician', 'crowd', 'protest', 'conference',
    'sports', 'accident', 'fire', 'flood', 'earthquake',
    'celebration', 'military', 'police', 'doctor', 'scientist',
    'building', 'monument', 'vehicle', 'aircraft', 'ship',
    'weapon', 'flag', 'banner', 'stage', 'podium', 'microphone'
];

// ENHANCED: Map ImageNet labels to news categories
const IMAGENET_TO_NEWS_MAPPING = {
    // Political/Formal
    'microphone': 'conference',
    'stage': 'conference',
    'suit': 'politician',
    'bow_tie': 'politician',
    'neck_tie': 'politician',
    'Windsor_tie': 'politician',
    'bolo_tie': 'politician',
    'academic_gown': 'conference',
    'gown': 'politician',
    
    // Sports
    'stadium': 'sports',
    'jersey': 'sports',
    'basketball': 'sports',
    'soccer_ball': 'sports',
    'tennis_ball': 'sports',
    
    // Disaster/Emergency
    'ambulance': 'accident',
    'fire_engine': 'fire',
    'police_van': 'police',
    'crash_helmet': 'accident',
    
    // Military
    'military_uniform': 'military',
    'tank': 'military',
    'missile': 'military',
    'aircraft_carrier': 'military',
    'warplane': 'military',
    
    // Buildings/Monuments
    'mosque': 'building',
    'church': 'building',
    'palace': 'monument',
    'castle': 'monument',
    'triumphal_arch': 'monument',
    
    // Media/Documents (often misclassified political posters)
    'book_jacket': 'media',
    'comic_book': 'media',
    'web_site': 'media',
    'menu': 'document',
    'envelope': 'document',
    'notebook': 'document',
    
    // People
    'person': 'person',
    'man': 'person',
    'woman': 'person',
    'face': 'person',
    'head': 'person',
    
    // Misc
    'shopping_cart': 'social',
    'banner': 'event',
    'flag': 'politics',
    'torch': 'event'
};

// ENHANCED: Scene categories with more keywords
const SCENE_CATEGORIES = {
    'politics': [
        'politician', 'conference', 'flag', 'podium', 'banner', 'microphone', 'suit',
        'bow_tie', 'neck_tie', 'Windsor_tie', 'person', 'man', 'woman', 'crowd',
        'media', 'document', 'stage', 'gown', 'academic_gown', 'event', 'torch'
    ],
    'disaster': ['fire', 'flood', 'earthquake', 'accident', 'ambulance', 'fire_engine', 'crash_helmet'],
    'sports': ['sports', 'stadium', 'jersey', 'athlete', 'ball', 'basketball', 'soccer_ball', 'tennis_ball'],
    'military': ['military', 'weapon', 'aircraft', 'ship', 'tank', 'uniform', 'missile', 'warplane'],
    'social': ['protest', 'crowd', 'celebration', 'people', 'person'],
    'entertainment': ['stage', 'performance', 'concert', 'theater', 'guitar', 'drum'],
    'technology': ['computer', 'phone', 'robot', 'machine', 'laptop'],
    'business': ['office', 'meeting', 'presentation', 'suit', 'briefcase'],
    'health': ['hospital', 'doctor', 'medical', 'stethoscope'],
    'education': ['school', 'classroom', 'students', 'book', 'mortarboard'],
    'nature': ['tree', 'mountain', 'ocean', 'animal', 'bird'],
    'general': ['person', 'building', 'vehicle', 'monument', 'book_jacket', 'media']
};

// All content categories for multi-label prediction
const CONTENT_CATEGORIES = {
    'politics': 0,
    'sports': 0,
    'entertainment': 0,
    'technology': 0,
    'business': 0,
    'disaster': 0,
    'military': 0,
    'health': 0,
    'education': 0,
    'nature': 0,
    'social': 0,
    'general': 0
};

/**
 * Load MobileNet model (pre-trained on ImageNet)
 */
async function loadModel() {
    if (!cnnModel) {
        try {
            console.log('📦 Loading MobileNet model...');
            cnnModel = await mobilenet.load({
                version: 2,
                alpha: 1.0
            });
            console.log('✅ MobileNet model loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load MobileNet:', error);
            console.log('⚠️  Falling back to mock predictions');
            cnnModel = 'mock';
        }
    }
    return cnnModel;
}

/**
 * Preprocess image for TensorFlow
 */
async function preprocessImage(filePath) {
    try {
        const { data, info } = await sharp(filePath)
            .resize(224, 224)
            .removeAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        // Convert raw RGB buffer to tensor [224, 224, 3]
        const imageTensor = tf.tensor3d(new Uint8Array(data), [info.height, info.width, info.channels]);
        
        // Normalize to [0, 1] as MobileNet expects
        const normalized = imageTensor.div(tf.scalar(255));
        imageTensor.dispose();
        
        return normalized;

    } catch (error) {
        console.error('❌ Image preprocessing error:', error);
        throw error;
    }
}

/**
 * NEW: Detect political context using multiple indicators
 */
function detectPoliticalContext(predictions) {
    const labels = predictions.map(p => p.className.toLowerCase());
    const scores = predictions.map(p => p.probability);
    
    console.log('🔍 Checking political indicators from:', labels);
    
    // Political indicators
    const politicalIndicators = {
        // Formal attire
        hasFormalWear: labels.some(l => 
            l.includes('suit') || 
            l.includes('tie') || 
            l.includes('bow') ||
            l.includes('windsor') ||
            l.includes('gown')
        ),
        
        // People/faces (multiple people suggests rally/event)
        hasPeople: labels.filter(l => 
            l.includes('person') || 
            l.includes('man') || 
            l.includes('woman') ||
            l.includes('face') ||
            l.includes('head')
        ).length >= 1,
        
        // Media/publicity (posters, banners often misclassified)
        hasMedia: labels.some(l => 
            l.includes('book_jacket') || 
            l.includes('comic_book') ||
            l.includes('web_site') ||
            l.includes('menu') ||
            l.includes('envelope') ||
            l.includes('notebook')
        ),
        
        // Stage/event
        hasStage: labels.some(l => 
            l.includes('stage') || 
            l.includes('microphone') ||
            l.includes('podium')
        ),
        
        // Flags/symbols
        hasSymbols: labels.some(l => 
            l.includes('flag') || 
            l.includes('banner') ||
            l.includes('tricolor') ||
            l.includes('torch')
        )
    };
    
    // Count political indicators
    const indicatorCount = Object.values(politicalIndicators).filter(Boolean).length;
    
    console.log('📊 Political indicators:', politicalIndicators);
    console.log('📈 Indicator count:', indicatorCount);
    
    // If 2+ indicators, likely political
    // Special case: media + people is VERY likely political poster/rally
    if ((politicalIndicators.hasMedia && politicalIndicators.hasPeople) || indicatorCount >= 2) {
        console.log('🎯 Political context detected!');
        return true;
    }
    
    return false;
}

/**
 * Map ImageNet predictions to news-relevant categories
 */
function mapToNewsCategories(predictions) {
    const newsPredictions = predictions.map(pred => {
        // Check if this ImageNet class maps to a news category
        const newsLabel = IMAGENET_TO_NEWS_MAPPING[pred.className.toLowerCase()] || pred.className;
        
        return {
            label: newsLabel,
            confidence: pred.probability,
            score: pred.probability,
            class: newsLabel,
            originalClass: pred.className
        };
    });

    // Add person detection for crowd analysis
    const hasPersons = predictions.some(p => 
        p.className.toLowerCase().includes('person') ||
        p.className.toLowerCase().includes('people') ||
        p.className.toLowerCase().includes('man') ||
        p.className.toLowerCase().includes('woman')
    );

    if (hasPersons && !newsPredictions.some(p => p.label === 'crowd')) {
        newsPredictions.push({
            label: 'person',
            confidence: 0.6,
            score: 0.6,
            class: 'person',
            originalClass: 'person'
        });
    }

    // Sort by confidence
    newsPredictions.sort((a, b) => b.confidence - a.confidence);

    return newsPredictions.slice(0, 5).map((pred, idx) => ({
        ...pred,
        rank: idx + 1
    }));
}

/**
 * ENHANCED: Calculate category ranges with political boost
 */
function calculateCategoryRanges(predictions, isPolitical = false) {
    const categories = {...CONTENT_CATEGORIES};
    
    predictions.forEach(pred => {
        const label = pred.label.toLowerCase();
        
        // Map predictions to all categories
        Object.keys(SCENE_CATEGORIES).forEach(category => {
            const keywords = SCENE_CATEGORIES[category];
            const matches = keywords.some(kw => label.includes(kw.toLowerCase()));
            
            if (matches) {
                categories[category] += pred.confidence;
            }
        });
    });
    
    // BOOST: If political context detected, ensure minimum politics score
    if (isPolitical) {
        console.log('🚀 Boosting politics category');
        categories.politics = Math.max(categories.politics, 0.5); // Minimum 50%
    }
    
    // Normalize scores to sum to 1.0
    const total = Object.values(categories).reduce((a, b) => a + b, 0) || 1;
    Object.keys(categories).forEach(key => {
        categories[key] = parseFloat((categories[key] / total).toFixed(4));
    });
    
    return categories;
}

/**
 * Generate short description based on detected content
 */
function generateDescription(predictions, category, categoryRanges) {
    const topObjects = predictions.slice(0, 3).map(p => p.label).join(', ');
    const confidence = (predictions[0].confidence * 100).toFixed(0);
    
    // Get top 3 categories
    const topCategories = Object.entries(categoryRanges)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .filter(([cat, score]) => score > 0.05)
        .map(([cat, score]) => `${cat} (${(score * 100).toFixed(0)}%)`);
    
    const templates = {
        'politics': `Political scene detected featuring ${topObjects}. Primary confidence: ${confidence}%. This appears to be a political event or government-related content. Categories: ${topCategories.join(', ')}.`,
        
        'sports': `Sports-related content showing ${topObjects}. ${confidence}% confidence indicates this is a sporting event or athletic activity. Categories: ${topCategories.join(', ')}.`,
        
        'disaster': `Emergency or disaster scene identified with ${topObjects}. High-priority content with ${confidence}% confidence. Categories: ${topCategories.join(', ')}.`,
        
        'military': `Military or defense-related content detected showing ${topObjects}. Confidence level: ${confidence}%. Categories: ${topCategories.join(', ')}.`,
        
        'entertainment': `Entertainment content featuring ${topObjects}. Analysis shows ${confidence}% confidence in entertainment classification. Categories: ${topCategories.join(', ')}.`,
        
        'technology': `Technology-related content identified with ${topObjects}. ${confidence}% confidence in tech category. Categories: ${topCategories.join(', ')}.`,
        
        'business': `Business or corporate content showing ${topObjects}. Confidence: ${confidence}%. Categories: ${topCategories.join(', ')}.`,
        
        'health': `Health or medical content detected featuring ${topObjects}. ${confidence}% confidence. Categories: ${topCategories.join(', ')}.`,
        
        'nature': `Nature or environmental content showing ${topObjects}. Analysis confidence: ${confidence}%. Categories: ${topCategories.join(', ')}.`,
        
        'social': `Social or public gathering detected with ${topObjects}. Confidence: ${confidence}%. Categories: ${topCategories.join(', ')}.`,
        
        'general': `Image analysis detected ${topObjects}. Primary confidence: ${confidence}%. Top categories: ${topCategories.join(', ')}.`
    };
    
    return templates[category] || templates['general'];
}

/**
 * Get confidence range classification
 */
function getConfidenceRange(score) {
    if (score >= 0.7) return 'High (70-100%)';
    if (score >= 0.4) return 'Medium (40-70%)';
    return 'Low (0-40%)';
}

/**
 * Main image analysis function
 */
async function analyzeImage(filePath) {
    try {
        const startTime = Date.now();
        
        console.log('🔍 Analyzing image:', filePath);
        
        const model = await loadModel();
        const metadata = await sharp(filePath).metadata();
        
        let topPredictions;
        let rawPredictions;
        let isPolitical = false;

        if (model === 'mock') {
            // Fallback to mock predictions
            topPredictions = generateMockPredictions();
        } else {
            // Real MobileNet predictions
            const imageTensor = await preprocessImage(filePath);
            
            // Get predictions from MobileNet
            rawPredictions = await model.classify(imageTensor);
            
            console.log('📊 Raw MobileNet predictions:', rawPredictions);
            
            // DETECT POLITICAL CONTEXT FIRST (before mapping)
            isPolitical = detectPoliticalContext(rawPredictions);
            
            // Map to news-relevant categories
            topPredictions = mapToNewsCategories(rawPredictions);
            
            console.log('📰 News-mapped predictions:', topPredictions);
            
            // Cleanup tensor
            imageTensor.dispose();
        }

        // Extract dominant colors
        const dominantColors = await extractDominantColors(filePath);
        
        // Determine primary news category
        let newsCategory = determineNewsCategory(topPredictions);
        
        // OVERRIDE: If political context detected and category is general, force politics
        if (isPolitical && newsCategory === 'general') {
            console.log('🎯 Overriding category to POLITICS based on context indicators');
            newsCategory = 'politics';
            
            // BOOST: Update predictions to reflect political context
            topPredictions = topPredictions.map(pred => {
                // Convert generic labels to political ones
                if (['person', 'media', 'document', 'book_jacket', 'comic_book', 'event', 'torch'].includes(pred.label)) {
                    return {
                        ...pred,
                        label: 'politician',
                        confidence: Math.min(pred.confidence * 1.4, 0.92) // Boost confidence
                    };
                }
                return pred;
            });
            
            console.log('✨ Boosted predictions:', topPredictions);
        }
        
        // Calculate category ranges with political boost
        const categoryPredictions = calculateCategoryRanges(topPredictions, isPolitical);
        
        // Generate short description
        const description = generateDescription(topPredictions, newsCategory, categoryPredictions);
        
        // Get confidence range
        const confidenceRange = getConfidenceRange(topPredictions[0].confidence);
        
        // Generate insights
        const newsInsights = generateNewsInsights(topPredictions, newsCategory);

        const processingTime = Date.now() - startTime;

        return {
            success: true,
            type: 'image',
            contentType: 'news',
            
            detectedObjects: topPredictions.map(p => p.label),
            predictions: topPredictions,
            
            // NEW FIELDS
            categoryPredictions: categoryPredictions,
            description: description,
            confidenceRange: confidenceRange,
            
            newsCategory: newsCategory,
            sceneType: topPredictions[0].label,
            newsInsights: newsInsights,
            
            dominantColors: dominantColors,
            
            overallConfidence: (topPredictions[0].confidence * 100).toFixed(2) + '%',
            qualityScore: calculateQualityScore(topPredictions),
            
            imageMetadata: {
                width: metadata.width,
                height: metadata.height,
                format: metadata.format
            },
            
            timestamp: new Date().toISOString(),
            processingTimeMs: processingTime,
            modelVersion: 'MobileNet-v2',
            modelType: 'Convolutional Neural Network (CNN)',
            note: model === 'mock' ? 'Using mock predictions (model loading failed)' : 'Using MobileNet pre-trained CNN model with context detection'
        };

    } catch (error) {
        console.error('❌ Image analysis error:', error);
        throw new Error(`Image analysis failed: ${error.message}`);
    }
}

/**
 * Generate mock predictions (fallback)
 */
function generateMockPredictions() {
    const mockLabels = ['politician', 'crowd', 'conference', 'building', 'person'];
    return mockLabels.map((label, idx) => ({
        label: label,
        confidence: parseFloat((0.85 - idx * 0.1).toFixed(4)),
        score: (0.85 - idx * 0.1),
        class: label,
        rank: idx + 1
    }));
}

/**
 * Extract dominant colors from image
 */
async function extractDominantColors(filePath) {
    try {
        const { dominant } = await sharp(filePath)
            .resize(100, 100)
            .stats();

        if (dominant) {
            return [
                `rgb(${dominant.r},${dominant.g},${dominant.b})`,
                `rgb(${Math.max(0, dominant.r - 30)},${Math.max(0, dominant.g - 30)},${Math.max(0, dominant.b - 30)})`,
                `rgb(${Math.min(255, dominant.r + 30)},${Math.min(255, dominant.g + 30)},${Math.min(255, dominant.b + 30)})`
            ];
        }
    } catch (error) {
        console.error('❌ Color extraction error:', error);
    }
    
    return ['rgb(128,128,128)', 'rgb(200,200,200)', 'rgb(100,100,100)'];
}

/**
 * Determine primary news category from predictions
 */
function determineNewsCategory(predictions) {
    const detectedLabels = predictions.map(p => p.label.toLowerCase());

    for (const [category, keywords] of Object.entries(SCENE_CATEGORIES)) {
        const matches = keywords.filter(kw => 
            detectedLabels.some(label => label.includes(kw.toLowerCase()))
        );
        if (matches.length > 0) return category;
    }

    return 'general';
}

/**
 * Generate news insights based on predictions
 */
function generateNewsInsights(predictions, category) {
    const insights = {
        category: category,
        relevance: 'high',
        suggestedTags: predictions.slice(0, 3).map(p => p.label),
        potentialFakeNews: false,
        contentFilter: 'safe'
    };

    if (category === 'disaster') {
        insights.urgency = 'high';
        insights.alertType = 'emergency';
    } else if (category === 'politics') {
        insights.urgency = 'medium';
        insights.alertType = 'important';
    } else if (category === 'military') {
        insights.urgency = 'high';
        insights.alertType = 'critical';
    } else {
        insights.urgency = 'low';
        insights.alertType = 'informational';
    }

    return insights;
}

/**
 * Calculate overall quality score
 */
function calculateQualityScore(predictions) {
    const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
    return (avgConfidence * 100).toFixed(2);
}

module.exports = analyzeImage;
