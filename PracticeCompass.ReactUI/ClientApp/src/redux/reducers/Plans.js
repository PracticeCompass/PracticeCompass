import {
  GET_PLANS,
  GET_PLANS_FAILS,
  GET_PLANS_GROUP,
  GET_PLANS_GROUP_FAILS
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  plans: [],
  plansFailed: false,
  planGroupsFailed:false,
  planGroups:[]
};

export function plansReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PLANS:
      return { ...state, plans: action.payload };
    case GET_PLANS_FAILS:
      return { ...state, plansFailed: action.payload };
    case GET_PLANS_GROUP:
      return { ...state, planGroups: action.payload };
    case GET_PLANS_GROUP_FAILS:
      return { ...state, planGroupsFailed: action.payload };
    default:
      return state;
  }
}
