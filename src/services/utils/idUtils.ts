
/**
 * Utility functions for generating IDs.
 */

/**
 * Generates a unique ID for localStorage implementation
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
