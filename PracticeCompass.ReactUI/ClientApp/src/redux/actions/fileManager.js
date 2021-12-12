import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_FILES,
  GET_FILES_FAILED,
} from "../actionTypes/actionTypes";

export const GetFiles = (seacrh) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/FileManager/filesGet?fileName=${seacrh.fileName??''}&Notes=${seacrh.notes??''}&isprocessed=${seacrh.Processed}&fileDate=${seacrh.fileDate}`,
    });
   dispatch(setFiles(resp.data)) ;
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
export const GetFileContent = (path) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/FileManager/GetFileContent?path=${path}`,
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
export const AddFileNotes = (fileName,Notes) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/FileManager/AddFileNotes?fileName=${fileName}&notes=${Notes}`,
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
export const ProcessFile = (fileName,isprocessed) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/FileManager/ProcessFile?fileName=${fileName}&isprocessed=${isprocessed}`,
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

