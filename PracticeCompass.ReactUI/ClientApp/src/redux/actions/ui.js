import { UI_START_LOADING, UI_STOP_LOADING,UI_EXPAND } from "../actionTypes/actionTypes";

export const uiStartLoading = () => {
  return {
    type: UI_START_LOADING,
  };
};
export const uiStopLoading = () => {
  return {
    type: UI_STOP_LOADING,
  };
};
export const UiExpand = (value) => {
  return {
    type: UI_EXPAND,
    payload: value,
  };
};
