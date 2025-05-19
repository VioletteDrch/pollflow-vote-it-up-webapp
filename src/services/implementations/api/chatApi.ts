
/**
 * API implementation for chat-related operations.
 */

import { ChatRequest, ChatResponse, SummaryRequest, SummaryResponse } from "@/types/chat";
import { AnalysisRequest, AnalysisResponse } from "@/types/analysis";
import { apiPost } from "./apiUtils";

/**
 * Gets an AI response to a user message
 */
export const api_chatRespond = async (question: string, message: string): Promise<string> => {
  const requestData: ChatRequest = { question, message };
  const data = await apiPost<ChatResponse>('/api/chat/respond', requestData, 'Response received');
  return data.response;
};

/**
 * Generates a summary of a chat conversation
 */
export const api_generateSummary = async (question: string, messages: any[]): Promise<string> => {
  const requestData: SummaryRequest = { question, messages };
  const data = await apiPost<SummaryResponse>('/api/chat/summary', requestData, 'Summary generated');
  return data.summary;
};
