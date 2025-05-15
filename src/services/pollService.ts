
/**
 * Service for managing poll data.
 * Currently uses localStorage for data persistence.
 * 
 * BACKEND INTEGRATION POINT:
 * Replace localStorage operations with API calls to your backend.
 * Maintain the same function interfaces (parameters and return types)
 * for seamless integration with the frontend components.
 * 
 * Key functions to replace with API calls:
 * - getPolls() - Fetch all polls from backend
 * - getPollById() - Fetch a specific poll
 * - createPoll() - Create a new poll on backend
 * - votePoll() - Submit a vote to backend
 * - submitPollAnswer() - Submit text answer to backend
 */

import { Poll, PollOption, PollAnswer } from "@/types/poll";

// In a real application, this would connect to a backend API
// For now, we'll use localStorage for persistence

const STORAGE_KEY = "pollflow_polls";

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// API Call Simulation Logger
const logApiCall = (method: string, endpoint: string, data?: any, response?: any) => {
  console.log(`🌐 API ${method} | ${endpoint} |`, 
    data ? `Request: ${JSON.stringify(data)}` : '',
    response ? `Response: ${JSON.stringify(response)}` : '');
};

// Get all polls from storage
export const getPolls = (): Poll[] => {
  console.log("🌐 API CALL: GET /api/polls [Simulated]");
  
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
  
  logApiCall('GET', '/api/polls', null, `Found ${response.length} polls`);
  
  return response;
};

// Get a single poll by ID
export const getPollById = (id: string): Poll | undefined => {
  console.log(`🌐 API CALL: GET /api/polls/${id} [Simulated]`);
  
  const polls = getPolls();
  const poll = polls.find((p) => p.id === id);
  
  logApiCall('GET', `/api/polls/${id}`, null, poll ? 'Poll found' : 'Poll not found');
  
  return poll;
};

// Create a new poll
export const createPoll = (question: string, options: string[], isTextBased: boolean = false): Poll => {
  console.log("🌐 API CALL: POST /api/polls [Simulated]");
  
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

  const polls = getPolls();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...polls, newPoll]));
  
  logApiCall('POST', '/api/polls', null, `Created poll with ID: ${newPoll.id}`);
  
  return newPoll;
};

// Vote on a poll option
export const votePoll = (pollId: string, optionId: string): Poll | undefined => {
  console.log(`🌐 API CALL: PUT /api/polls/${pollId}/vote [Simulated]`);
  
  const requestData = { pollId, optionId };
  logApiCall('PUT', `/api/polls/${pollId}/vote`, requestData, null);
  
  const polls = getPolls();
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  
  if (pollIndex === -1) {
    logApiCall('PUT', `/api/polls/${pollId}/vote`, null, 'Poll not found');
    return undefined;
  }
  
  const poll = polls[pollIndex];
  const optionIndex = poll.options.findIndex((o) => o.id === optionId);
  
  if (optionIndex === -1) {
    logApiCall('PUT', `/api/polls/${pollId}/vote`, null, 'Option not found');
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
  
  logApiCall('PUT', `/api/polls/${pollId}/vote`, null, `Vote recorded for option: ${optionId}`);
  
  return updatedPoll;
};

// Submit a text answer to a poll
export const submitPollAnswer = (pollId: string, text: string): Poll | undefined => {
  console.log(`🌐 API CALL: POST /api/polls/${pollId}/answer [Simulated]`);
  
  const requestData = { pollId, text };
  logApiCall('POST', `/api/polls/${pollId}/answer`, requestData, null);
  
  const polls = getPolls();
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  
  if (pollIndex === -1) {
    logApiCall('POST', `/api/polls/${pollId}/answer`, null, 'Poll not found');
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
  
  logApiCall('POST', `/api/polls/${pollId}/answer`, null, `Answer recorded with ID: ${newAnswer.id}`);
  
  return updatedPoll;
};
