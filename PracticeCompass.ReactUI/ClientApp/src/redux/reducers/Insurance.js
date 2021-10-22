import {
    GET_INSURANCE_RECORD_FAILED
  } from "../actionTypes/actionTypes";
  
  const INITIAL_STATE = {

    Insurancefailed: false,
  };
  
  export function insuranceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_INSURANCE_RECORD_FAILED:
        return { ...state, getInsurancefailed: action.payload };
      default:
        return state;
    }
  }
  