
/**
 * Types for chat functionality.
 */

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface ChatRequest {
  question: string;
  message: string;
}

export interface ChatResponse {
  response: string;
}

export interface SummaryRequest {
  question: string;
  messages: Message[];
}

export interface SummaryResponse {
  summary: string;
}

export interface AnalysisRequest {
  pollId: string;
  question: string;
  answers: {
    id: string;
    text: string;
    createdAt: string;
  }[];
}

export interface AnalysisResponse {
  analysis: string;
}
