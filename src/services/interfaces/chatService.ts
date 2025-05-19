
/**
 * Interface for chat functionality services.
 * Defines the contract that all chat service implementations must follow.
 */

import { Message } from "@/types/chat";

export interface ChatService {
  /**
   * Gets an AI response to a user message
   */
  chatRespond: (question: string, message: string) => Promise<string>;
  
  /**
   * Generates a summary of a chat conversation
   */
  generateSummary: (question: string, messages: Message[]) => Promise<string>;
}
