/**
 * Implementation of poll service using localStorage for data persistence.
 * This is used in the Lovable environment.
 */

import { Poll, PollOption, PollAnswer } from "@/types/poll";
import { Message } from "@/types/chat";
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

// Chat localStorage Functions
export const localStorage_chatRespond = async (message: string, question: string): Promise<string> => {
  console.log(`🌐 API CALL: POST /api/chat/respond [SIMULATED]`);
  
  const requestData = { question, message };
  logApiCall('POST', '/api/chat/respond', requestData, null);
  
  // This is a placeholder that would be replaced with actual AI call
  const responses = [
    `That's an interesting perspective on "${question}". Can you elaborate more?`,
    `I understand your point about "${message.substring(0, 20)}...". Have you considered other aspects of this issue?`,
    `Thanks for sharing. Would you like me to provide more information about this topic?`,
    `That's a valid view. Is there anything specific you'd like to know about this question?`
  ];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const response = responses[Math.floor(Math.random() * responses.length)];
  logApiCall('POST', '/api/chat/respond', null, `Response generated [SIMULATED]`);
  
  return response;
};

export const localStorage_generateSummary = async (question: string, messages: Message[]): Promise<string> => {
  console.log(`🌐 API CALL: POST /api/chat/summary [SIMULATED]`);
  
  const requestData = { question, messages };
  logApiCall('POST', '/api/chat/summary', requestData, null);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const userMessages = messages.filter(m => m.sender === "user").map(m => m.content).join(" ");
  const summary = `Based on our conversation about "${question}", your main points appear to be: ${userMessages.substring(0, 100)}... Is this summary accurate?`;
  
  logApiCall('POST', '/api/chat/summary', null, `Summary generated [SIMULATED]`);
  
  return summary;
};

export const localStorage_analyzeOpinions = async (pollId: string, question: string, answers: PollAnswer[]): Promise<string> => {
  console.log(`🌐 API CALL: POST /api/chat/analyze [SIMULATED]`);
  
  const requestData = { pollId, question, answers };
  logApiCall('POST', '/api/chat/analyze', requestData, null);
  
  // Simulate network delay (longer for analysis)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate a simulated analysis based on the answers
  const answerTexts = answers.map(a => a.text).join(" ");
  const wordCount = answerTexts.split(/\s+/).length;
  const sentimentWords = ["positive", "negative", "neutral", "mixed", "enthusiastic", "concerned"];
  const randomSentiment = sentimentWords[Math.floor(Math.random() * sentimentWords.length)];
  
  const analysis = `Analysis of ${answers.length} responses to "${question}":
  
The overall sentiment appears to be ${randomSentiment}. The responses contain approximately ${wordCount} words. 
Common themes include ${Math.random() > 0.5 ? "agreement on core issues" : "diverse perspectives"} with 
${Math.random() > 0.7 ? "strong emotional content" : "factual observations"}.
  
Respondents seem ${Math.random() > 0.5 ? "well-informed" : "somewhat uncertain"} about the topic, with 
${Math.floor(Math.random() * 70) + 30}% providing specific examples or personal experiences.`;
  
  logApiCall('POST', '/api/chat/analyze', null, `Analysis generated [SIMULATED]`);
  
  return analysis;
};
