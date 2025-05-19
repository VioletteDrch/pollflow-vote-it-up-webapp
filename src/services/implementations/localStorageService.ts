
/**
 * Implementation of poll service using localStorage for data persistence.
 * This file re-exports functions from the localStorage/ directory.
 */

export {
  localStorage_getPolls,
  localStorage_getPollById,
  localStorage_createPoll,
  localStorage_votePoll,
  localStorage_submitPollAnswer
} from './localStorage/pollStorage';

export {
  localStorage_chatRespond,
  localStorage_generateSummary,
  localStorage_analyzeOpinions
} from './localStorage/chatStorage';
