
/**
 * Core API utilities for making requests to the backend.
 */

import { logApiCall } from "../../utils/logUtils";

// Constants
export const API_BASE_URL = "http://localhost:8000"; // Assumes FastAPI is running on port 8000

/**
 * Makes a GET request to the API
 */
export const apiGet = async <T>(endpoint: string, logMessage?: string): Promise<T> => {
  const fullEndpoint = `${API_BASE_URL}${endpoint}`;
  console.log(`🌐 API CALL: GET ${fullEndpoint}`);
  
  try {
    const response = await fetch(fullEndpoint);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    logApiCall('GET', endpoint, null, logMessage || `Success`);
    return data;
  } catch (error) {
    console.error(`Error in GET ${endpoint}:`, error);
    logApiCall('GET', endpoint, null, `Error: ${error}`);
    throw error;
  }
};

/**
 * Makes a POST request to the API
 */
export const apiPost = async <T>(endpoint: string, body: any, logMessage?: string): Promise<T> => {
  const fullEndpoint = `${API_BASE_URL}${endpoint}`;
  console.log(`🌐 API CALL: POST ${fullEndpoint}`);
  
  logApiCall('POST', endpoint, body, null);
  
  try {
    const response = await fetch(fullEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    logApiCall('POST', endpoint, null, logMessage || `Success`);
    return data;
  } catch (error) {
    console.error(`Error in POST ${endpoint}:`, error);
    logApiCall('POST', endpoint, null, `Error: ${error}`);
    throw error;
  }
};

/**
 * Makes a PUT request to the API
 */
export const apiPut = async <T>(endpoint: string, body: any, logMessage?: string): Promise<T> => {
  const fullEndpoint = `${API_BASE_URL}${endpoint}`;
  console.log(`🌐 API CALL: PUT ${fullEndpoint}`);
  
  logApiCall('PUT', endpoint, body, null);
  
  try {
    const response = await fetch(fullEndpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        logApiCall('PUT', endpoint, null, 'Resource not found');
        return null as any;
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    logApiCall('PUT', endpoint, null, logMessage || `Success`);
    return data;
  } catch (error) {
    console.error(`Error in PUT ${endpoint}:`, error);
    logApiCall('PUT', endpoint, null, `Error: ${error}`);
    throw error;
  }
};
