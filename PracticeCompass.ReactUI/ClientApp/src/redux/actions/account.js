import config from "../../../src/config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import { USERID } from "../actionTypes/actionTypes";

export const setUserId = (userId) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    dispatch(setUserAccount(userId));
  } catch (error) {
    console.log("error ==> ", error);
    // dispatch({
    //   type: GET_PATIENT_FILTER_FAILED,
    //   payload: error,
    // });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const setUserAccount = (userId) => {
  return {
    type: USERID,
    payload: userId,
  };
};
