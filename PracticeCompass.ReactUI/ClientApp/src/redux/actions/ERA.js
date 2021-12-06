import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_FILES,
  GET_FILES_FAILED,
} from "../actionTypes/actionTypes";

export const GetFiles = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ERA/GetFiles`,
    });

   dispatch(setFiles(resp.data)) ;
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_FILES_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const GetFileContent = (path) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ERA/GetFileContent?path=${path}`,
    });
   return resp.data;
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_FILES_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const setFiles = (files) => {
  return {
    type: GET_FILES,
    payload: files,
  };
};

