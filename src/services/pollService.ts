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

// Get all polls from storage
export const getPolls = (): Poll[] => {
  const polls = localStorage.getItem(STORAGE_KEY);
  if (!polls) return [];
  return JSON.parse(polls).map((poll: any) => ({
    ...poll,
    createdAt: new Date(poll.createdAt),
    answers: poll.answers ? poll.answers.map((a: any) => ({
      ...a,
      createdAt: new Date(a.createdAt)
    })) : [],
  }));
};

// Get a single poll by ID
export const getPollById = (id: string): Poll | undefined => {
  const polls = getPolls();
  const poll = polls.find((p) => p.id === id);
  return poll;
};

// Create a new poll
export const createPoll = (question: string, options: string[], isTextBased: boolean = false): Poll => {
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
  return newPoll;
};

// Vote on a poll option
export const votePoll = (pollId: string, optionId: string): Poll | undefined => {
  const polls = getPolls();
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  
  if (pollIndex === -1) return undefined;
  
  const poll = polls[pollIndex];
  const optionIndex = poll.options.findIndex((o) => o.id === optionId);
  
  if (optionIndex === -1) return undefined;
  
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
  
  return updatedPoll;
};

// Submit a text answer to a poll
export const submitPollAnswer = (pollId: string, text: string): Poll | undefined => {
  const polls = getPolls();
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  
  if (pollIndex === -1) return undefined;
  
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
  
  return updatedPoll;
};
