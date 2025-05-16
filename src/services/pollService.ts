
/**
 * Service for managing poll data.
 * Supports two modes:
 * 1. localStorage mode (for Lovable environment)
 * 2. API mode (for integration with local backend)
 * 
 * The service automatically detects the environment.
 */

import { Poll, PollOption, PollAnswer } from "@/types/poll";

// Constants
const STORAGE_KEY = "pollflow_polls";
const API_BASE_URL = "http://localhost:8000"; // Assumes FastAPI is running on port 8000

// Environment detection - updated to properly check for local environment
export const isLocalBackend = (): boolean => {
  // Check if we're running in a local development environment
  // This will be true when running locally with 'npm run dev' or similar
  const isLocalHost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
  
  console.log(`Environment detection: isLocalHost=${isLocalHost}`);
  return isLocalHost;
};

// Generate a unique ID (for localStorage mode only)
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// API Call Logger
const logApiCall = (method: string, endpoint: string, data?: any, response?: any) => {
  console.log(`🌐 API ${method} | ${endpoint} |`, 
    data ? `Request: ${JSON.stringify(data)}` : '',
    response ? `Response: ${JSON.stringify(response)}` : '');
};

// LocalStorage Implementation
const localStorage_getPolls = (): Poll[] => {
  console.log("🌐 API CALL: GET /api/polls [SIMULATED]");
  
  const polls = localStorage.getItem(STORAGE_KEY);
  const parsedPolls = polls ? JSON.parse(polls) : [];
  
  const response = parsedPolls.map((poll: any) => ({
    ...poll,
    createdAt: new Date(poll.createdAt),
    answers: poll.answers ? poll.answers.map((a: any) => ({
      ...a,
      createdAt: new Date(a.createdAt)
    })) : [],
  }));
  
  logApiCall('GET', '/api/polls', null, `Found ${response.length} polls [SIMULATED]`);
  
  return response;
};

const localStorage_getPollById = (id: string): Poll | undefined => {
  console.log(`🌐 API CALL: GET /api/polls/${id} [SIMULATED]`);
  
  const polls = localStorage_getPolls();
  const poll = polls.find((p) => p.id === id);
  
  logApiCall('GET', `/api/polls/${id}`, null, poll ? 'Poll found [SIMULATED]' : 'Poll not found [SIMULATED]');
  
  return poll;
};

const localStorage_createPoll = (question: string, options: string[], isTextBased: boolean = false): Poll => {
  console.log("🌐 API CALL: POST /api/polls [SIMULATED]");
  
  const requestData = { question, options, isTextBased };
  logApiCall('POST', '/api/polls', requestData, null);
  
  const newPoll: Poll = {
    id: generateId(),
    question,
    options: options.map((text) => ({
      id: generateId(),
      text,
      votes: 0,
    })),
    answers: [],
    isTextBased,
    createdAt: new Date(),
  };

  const polls = localStorage_getPolls();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...polls, newPoll]));
  
  logApiCall('POST', '/api/polls', null, `Created poll with ID: ${newPoll.id} [SIMULATED]`);
  
  return newPoll;
};

const localStorage_votePoll = (pollId: string, optionId: string): Poll | undefined => {
  console.log(`🌐 API CALL: PUT /api/polls/${pollId}/vote [SIMULATED]`);
  
  const requestData = { pollId, optionId };
  logApiCall('PUT', `/api/polls/${pollId}/vote`, requestData, null);
  
  const polls = localStorage_getPolls();
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  
  if (pollIndex === -1) {
    logApiCall('PUT', `/api/polls/${pollId}/vote`, null, 'Poll not found [SIMULATED]');
    return undefined;
  }
  
  const poll = polls[pollIndex];
  const optionIndex = poll.options.findIndex((o) => o.id === optionId);
  
  if (optionIndex === -1) {
    logApiCall('PUT', `/api/polls/${pollId}/vote`, null, 'Option not found [SIMULATED]');
    return undefined;
  }
  
  const updatedOptions = [...poll.options];
  updatedOptions[optionIndex] = {
    ...updatedOptions[optionIndex],
    votes: updatedOptions[optionIndex].votes + 1,
  };
  
  const updatedPoll = {
    ...poll,
    options: updatedOptions,
  };
  
  polls[pollIndex] = updatedPoll;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));
  
  logApiCall('PUT', `/api/polls/${pollId}/vote`, null, `Vote recorded for option: ${optionId} [SIMULATED]`);
  
  return updatedPoll;
};

