
/**
 * Service for chat functionality.
 * This is a facade that chooses between API and localStorage implementations
 * based on the environment.
 */

import { Message } from "@/types/chat";
import { isLocalBackend } from "@/services/utils/environmentUtils";
import { api_chatRespond, api_generateSummary, api_analyzeOpinions } from "./implementations/apiService";
import { localStorage_chatRespond, localStorage_generateSummary, localStorage_analyzeOpinions } from "./implementations/localStorageService";
import { ChatService } from "./interfaces/chatService";

// Determine which implementation to use based on environment
const isLocal = !isLocalBackend();
console.log(`🌐 ChatService mode: ${isLocal ? 'Lovable LocalStorage' : 'API'}`);

/**
 * Chat service implementation that automatically selects the appropriate
 * backend based on the current environment.
 */
const chatService: ChatService = {
  /**
   * Gets an AI response to a user message
   */
  chatRespond: async (question: string, message: string): Promise<string> => {
    return isLocal
      ? localStorage_chatRespond(message, question)
      : api_chatRespond(question, message);
  },

  /**
   * Generates a summary of a chat conversation
   */
  generateSummary: async (question: string, messages: Message[]): Promise<string> => {
    return isLocal
      ? localStorage_generateSummary(question, messages)
      : api_generateSummary(question, messages);
  },

  /**
   * Analyzes opinions from a poll
   */
  analyzeOpinions: async (pollId: string, question: string, answers: any[]): Promise<string> => {
    return isLocal
      ? localStorage_analyzeOpinions(pollId, question, answers)
      : api_analyzeOpinions(pollId, question, answers);
  }
};

// Export individual methods for direct use
export const { chatRespond, generateSummary, analyzeOpinions } = chatService;

// Export the whole service as default
export default chatService;
