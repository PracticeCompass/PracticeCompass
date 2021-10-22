import { UI_START_LOADING, UI_STOP_LOADING } from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  isLoading: false,
};

export function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
