import {
  GET_PHYSICIANS,
  GET_PHYSICIANS_FAILS
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  physicians: [],
  physiciansFailed: false,
};

export function physiciansReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PHYSICIANS:
      return { ...state, physicians: action.payload };
    case GET_PHYSICIANS_FAILS:
      return { ...state, physiciansFailed: action.payload };
    default:
      return state;
  }
}
