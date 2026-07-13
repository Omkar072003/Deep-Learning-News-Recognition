import { handleAnalyze } from './modules/analysis.js';

// === Dark Mode Toggle ===
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
}

// === File Upload + Analysis ===
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const fileInfo = document.getElementById('fileInfo');

// Show file name when selected
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            const fileType = file.type.startsWith('video/') ? 'Video' : 'Image';
            
            if (fileInfo) {
                fileInfo.textContent = `Selected: ${file.name} (${fileSize} MB) - ${fileType}`;
                fileInfo.classList.add('text-green-600', 'font-medium');
            }
            
            showNotification(`✅ Selected: ${file.name}`, 'success');
        }
    });
}

// Analyze button click handler
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
        const file = fileInput?.files[0];
        
        if (!file) {
            showNotification('⚠️ Please select a file first', 'error');
            return;
        }

        // Determine file type
        const fileType = file.type.startsWith('video/') ? 'video' : 'image';

        try {
            // Disable button and show loading
            analyzeBtn.disabled = true;
            const originalText = analyzeBtn.innerHTML;
            analyzeBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <div class="spinner mr-3" style="width: 20px; height: 20px;"></div>
                    Analyzing with AI...
                </div>
            `;
            
            // Show results section with loading
            if (resultsSection) {
                resultsSection.style.display = 'block';
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    resultsContainer.innerHTML = `
                        <div class="text-center py-12">
                            <div class="spinner mb-4"></div>
                            <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
                                Processing with ${fileType === 'video' ? 'RNN/LSTM' : 'CNN'} model...
                            </p>
                            <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
                                This may take a few moments
                            </p>
                        </div>
                    `;
                }
            }

            // Call analysis function
            console.log('🔍 Starting analysis...');
            await handleAnalyze(file, fileType);

            showNotification('✅ Analysis completed successfully!', 'success');

            // Reset button
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = originalText;

        } catch (error) {
            console.error('❌ Analysis error:', error);
            
            showNotification(`❌ Analysis failed: ${error.message}`, 'error');

            // Show error in results if section exists
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer && resultsSection) {
                resultsSection.style.display = 'block';
                resultsContainer.innerHTML = `
                    <div class="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
                        <h3 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">❌ Analysis Failed</h3>
                        <p class="text-red-700 dark:text-red-300 mb-4">${error.message}</p>
                        <p class="text-sm text-red-600 dark:text-red-400 mb-4">
                            Make sure the backend server is running on http://localhost:3000
                        </p>
                        <button onclick="location.reload()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                            Try Again
                        </button>
                    </div>
                `;
            }

            // Reset button
            if (analyzeBtn) {
                analyzeBtn.disabled = false;
                analyzeBtn.innerHTML = '🔍 Analyze Content with AI';
            }
        }
    });
}

// Notification helper
function showNotification(message, type = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    const notification = document.createElement('div');
    notification.className = `notification ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg`;
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize
console.log('🚀 Deep Learning Content Recognition System initialized');
console.log('📡 Backend API:', 'http://localhost:3000/api/v1');

// Test backend connection on page load
fetch('http://localhost:3000/api/v1/health')
    .then(response => response.json())
    .then(data => {
        console.log('✅ Backend connected:', data);
        showNotification('✅ Connected to backend server', 'success');
    })
    .catch(error => {
        console.error('❌ Backend connection failed:', error);
        showNotification('⚠️ Backend server not responding. Start the backend with: npm start', 'warning');
    });