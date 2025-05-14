

/**
 * Utility functions used throughout the application.
 * 
 * The cn() function combines Tailwind CSS classes with
 * conditional logic. It uses clsx and tailwind-merge to handle
 * class name conflicts and create clean class strings.
 * 
 * This file is a good place to add other utility functions
 * as the application grows.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
