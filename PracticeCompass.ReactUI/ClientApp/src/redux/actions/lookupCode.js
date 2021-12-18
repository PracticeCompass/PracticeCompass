import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_LOOKUPS,
  GET_LOOKUPS_TYPE,
  GET_LOOKUPS_TYPE_FAILS,
  GET_LOOKUPS_FAILS
} from "../actionTypes/actionTypes";


export const getLookupCodes =
  (searchCriteria) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      if (searchCriteria == null) return;
      const resp = await axios({
        method: "GET",
        url:`${config.baseUrl}/Lookup/LookupCodeGet?LookupType=${searchCriteria.LookupType}&IsActive=${searchCriteria.IsActive}&lookupCode=${searchCriteria.lookupCode}`
      });
      await dispatch(setLookupCodes(resp.data || []));
    } catch (error) {
      await dispatch(setLookupCodes([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_LOOKUPS_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const addLookupCodes =
  (data) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(setLookupCodes([]));
      if (data == null) return;
      const resp = await axios({
        method: "GET",
        url:`${config.baseUrl}/Lookup/AddLookupCode?LookupType=${data.LookupType}&LookupCode=${data.LookupCode}&description=${data.description}&RecordStatus=${data.RecordStatus}&IsAdd=${data.IsAdd}&gridId=${data.gridId}`
      });
      return resp.data;
    } catch (error) {
      await dispatch(setLookupCodes([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_LOOKUPS_FAILS,
        payload: error,
      });
      return false;
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const AddLookupType =
  (data) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      if (data == null) return;
      const resp = await axios({
        method: "GET",
        url:`${config.baseUrl}/Lookup/AddLookupType?lookupType=${data.lookupType}&description=${data.description}&descriptionLabel=${data.descriptionLabel}&Class=${data.Class}&Length=${data.Length}`
      });
      return resp.data;
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_LOOKUPS_FAILS,
        payload: error,
      });
      return false;
    } finally {
      dispatch(uiStopLoading());
    }
  };

  export const getLookupTypes=
  (search) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(setLookupTypes([]));
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/Lookup/LookupTypeGet?search=${search}`,
      });
      await dispatch(setLookupTypes(resp.data || []));
    } catch (error) {
      await dispatch(setLookupTypes([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_LOOKUPS_TYPE_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const resetlookupTypeList = () => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(setLookupTypes([]));
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_LOOKUPS_TYPE_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const setLookupCodes = (lookups) => {
    return {
      type: GET_LOOKUPS,
      payload: lookups,
    };
  };
  export const setLookupTypes = (lookupTypes) => {
    return {
      type: GET_LOOKUPS_TYPE,
      payload: lookupTypes,
    };
  };






