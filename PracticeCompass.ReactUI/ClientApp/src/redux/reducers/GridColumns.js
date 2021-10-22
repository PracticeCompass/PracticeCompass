import {
  GET_GRID_COLUMNS_FAILED,
  SAVE_GRID_COLUMNS_FAILED
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
};

export function  gridColumnsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_GRID_COLUMNS_FAILED:
       return { ...state, gridColumnsFailed: action.payload };
    case SAVE_GRID_COLUMNS_FAILED:
       return { ...state, saveGridColumnsFailed: action.payload };
    default:
      return state;
  }
}
