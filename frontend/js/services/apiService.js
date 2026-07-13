// apiService.js - basic HTTP client for backend API calls

const API_BASE_URL = "http://localhost:3000/api/v1";

export async function postFormData(endpoint, formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API postFormData error:", error);
    throw error;
  }
}

export async function getJSON(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API getJSON error:", error);
    throw error;
  }
}
