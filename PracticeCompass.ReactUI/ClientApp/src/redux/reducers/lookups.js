import {
  FILTERS_PATIENTS,
  FILTERS_INSURANCES,
  FILTERS_GUARANTORS,
  FILTERS_PRACTICE,
  FILTERS_PATIENTTYPE,
  FILTERS_PHYSICIAN,
  FILTERS_CPT,
  FILTERS_ICD10,
  SET_COMPANIES,
  GET_COMPANIES_FAILED,
  GET_PLANS_GROUP_filter,
  GET_PLANS_GROUP_FAILS,
  GET_LOOKUP_TYPES_Filter_FAILS,
  GET_User_LOOKUP_TYPES_Filter,
  GET_LOOKUP_TYPES_Filter
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  patients: [],
  insurances: [],
  guarantors: [],
  practices: [],
  patientTypes: [],
  physicians: [],
  cpts: [],
  iCD10s: [],
  companies: [],
  companiesFailed: false,
  planGroups: [],
  lookupTypes: [],
  userlookupTypes:[]
};

export function lookupsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FILTERS_PATIENTS:
      return { ...state, patients: action.payload };
    case FILTERS_INSURANCES:
      return { ...state, insurances: action.payload };
    case FILTERS_GUARANTORS:
      return { ...state, guarantors: action.payload };
    case FILTERS_PRACTICE:
      return { ...state, practices: action.payload };
    case FILTERS_PATIENTTYPE:
      return { ...state, patientTypes: action.payload };
    case FILTERS_PHYSICIAN:
      return { ...state, physicians: action.payload };
    case FILTERS_CPT:
      return { ...state, cpts: action.payload };
    case FILTERS_ICD10:
      return { ...state, iCD10s: action.payload }
    case SET_COMPANIES:
      return { ...state, companies: action.payload };
    case GET_COMPANIES_FAILED:
      return { ...state, companiesFailed: action.payload }
    case GET_PLANS_GROUP_filter:
      return { ...state, planGroups: action.payload }
    case GET_LOOKUP_TYPES_Filter:
      return { ...state, lookupTypes: action.payload }
    case GET_LOOKUP_TYPES_Filter_FAILS:
      return { ...state, lookupTypesFail: action.payload }
    case GET_User_LOOKUP_TYPES_Filter:
      return { ...state, userlookupTypes: action.payload }
    default:
      return state;
  }
}
