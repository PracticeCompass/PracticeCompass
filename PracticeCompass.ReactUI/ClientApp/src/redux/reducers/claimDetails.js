import {
  SET_CHARGES,
  GET_CHARGES_FAILED,
  GET_CLAIM_DETAILS_FAILED,
  CLAIM_NOTE,
  CLAIM_NOTE_FAILED,
  SET_CLAIM_SUBMISSION_HISTORY,
  GET_CLAIM_SUBMISSION_HISTORY_FAILED,
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  charges: [],
  hargesFailed: false,
  submissionHistory: [],
  submissionHistoryFailed: false,
  claimDetailsFailed: false,
  claimDetails: null,
  claimNotes: [],
  claimNotesFailed: false,
};

export function claimDetailsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CHARGES:
      return { ...state, charges: action.payload };
    case GET_CHARGES_FAILED:
      return { ...state, chargesFailed: action.payload };
    case GET_CLAIM_DETAILS_FAILED:
      return { ...state, claimDetailsFailed: action.payload };
    case CLAIM_NOTE:
      return { ...state, claimNotes: action.payload };
    case CLAIM_NOTE_FAILED:
      return { ...state, claimNotesFailed: action.payload };
    case SET_CLAIM_SUBMISSION_HISTORY:
      return { ...state, submissionHistory: action.payload };
    case GET_CLAIM_SUBMISSION_HISTORY_FAILED:
      return { ...state, submissionHistoryFailed: action.payload };
    default:
      return state;
  }
}
