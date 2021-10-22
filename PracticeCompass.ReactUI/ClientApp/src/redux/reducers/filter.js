import {
  FILTER_DELETE,
  FILTER_INSERT,
  FILTER_UPDATE,
  FILTER_DELETE_FAILED,
  FILTER_INSERT_FAILED,
  FILTER_UPDATE_FAILED,
  FILTERS_GET_FAILED,
  FILTERS_GET
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  FILTER_DELETE: false,
  FILTER_DELETE_FAILED: false,
  FILTER_INSERT: false,
  FILTER_INSERT_FAILED: false,
  FILTER_UPDATE: false,
  FILTER_UPDATE_FAILED: false,
  FILTERS_GET: [],
  FILTERS_GET_FAILED: []
};

export function filtersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FILTER_DELETE:
      return { ...state, filterDelete: action.payload };
    case FILTER_DELETE_FAILED:
      return { ...state, filterDeleteFailed: action.payload };
    case FILTER_INSERT:
      return { ...state, filterInsert: action.payload };
    case FILTER_INSERT_FAILED:
      return { ...state, filterInsertFailed: action.payload };
    case FILTER_UPDATE:
      return { ...state, filterUpdate: action.payload };
    case FILTER_UPDATE_FAILED:
      return { ...state, filterUpdateFailed: action.payload };
    case FILTERS_GET:
      return { ...state, filters: action.payload };
    case FILTERS_GET_FAILED:
      return { ...state, filtersLoadedFiled: action.payload };
    default:
      return state;
  }
}
