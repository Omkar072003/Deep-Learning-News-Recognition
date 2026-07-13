// API Configuration
const API_BASE_URL = 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
    analyzeImage: `${API_BASE_URL}/analyze/image`,
    analyzeVideo: `${API_BASE_URL}/analyze/video`,
    upload: `${API_BASE_URL}/upload`,
    results: `${API_BASE_URL}/results`,
    health: `${API_BASE_URL}/health`
};

export default API_BASE_URL;