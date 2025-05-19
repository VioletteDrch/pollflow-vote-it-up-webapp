
/**
 * API implementation for chat-related operations.
 */

import { ChatRequest, ChatResponse, SummaryRequest, SummaryResponse, AnalysisRequest, AnalysisResponse } from "@/types/chat";
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

/**
 * Analyzes opinions from a poll
 */
export const api_analyzeOpinions = async (pollId: string, question: string, answers: any[]): Promise<string> => {
  const requestData: AnalysisRequest = { 
    pollId,
    question,
    answers: answers.map(answer => ({
      id: answer.id,
      text: answer.text,
      createdAt: answer.createdAt.toISOString()
    }))
  };
  
  const data = await apiPost<AnalysisResponse>('/api/chat/analyze', requestData, 'Analysis generated');
  return data.analysis;
};
