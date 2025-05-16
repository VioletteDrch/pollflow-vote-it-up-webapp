/**
 * Type definitions for the poll-related data structures.
 * These types are used throughout the application to ensure
 * type safety and consistency.
 * 
 * When integrating with a backend, ensure your API responses
 * match these interfaces or adapt the interfaces to match your API.
 */

export type PollOption = {
  id: string;
  text: string;
  votes: number;
};

export type PollAnswer = {
  id: string;
  text: string;
  userId?: string;
  createdAt: Date;
};

export type Poll = {
  id: string;
  question: string;
  options: PollOption[];
  answers: PollAnswer[];
  isTextBased: boolean;
  createdAt: Date;
};
