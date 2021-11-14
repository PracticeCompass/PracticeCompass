import {
  SET_PATIENT_TYPES,
  SET_PATIENT_FILTER,
  GET_PATIENT_TYPES_FAILED,
  GET_PATIENT_FILTER_FAILED,
  SET_PRACTICE,
  GET_PRACTICE_FAILED,
  SET_PATIENTS,
  GET_PATIENTS_FAILED,
  SET_PATIENT_LIST,
  GET_PATIENT_lIST_FAILED,
  SET_INSURANCE_LIST,
  GET_INSURANCE_lIST_FAILED,
  SET_COMPANIES,
  GET_COMPANIES_FAILED
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  patientTypes: [],
  patientList: [],
  patientFilter: [],
  patientTypeFailed: false,
  patientFilterFailed: false,
  paractices: [],
  paracticeFailed: false,
  patients: [],
  patientsFailed: false,
  patientListFailed: false,
  insuranceList: [],
  insuranceListFailed: false,
  companies:[],
  companiesFailed:false
};

export function patientsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PATIENTS:
      return { ...state, patients: action.payload };
    case GET_PATIENTS_FAILED:
      return { ...state, patientsFailed: action.payload };
    case SET_PATIENT_TYPES:
      return { ...state, patientTypes: action.payload };
    case GET_PATIENT_TYPES_FAILED:
      return { ...state, patientTypeFailed: action.payload };
    case SET_PATIENT_FILTER:
      return { ...state, patientFilter: action.payload };
    case GET_PATIENT_FILTER_FAILED:
      return { ...state, patientFilterFailed: action.payload };
    case SET_PATIENT_LIST:
      return { ...state, patientList: action.payload };
    case GET_PATIENT_lIST_FAILED:
      return { ...state, patientListFailed: action.payload };
    case SET_PRACTICE:
      return { ...state, paractices: action.payload };
    case GET_PRACTICE_FAILED:
      return { ...state, paracticeFailed: action.payload };
    case SET_INSURANCE_LIST:
      return { ...state, insuranceList: action.payload };
    case GET_INSURANCE_lIST_FAILED:
      return { ...state, insuranceListFailed: action.payload };
    case SET_COMPANIES:
      return { ...state, companies: action.payload };
    case GET_COMPANIES_FAILED:
    return {...state,companiesFailed:action.payload}
    default:
      return state;
  }
}
