
/**
 * Implementation of poll service using API calls to a backend.
 * This is used in the local development environment.
 */

import { Poll } from "@/types/poll";
import { logApiCall } from "../utils/logUtils";

// Constants
const API_BASE_URL = "http://localhost:8000"; // Assumes FastAPI is running on port 8000

export const api_getPolls = async (): Promise<Poll[]> => {
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

export const api_getPollById = async (id: string): Promise<Poll | undefined> => {
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

export const api_createPoll = async (question: string, options: string[], isTextBased: boolean = false): Promise<Poll> => {
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

export const api_votePoll = async (pollId: string, optionId: string): Promise<Poll | undefined> => {
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

export const api_submitPollAnswer = async (pollId: string, text: string): Promise<Poll | undefined> => {
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
