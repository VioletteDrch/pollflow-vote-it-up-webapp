
/**
 * Implementation of poll service using localStorage for data persistence.
 * This is used in the Lovable environment.
 */

import { Poll, PollOption, PollAnswer } from "@/types/poll";
import { generateId } from "../utils/idUtils";
import { logApiCall } from "../utils/logUtils";

// Constants
const STORAGE_KEY = "pollflow_polls";

export const localStorage_getPolls = (): Poll[] => {
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

export const localStorage_getPollById = (id: string): Poll | undefined => {
  console.log(`🌐 API CALL: GET /api/polls/${id} [SIMULATED]`);
  
  const polls = localStorage_getPolls();
  const poll = polls.find((p) => p.id === id);
  
  logApiCall('GET', `/api/polls/${id}`, null, poll ? 'Poll found [SIMULATED]' : 'Poll not found [SIMULATED]');
  
  return poll;
};

export const localStorage_createPoll = (question: string, options: string[], isTextBased: boolean = false): Poll => {
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

export const localStorage_votePoll = (pollId: string, optionId: string): Poll | undefined => {
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

export const localStorage_submitPollAnswer = (pollId: string, text: string): Poll | undefined => {
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
