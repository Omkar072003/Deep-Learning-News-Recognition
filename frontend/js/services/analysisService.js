// analysisService.js - frontend wrapper to call backend analysis API
import { API_ENDPOINTS } from '../config/api.js';

export async function analyzeContent(file, fileType = 'image') {
    if (!file) {
        throw new Error("File input is required for analyzeContent");
    }

    const formData = new FormData();
    formData.append("file", file);

    // Determine endpoint based on file type
    const endpoint = fileType === 'video' ? API_ENDPOINTS.analyzeVideo : API_ENDPOINTS.analyzeImage;

    console.log('🔍 Analyzing:', file.name, 'Type:', fileType);
    console.log('📡 Endpoint:', endpoint);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            credentials: 'omit', // Don't send credentials
            mode: 'cors' // Enable CORS
        });

        console.log('📥 Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Server error:', errorText);
            
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { error: errorText };
            }
            
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Analysis result:', result);
        return result;

    } catch (error) {
        console.error("❌ Error in analyzeContent service:", error);
        
        // Provide user-friendly error messages
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:3000');
        }
        
        throw error;
    }
}