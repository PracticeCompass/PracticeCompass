import {
    USERID
  } from "../actionTypes/actionTypes";
  
  const INITIAL_STATE = {
    userId: null,
  };
  
  export function accountsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case USERID:
        return { ...state, userId: action.payload };
      default:
        return state;
    }
  }
  