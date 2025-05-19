
/**
 * Service for managing poll data.
 * Supports two modes:
 * 1. localStorage mode (for Lovable environment)
 * 2. API mode (for integration with local backend)
 * 
 * The service automatically detects the environment.
 */

import { Poll } from "@/types/poll";
import { isLocalBackend } from "./utils/environmentUtils";
import { 
  localStorage_getPolls, 
  localStorage_getPollById, 
  localStorage_createPoll,
  localStorage_votePoll,
  localStorage_submitPollAnswer,
  localStorage_analyzeOpinions
} from "./implementations/localStorageService";
import {
  api_getPolls,
  api_getPollById,
  api_createPoll,
  api_votePoll,
  api_submitPollAnswer,
  api_analyzeOpinions
} from "./implementations/apiService";

// Public API - Dynamically selects implementation based on environment
export { isLocalBackend };

export const getPolls = async (): Promise<Poll[]> => {
  return isLocalBackend() ? api_getPolls() : localStorage_getPolls();
};

export const getPollById = async (id: string): Promise<Poll | undefined> => {
  return isLocalBackend() ? api_getPollById(id) : localStorage_getPollById(id);
};

export const createPoll = async (question: string, options: string[], isTextBased: boolean = false): Promise<Poll> => {
  return isLocalBackend() ? api_createPoll(question, options, isTextBased) : localStorage_createPoll(question, options, isTextBased);
};

export const votePoll = async (pollId: string, optionId: string): Promise<Poll | undefined> => {
  return isLocalBackend() ? api_votePoll(pollId, optionId) : localStorage_votePoll(pollId, optionId);
};

export const submitPollAnswer = async (pollId: string, text: string): Promise<Poll | undefined> => {
  return isLocalBackend() ? api_submitPollAnswer(pollId, text) : localStorage_submitPollAnswer(pollId, text);
};

export const analyzeOpinions = async (pollId: string): Promise<string> => {
  return isLocalBackend() ? api_analyzeOpinions(pollId) : localStorage_analyzeOpinions(pollId);
}

// Log which environment we're using
console.log(`🌐 PollFlow API mode: ${isLocalBackend() ? 'Local Backend API' : 'Lovable LocalStorage'}`);
