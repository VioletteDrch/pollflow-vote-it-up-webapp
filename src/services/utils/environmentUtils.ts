
/**
 * Utility functions for environment detection.
 */

/**
 * Detects if the application is running in a local backend environment
 * This will be true when running locally with 'npm run dev' or similar
 */
export const isLocalBackend = (): boolean => {
  // Check if we're running in a local development environment
  const isLocalHost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';
  
  console.log(`Environment detection: isLocalHost=${isLocalHost}`);
  return isLocalHost;
};