const localStorage_submitPollAnswer = (pollId: string, text: string): Poll | undefined => {
  console.log(`🌐 API CALL: POST /api/polls/${pollId}/answer [SIMULATED]`);
  
  const requestData = { pollId, text };
  logApiCall('POST', `/api/polls/${pollId}/answer`, requestData, null);
  
  const polls = localStorage_getPolls();
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  
  if (pollIndex === -1) {
    logApiCall('POST', `/api/polls/${pollId}/answer`, null, 'Poll not found [SIMULATED]');
    return undefined;
  }
  
  const poll = polls[pollIndex];
  
  const newAnswer: PollAnswer = {
    id: generateId(),
    text,
    createdAt: new Date(),
  };
  
  const updatedPoll = {
    ...poll,
    answers: [...(poll.answers || []), newAnswer],
  };
  
  polls[pollIndex] = updatedPoll;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));
  
  logApiCall('POST', `/api/polls/${pollId}/answer`, null, `Answer recorded with ID: ${newAnswer.id} [SIMULATED]`);
  
  return updatedPoll;
};

// API Implementation
const api_getPolls = async (): Promise<Poll[]> => {
  const endpoint = `${API_BASE_URL}/api/polls`;
  console.log(`🌐 API CALL: GET ${endpoint}`);
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    const polls = data.map((poll: any) => ({
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    }));
    
    logApiCall('GET', endpoint, null, `Found ${polls.length} polls`);
    return polls;
  } catch (error) {
    console.error('Error fetching polls:', error);
    logApiCall('GET', endpoint, null, `Error: ${error}`);
    // No fallback in local environment
    throw error;
  }
};

const api_getPollById = async (id: string): Promise<Poll | undefined> => {
  const endpoint = `${API_BASE_URL}/api/polls/${id}`;
  console.log(`🌐 API CALL: GET ${endpoint}`);
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      if (response.status === 404) {
        logApiCall('GET', endpoint, null, 'Poll not found');
        throw new Error('Poll not found');
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    const poll = await response.json();
    const processedPoll = {
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    };
    
    logApiCall('GET', endpoint, null, 'Poll found');
    return processedPoll;
  } catch (error) {
    console.error(`Error fetching poll ${id}:`, error);
    logApiCall('GET', endpoint, null, `Error: ${error}`);
    // No fallback in local environment
    throw error;
  }
};

const api_createPoll = async (question: string, options: string[], isTextBased: boolean = false): Promise<Poll> => {
  const endpoint = `${API_BASE_URL}/api/polls`;
  console.log(`🌐 API CALL: POST ${endpoint}`);
  
  const requestData = { question, options, isTextBased };
  logApiCall('POST', endpoint, requestData, null);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const poll = await response.json();
    const processedPoll = {
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    };
    
    logApiCall('POST', endpoint, null, `Created poll with ID: ${processedPoll.id}`);
    return processedPoll;
  } catch (error) {
    console.error('Error creating poll:', error);
    logApiCall('POST', endpoint, null, `Error: ${error}`);
    // No fallback in local environment
    throw error;
  }
};

const api_votePoll = async (pollId: string, optionId: string): Promise<Poll | undefined> => {
  const endpoint = `${API_BASE_URL}/api/polls/${pollId}/vote`;
  console.log(`🌐 API CALL: PUT ${endpoint}`);
  
  const requestData = { optionId };
  logApiCall('PUT', endpoint, requestData, null);
  
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        logApiCall('PUT', endpoint, null, 'Poll or option not found');
        return undefined;
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    const poll = await response.json();
    const processedPoll = {
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    };
    
    logApiCall('PUT', endpoint, null, `Vote recorded for option: ${optionId}`);
    return processedPoll;
  } catch (error) {
    console.error(`Error voting on poll ${pollId}:`, error);
    logApiCall('PUT', endpoint, null, `Error: ${error}`);
    // No fallback in local environment
    throw error;
  }
};

const api_submitPollAnswer = async (pollId: string, text: string): Promise<Poll | undefined> => {
  const endpoint = `${API_BASE_URL}/api/polls/${pollId}/answer`;
  console.log(`🌐 API CALL: POST ${endpoint}`);
  
  const requestData = { text };
  logApiCall('POST', endpoint, requestData, null);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        logApiCall('POST', endpoint, null, 'Poll not found');
        return undefined;
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    const poll = await response.json();
    const processedPoll = {
      ...poll,
      createdAt: new Date(poll.createdAt),
      answers: poll.answers ? poll.answers.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      })) : [],
    };
    
    logApiCall('POST', endpoint, null, `Answer submitted successfully`);
    return processedPoll;
  } catch (error) {
    console.error(`Error submitting answer to poll ${pollId}:`, error);
    logApiCall('POST', endpoint, null, `Error: ${error}`);
    // No fallback in local environment
    throw error;
  }
};

// Public API - Dynamically selects implementation based on environment
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

// Log which environment we're using
console.log(`🌐 PollFlow API mode: ${isLocalBackend() ? 'Local Backend API' : 'Lovable LocalStorage'}`);
