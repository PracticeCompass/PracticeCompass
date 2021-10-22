import {
  FILTERS_PATIENTS,
  FILTERS_INSURANCES,
  FILTERS_GUARANTORS,
  FILTERS_PRACTICE,
  FILTERS_PATIENTTYPE,
  FILTERS_PHYSICIAN,
  FILTERS_CPT,
  FILTERS_ICD10
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  patients: [],
  insurances: [],
  guarantors: [],
  practices:[],
  patientTypes:[],
  physicians:[],
  cpts:[],
  iCD10s:[]
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
      return {...state,iCD10s:action.payload}
    default:
      return state;
  }
}
