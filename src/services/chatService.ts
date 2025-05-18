
/**
 * Service for chat functionality.
 * This is a facade that chooses between API and localStorage implementations
 * based on the environment.
 */

import { Message } from "@/types/chat";
import { isLocalBackend } from "@/services/utils/environmentUtils";
import { api_chatRespond, api_generateSummary } from "./implementations/apiService";
import { localStorage_chatRespond, localStorage_generateSummary } from "./implementations/localStorageService";

// Determine which implementation to use based on environment
const isLocal = !isLocalBackend();
console.log(`🌐 ChatService mode: ${isLocal ? 'Lovable LocalStorage' : 'API'}`);

/**
 * Gets an AI response to a user message
 */
export const chatRespond = async (question: string, message: string): Promise<string> => {
  return isLocal
    ? localStorage_chatRespond(message, question)
    : api_chatRespond(question, message);
};

/**
 * Generates a summary of a chat conversation
 */
export const generateSummary = async (question: string, messages: Message[]): Promise<string> => {
  return isLocal
    ? localStorage_generateSummary(question, messages)
    : api_generateSummary(question, messages);
};
