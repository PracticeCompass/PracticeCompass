import {
  GET_PHYSICIANS,
  GET_PHYSICIANS_FAILS,
  GET_POSITION,
  GET_POSITION_FAILS
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  physicians: [],
  physiciansFailed: false,
  positions: [],
  positionsFailed: false
};

export function physiciansReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PHYSICIANS:
      return { ...state, physicians: action.payload };
    case GET_PHYSICIANS_FAILS:
      return { ...state, physiciansFailed: action.payload };
    case GET_POSITION:
      return { ...state, positions: action.payload };
    case GET_POSITION_FAILS:
      return { ...state, positionsFailed: action.payload };
    default:
      return state;
  }
}
