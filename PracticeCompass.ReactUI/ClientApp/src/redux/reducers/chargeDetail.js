import {
  ICD10_DIAGNOSIS,
  ICD10_DIAGNOSIS_FAILED,
  CHARGE_DETAILS_GRID,
  CHARGE_DETAILS_GRID_FAILED,
  CPT_LIST,
  CPT_LIST_FAILED,
  CHARGE_ACTIVITY_GRID,
  CHARGE_ACTIVITY_GRID_FAILED,
  GET_MODIFIER_LIST,
  GET_MODIFIER_LIST_FAILED,
  FILTERS_RENDERING_FAILED,
  FILTERS_REFERRING,
  FILTERS_REFERRING_FAILED,
  FILTERS_SUPERVISING_FAILED,
  FILTERS_SUPERVISING,
  FILTERS_RENDERING
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  icd10List: [],
  icd10List_FAILED: false,
  chargeGridFailed: false,
  chargeGridList: [],
  cptList: [],
  cptList_FAILED: false,
  chargeActivity: [],
  chargeActivityFailed: false,
  modifiers: [],
  modifiersFailed: false,
  rendering: [],
  referring: [],
  supervising: []
};

export function charageDetailsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ICD10_DIAGNOSIS:
      return { ...state, icd10List: action.payload };
    case ICD10_DIAGNOSIS_FAILED:
      return { ...state, icd10List_FAILED: action.payload };
    case CHARGE_DETAILS_GRID:
      return { ...state, chargeGridList: action.payload };
    case CHARGE_DETAILS_GRID_FAILED:
      return { ...state, chargeGridFailed: action.payload };
    case CPT_LIST:
      return { ...state, cptList: action.payload };
    case CPT_LIST_FAILED:
      return { ...state, cptList_FAILED: action.payload };
    case CHARGE_ACTIVITY_GRID:
      return { ...state, chargeActivity: action.payload };
    case CHARGE_ACTIVITY_GRID_FAILED:
      return { ...state, chargeActivityFailed: action.payload };
    case GET_MODIFIER_LIST:
      return { ...state, modifiers: action.payload };
    case GET_MODIFIER_LIST_FAILED:
      return { ...state, modifiersFailed: action.payload };
    case FILTERS_RENDERING:
      return { ...state, rendering: action.payload };
    case FILTERS_REFERRING:
      return { ...state, referring: action.payload };
    case FILTERS_SUPERVISING:
      return { ...state, supervising: action.payload };
    case FILTERS_RENDERING_FAILED:
      return { ...state, renderingFailed: action.payload };
    case FILTERS_REFERRING_FAILED:
      return { ...state, referringFailed: action.payload };
    case FILTERS_SUPERVISING_FAILED:
      return { ...state, supervisingFailed: action.payload };
    default:
      return state;
  }
}
