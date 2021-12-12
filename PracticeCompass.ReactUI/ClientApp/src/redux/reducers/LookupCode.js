import {
  GET_LOOKUPS,
  GET_LOOKUPS_FAILS,
  GET_LOOKUPS_TYPE,
  GET_LOOKUPS_TYPE_FAILS
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  lookups: [],
  lookupsFailed: false,
  lookupTypesFailed:false,
  lookupTypes:[]
};

export function lookupCodesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LOOKUPS:
      return { ...state, lookups: action.payload };
    case GET_LOOKUPS_FAILS:
      return { ...state, lookupsFailed: action.payload };
    case GET_LOOKUPS_TYPE:
      return { ...state, lookupTypes: action.payload };
    case GET_LOOKUPS_TYPE_FAILS:
      return { ...state, lookupTypesFailed: action.payload };
    default:
      return state;
  }
}
