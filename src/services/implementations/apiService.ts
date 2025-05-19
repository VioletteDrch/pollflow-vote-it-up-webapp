
/**
 * Implementation of poll service using API calls to a backend.
 * This file re-exports functions from the api/ directory.
 */

export {
  api_getPolls,
  api_getPollById,
  api_createPoll,
  api_votePoll,
  api_submitPollAnswer,
  api_analyzeOpinions
} from './api/pollApi';

export {
  api_chatRespond,
  api_generateSummary
} from './api/chatApi';