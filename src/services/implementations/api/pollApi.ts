
/**
 * API implementation for poll-related operations.
 */

import { Poll } from "@/types/poll";
import { AnalysisResponse } from "@/types/analysis";
import { apiGet, apiPost, apiPut } from "./apiUtils";

/**
 * Fetches all polls from the API
 */
export const api_getPolls = async (): Promise<Poll[]> => {
  const data = await apiGet<any[]>('/api/polls', `Found polls`);
  
  return data.map((poll: any) => ({
    ...poll,
    createdAt: new Date(poll.createdAt),
    answers: poll.answers ? poll.answers.map((a: any) => ({
      ...a,
      createdAt: new Date(a.createdAt)
    })) : [],
  }));
};

/**
 * Fetches a specific poll by ID
 */
export const api_getPollById = async (id: string): Promise<Poll | undefined> => {
  try {
    const poll = await apiGet<any>(`/api/polls/${id}`, 'Poll found');
    
    return {
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    };
  } catch (error) {
    if (String(error).includes('404')) {
      return undefined;
    }
    throw error;
  }
};

/**
 * Creates a new poll
 */
export const api_createPoll = async (question: string, options: string[], isTextBased: boolean = false): Promise<Poll> => {
  const requestData = { question, options, isTextBased };
  const poll = await apiPost<any>('/api/polls', requestData, `Created poll`);
  
  return {
    ...poll,
    createdAt: new Date(poll.createdAt),
    answers: poll.answers ? poll.answers.map((a: any) => ({
      ...a,
      createdAt: new Date(a.createdAt)
    })) : [],
  };
};

/**
 * Submits a vote for a poll option
 */
export const api_votePoll = async (pollId: string, optionId: string): Promise<Poll | undefined> => {
  const requestData = { optionId };
  
  try {
    const poll = await apiPut<any>(`/api/polls/${pollId}/vote`, requestData, `Vote recorded for option: ${optionId}`);
    
    if (!poll) return undefined;
    
    return {
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    };
  } catch (error) {
    console.error(`Error voting on poll ${pollId}:`, error);
    throw error;
  }
};

/**
 * Submits a text answer to a poll
 */
export const api_submitPollAnswer = async (pollId: string, text: string): Promise<Poll | undefined> => {
  const requestData = { text };
  
  try {
    const poll = await apiPost<any>(`/api/polls/${pollId}/answer`, requestData, `Answer submitted successfully`);
    
    if (!poll) return undefined;
    
    return {
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    };
  } catch (error) {
    console.error(`Error submitting answer to poll ${pollId}:`, error);
    throw error;
  }
};

/**
 * Analyzes opinions from a poll
 */
export const api_analyzeOpinions = async (pollId: string): Promise<string> => {
  const data = await apiPost<AnalysisResponse>(`/api/polls/${pollId}/analyze`, {}, 'Analysis generated');
  return data.analysis;
};