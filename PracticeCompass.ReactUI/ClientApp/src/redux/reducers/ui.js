import { UI_START_LOADING, UI_STOP_LOADING,UI_EXPAND } from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  UiExpand : true
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
    case UI_EXPAND:
      return {
        ...state,
        UiExpand: action.payload ,
      };
    default:
      return state;
  }
}
