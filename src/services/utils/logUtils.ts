
/**
 * Utility functions for logging API calls and responses.
 */

/**
 * Logs API calls and responses for debugging purposes
 */
export const logApiCall = (method: string, endpoint: string, data?: any, response?: any) => {
  console.log(`🌐 API ${method} | ${endpoint} |`, 
    data ? `Request: ${JSON.stringify(data)}` : '',
    response ? `Response: ${JSON.stringify(response)}` : '');
};
