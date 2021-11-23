import {
  GET_PLANS,
  GET_PLANS_FAILS
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  plans: [],
  plansFailed: false
};

export function plansReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PLANS:
      return { ...state, plans: action.payload };
    case GET_PLANS_FAILS:
      return { ...state, plansFailed: action.payload };
    default:
      return state;
  }
}
