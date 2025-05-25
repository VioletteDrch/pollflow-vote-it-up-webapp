
/**
 * Service for chat functionality.
 * This is a facade that chooses between API and localStorage implementations
 * based on the environment.
 */

import { Message } from "@/types/chat";
import { isLocalBackend } from "@/services/utils/environmentUtils";
import { api_chatRespond, api_generateSummary } from "./implementations/apiService";
import { localStorage_chatRespond, localStorage_generateSummary } from "./implementations/localStorageService";
import { ChatService } from "./interfaces/chatService";

// Determine which implementation to use based on environment
console.log(`🌐 ChatService mode: ${isLocalBackend() ? 'API' : 'Lovable LocalStorage'}`);

/**
 * Chat service implementation that automatically selects the appropriate
 * backend based on the current environment.
 */
const chatService: ChatService = {
  /**
   * Gets an AI response to a user message
   */
  chatRespond: async (question: string, message: string, messages: Message[]): Promise<string> => {
    return isLocalBackend() ? api_chatRespond(question, message, messages) : localStorage_chatRespond(question, message, messages);
  },

  /**
   * Generates a summary of a chat conversation
   */
  generateSummary: async (question: string, messages: Message[]): Promise<string> => {
    return isLocalBackend() ? api_generateSummary(question, messages) : localStorage_generateSummary(question, messages);
  }
};

// Export individual methods for direct use
export const { chatRespond, generateSummary } = chatService;

// Export the whole service as default
export default chatService;
