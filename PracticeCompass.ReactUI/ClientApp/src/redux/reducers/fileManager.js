import {
    GET_FILES,
    GET_FILES_FAILED
  } from "../actionTypes/actionTypes";
  
  const INITIAL_STATE = {
  };
  
  export function  fileManagerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_FILES:
         return { ...state, files: action.payload };
      case GET_FILES_FAILED:
         return { ...state, filesFailed: action.payload };
      default:
        return state;
    }
  }
  