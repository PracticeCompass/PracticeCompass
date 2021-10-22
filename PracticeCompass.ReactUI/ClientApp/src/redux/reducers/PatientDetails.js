import { SET_PATIENTS_Details } from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  insurances: [],
};

export function PatientDetailsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PATIENTS_Details:
      return { ...state, insurances: action.payload };
    default:
      return state;
  }
}
