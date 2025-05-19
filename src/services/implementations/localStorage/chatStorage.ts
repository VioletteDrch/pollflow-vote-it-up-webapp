/**
 * Implementation of chat service using localStorage for data persistence.
 * This is used in the Lovable environment for chat-related functionality.
 */

import { Message } from "@/types/chat";
import { PollAnswer } from "@/types/poll";
import { logApiCall } from "../../utils/logUtils";
import { getPollById } from "@/services/pollService";

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

export const localStorage_analyzeOpinions = async (pollId: string): Promise<string> => {
  console.log(`🌐 API CALL: POST /api/chat/analyze/${pollId} [SIMULATED]`);
  
  logApiCall('POST', `/api/chat/analyze/${pollId}`, { pollId }, null);
  
  // Fetch the poll to get its data for analysis
  const poll = await getPollById(pollId);
  
  if (!poll || !poll.isTextBased || !poll.answers || poll.answers.length === 0) {
    throw new Error("No text responses to analyze");
  }
  
  const question = poll.question;
  const answers = poll.answers;
  
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
  
  logApiCall('POST', `/api/chat/analyze/${pollId}`, null, `Analysis generated [SIMULATED]`);
  
  return analysis;
};
