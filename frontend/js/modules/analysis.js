// analysis.js
import { analyzeContent } from "../services/analysisService.js";
import { displayResult } from "../components/resultDisplay.js";

export async function handleAnalyze(file, fileType = 'image') {
    if (!file) {
        alert("Please select a file to analyze.");
        return;
    }

    const resultsSection = document.getElementById('resultsSection');
    let resultsContainer = document.getElementById('results-container');
    
    if (!resultsContainer) {
        resultsContainer = document.getElementById('results');
    }

    try {
        // Show loading state
        if (resultsSection) resultsSection.style.display = 'block';
        
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="spinner mb-4"></div>
                    <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
                        Analyzing with ${fileType === 'video' ? 'RNN/LSTM' : 'CNN'} model...
                    </p>
                    <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
                        This may take a few moments
                    </p>
                </div>
            `;
        }

        // Call backend analyze service
        const result = await analyzeContent(file, fileType);

        console.log('✅ Analysis complete:', result);

        // Display results using resultDisplay module
        displayResult(result);

    } catch (error) {
        console.error("❌ Error analyzing file:", error);
        
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
                    <h3 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">❌ Analysis Failed</h3>
                    <p class="text-red-700 dark:text-red-300 mb-4">${error.message}</p>
                    <button onclick="location.reload()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                        Try Again
                    </button>
                </div>
            `;
        }
        
        throw error;
    }
}

// Helper to format analysis results for display
export function formatAnalysisResults(result) {
    if (!result) {
        return null;
    }

    // Handle different result structures
    const data = result.result || result;

    return {
        dominantObjects: data.detectedObjects || data.objects || data.labels || [],
        sceneType: data.sceneType || data.scene || data.category || 'Unknown',
        dominantColors: data.dominantColors || data.colors || [],
        qualityScore: data.qualityScore || data.quality || data.confidence || 'N/A',
        processedAt: new Date(data.timestamp || Date.now()).toLocaleString(),
        modelVersion: data.modelVersion || 'v1.0',
        confidence: data.overallConfidence || data.confidence || 'N/A',
        predictions: data.predictions || [],
        metadata: data.imageMetadata || data.videoMetadata || data.metadata || {}
    };
}