import { formatAnalysisResults } from '../modules/analysis.js';

/**
 * Display analysis results in UI
 */
export function displayResult(data) {
    // Try multiple possible container IDs
    let resultsContainer = document.getElementById('results-container');
    
    if (!resultsContainer) {
        resultsContainer = document.getElementById('results');
    }
    
    if (!resultsContainer) {
        console.error('❌ Results container not found. Creating one...');
        
        // Create results section if it doesn't exist
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'results-container';
            resultsSection.appendChild(resultsContainer);
            resultsSection.style.display = 'block';
        } else {
            console.error('❌ No results section found in HTML');
            alert('Error: Results display area not found');
            return;
        }
    }

    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }

    // Check if data has success flag
    if (!data || !data.success) {
        resultsContainer.innerHTML = `
            <div class="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
                <h3 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">❌ Analysis Failed</h3>
                <p class="text-red-700 dark:text-red-300">${data?.error || 'No results returned from server'}</p>
            </div>
        `;
        return;
    }

    // Handle nested result structure
    let result = data;
    
    if (data.result && data.result.result) {
        console.log('📦 Unwrapping nested result structure');
        result = data.result.result;
    } else if (data.result) {
        console.log('📦 Using result object');
        result = data.result;
    }
    
    // Keep the filename and originalName from the top level if they exist
    if (data.filename) result.filename = data.filename;
    if (data.originalName) result.originalName = data.originalName;

    console.log('✅ Final result object:', result);

    // Format results
    const formatted = formatAnalysisResults(result);
    
    if (!formatted) {
        resultsContainer.innerHTML = `
            <div class="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg">
                <h3 class="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Invalid Results</h3>
                <p class="text-yellow-700 dark:text-yellow-300">Unable to parse analysis results</p>
            </div>
        `;
        return;
    }

    // Determine badge color based on category
    const categoryColors = {
        'politics': 'bg-blue-500',
        'disaster': 'bg-red-500',
        'sports': 'bg-green-500',
        'social': 'bg-orange-500',
        'military': 'bg-gray-500',
        'entertainment': 'bg-purple-500',
        'technology': 'bg-cyan-500',
        'business': 'bg-indigo-500',
        'health': 'bg-pink-500',
        'nature': 'bg-emerald-500',
        'education': 'bg-yellow-500',
        'general': 'bg-gray-400'
    };

    const badgeColor = categoryColors[result.newsCategory] || 'bg-gray-400';

    // Build comprehensive results HTML
    resultsContainer.innerHTML = `
        <div class="space-y-6 fade-in">
            <!-- Header with Category -->
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-2xl font-bold mb-2">Analysis Complete</h3>
                    <span class="${badgeColor} text-white px-4 py-1 rounded-full text-sm font-semibold">
                        ${result.newsCategory?.toUpperCase() || 'GENERAL'}
                    </span>
                </div>
                <div class="text-right">
                    <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        ${result.overallConfidence || 'N/A'}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Confidence Score</div>
                </div>
            </div>

            <!-- Description Section (NEW) -->
            <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 p-6 rounded-lg">
                <h4 class="font-bold text-lg mb-3 flex items-center">
                    <span class="text-2xl mr-2">📝</span>
                    Content Description
                </h4>
                <p class="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                    ${result.description || 'No description available'}
                </p>
                <div class="mt-3 text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Confidence Range:</span>
                    <span class="ml-2 font-bold text-blue-600 dark:text-blue-400">
                        ${result.confidenceRange || 'N/A'}
                    </span>
                </div>
            </div>

            <!-- Category Predictions (NEW) -->
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 class="font-bold text-lg mb-4 flex items-center">
                    <span class="text-2xl mr-2">📊</span>
                    Multi-Category Analysis (All Categories with Confidence Range)
                </h4>
                <div class="space-y-3">
                    ${result.categoryPredictions ? 
                        Object.entries(result.categoryPredictions)
                            .sort((a, b) => b[1] - a[1])
                            .map(([category, score]) => {
                                const percentage = (score * 100).toFixed(1);
                                const barWidth = percentage;
                                const isTop = score === Math.max(...Object.values(result.categoryPredictions));
                                
                                return `
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-sm">
                                            <span class="font-medium ${isTop ? 'text-blue-600 dark:text-blue-400 text-base' : ''}">
                                                ${isTop ? '⭐ ' : ''}${category.toUpperCase()}
                                            </span>
                                            <span class="font-semibold ${isTop ? 'text-blue-600 dark:text-blue-400 text-base' : ''}">
                                                ${percentage}%
                                            </span>
                                        </div>
                                        <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                            <div class="bg-gradient-to-r ${isTop ? 'from-blue-500 to-blue-600' : 'from-gray-400 to-gray-500'} h-3 rounded-full transition-all duration-500" 
                                                 style="width: ${barWidth}%">
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')
                        : '<p class="text-gray-500">No category predictions available</p>'
                    }
                </div>
            </div>

            <!-- Main Results Grid -->
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Detected Objects -->
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h4 class="font-bold text-lg mb-4 flex items-center">
                        <span class="text-2xl mr-2">🔍</span>
                        ${result.type === 'video' ? 'Detected Events' : 'Detected Objects'}
                    </h4>
                    <div class="space-y-2">
                        ${result.detectedObjects && result.detectedObjects.length > 0 
                            ? result.detectedObjects.map((obj, idx) => `
                                <div class="flex justify-between items-center bg-white dark:bg-gray-600 p-3 rounded-lg">
                                    <span class="font-medium">${obj}</span>
                                    <span class="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                                        ${result.predictions?.[idx]?.confidence 
                                            ? (result.predictions[idx].confidence * 100).toFixed(1) + '%' 
                                            : 'N/A'}
                                    </span>
                                </div>
                            `).join('') 
                            : result.detectedEvents && result.detectedEvents.length > 0
                            ? result.detectedEvents.map((evt, idx) => `
                                <div class="flex justify-between items-center bg-white dark:bg-gray-600 p-3 rounded-lg">
                                    <span class="font-medium">${evt}</span>
                                    <span class="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                                        ${result.predictions?.[idx]?.confidence 
                                            ? (result.predictions[idx].confidence * 100).toFixed(1) + '%' 
                                            : 'N/A'}
                                    </span>
                                </div>
                            `).join('')
                            : '<p class="text-gray-500">No objects/events detected</p>'}
                    </div>
                </div>

                <!-- Visual Features & Metadata -->
                <div class="space-y-4">
                    <!-- Scene Information -->
                    <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h4 class="font-bold text-lg mb-3 flex items-center">
                            <span class="text-2xl mr-2">🎬</span>
                            Scene Analysis
                        </h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Type:</span>
                                <span class="font-semibold">${result.sceneType || result.type || 'Unknown'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Quality:</span>
                                <span class="font-semibold">${result.qualityScore || 'N/A'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Model:</span>
                                <span class="font-semibold">${result.modelType || 'CNN'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Dominant Colors (for images) -->
                    ${result.dominantColors ? `
                    <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h4 class="font-bold text-lg mb-3 flex items-center">
                            <span class="text-2xl mr-2">🎨</span>
                            Dominant Colors
                        </h4>
                        <div class="flex gap-3">
                            ${formatted.dominantColors && formatted.dominantColors.length > 0
                                ? formatted.dominantColors.map(color => `
                                    <div class="flex-1">
                                        <div class="w-full h-16 rounded-lg shadow-md" style="background: ${color}"></div>
                                        <p class="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">${color}</p>
                                    </div>
                                `).join('') 
                                : '<p class="text-gray-500">Not analyzed</p>'}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Activity Sequence (for videos) -->
                    ${result.activitySequence ? `
                    <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h4 class="font-bold text-lg mb-3 flex items-center">
                            <span class="text-2xl mr-2">⏱️</span>
                            Activity Sequence
                        </h4>
                        <div class="space-y-2">
                            ${result.activitySequence.map((activity, idx) => `
                                <div class="flex items-center bg-white dark:bg-gray-600 p-2 rounded">
                                    <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">${idx + 1}</span>
                                    <span class="font-medium">${activity}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- News Insights -->
            ${result.newsInsights || result.videoInsights ? `
                <div class="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
                    <h4 class="font-bold text-lg mb-4 flex items-center">
                        <span class="text-2xl mr-2">📰</span>
                        ${result.type === 'video' ? 'Video' : 'News'} Insights
                    </h4>
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">Relevance:</span>
                            <span class="ml-2 font-semibold">${result.newsInsights?.relevance || result.videoInsights?.category || 'N/A'}</span>
                        </div>
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">Content Filter:</span>
                            <span class="ml-2 font-semibold">${result.newsInsights?.contentFilter || result.videoInsights?.contentModeration || 'N/A'}</span>
                        </div>
                        ${(result.newsInsights?.urgency || result.videoInsights?.urgency) ? `
                            <div>
                                <span class="text-gray-600 dark:text-gray-400">Urgency:</span>
                                <span class="ml-2 font-semibold uppercase">${result.newsInsights?.urgency || result.videoInsights?.urgency}</span>
                            </div>
                        ` : ''}
                    </div>
                    ${result.newsInsights?.suggestedTags?.length > 0 ? `
                        <div class="mt-4">
                            <span class="text-gray-600 dark:text-gray-400 text-sm">Suggested Tags:</span>
                            <div class="flex flex-wrap gap-2 mt-2">
                                ${result.newsInsights.suggestedTags.map(tag => 
                                    `<span class="bg-blue-200 dark:bg-blue-700 px-3 py-1 rounded-full text-sm">${tag}</span>`
                                ).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            <!-- Metadata Footer -->
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                <div class="flex flex-wrap justify-between gap-4">
                    <div><strong>Model Version:</strong> ${result.modelVersion || 'v1.0'}</div>
                    <div><strong>Processing Time:</strong> ${result.processingTimeMs || 0}ms</div>
                    <div><strong>Analyzed:</strong> ${new Date(result.timestamp).toLocaleString()}</div>
                </div>
                ${result.note ? `
                    <div class="mt-2 text-yellow-600 dark:text-yellow-400">
                        ℹ️ ${result.note}
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}