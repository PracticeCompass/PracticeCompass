import {
  SET_GUARANTOR_LIST,
  GET_GUARANTOR_lIST_FAILED,
  SET_CLAIM_FILTER,
  GET_CLAIM_FILTER_FAILED,
  SET_CLAIMS,
  GET_CLAIMS_FAILED,
  SET_CLAIM_DETAILS,
  GET_CLAIM_DETAILS_FAILED,
  SET_PHYSICIAN_LIST,
  SET_PHYSICIAN_LIST_FAILED,
    SUBMIT_CLAIMS_FAILED,
    Parse_ERAMessages_FAILED
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  patientTypes: [],
  patientList: [],
  claimFilter: [],
  patientTypeFailed: false,
  claimFilterFailed: false,
  paractices: [],
  paracticeFailed: false,
  claims: [],
  claimsFailed: false,
  claimDetails: [],
  claimsDetailsFailed: false,
  patientListFailed: false,
  insuranceList: [],
  insuranceListFailed: false,
  guarantorList: [],
  guarantorListFailed: false,
  physicians: [],
  physiciansFailed: false,
  submitClaimsFailed: false,
  ParseERAMessagesFailed: false,
};

export function claimListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CLAIMS:
      return { ...state, claims: action.payload };
    case GET_CLAIMS_FAILED:
      return { ...state, claimsFailed: action.payload };
    case SET_CLAIM_FILTER:
      return { ...state, claimFilter: action.payload };
    case GET_CLAIM_FILTER_FAILED:
      return { ...state, claimFilterFailed: action.payload };
    case SET_GUARANTOR_LIST:
      return { ...state, guarantorList: action.payload };
    case GET_GUARANTOR_lIST_FAILED:
      return { ...state, guarantorListFailed: action.payload };
    case SET_CLAIM_DETAILS:
      return { ...state, claimDetails: action.payload };
    case GET_CLAIM_DETAILS_FAILED:
      return { ...state, claimsDetailsFailed: action.payload };
    case SET_PHYSICIAN_LIST:
      return { ...state, physicians: action.payload };
    case SET_PHYSICIAN_LIST_FAILED:
      return { ...state, physiciansFailed: action.payload };
    case SUBMIT_CLAIMS_FAILED:
          return { ...state, submitClaimsFailed: action.payload };
      case Parse_ERAMessages_FAILED:
          return { ...state, ParseERAMessagesFailed: action.payload };
    default:
      return state;
  }
}
