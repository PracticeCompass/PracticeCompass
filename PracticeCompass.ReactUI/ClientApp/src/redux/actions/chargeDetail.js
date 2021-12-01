import config from "../../config";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  ICD10_DIAGNOSIS_FAILED,
  ICD10_DIAGNOSIS,
  CHARGE_DETAILS_GRID_FAILED,
  CHARGE_DETAILS_GRID,
  CPT_LIST_FAILED,
  CPT_LIST,
  CHARGE_ACTIVITY_GRID,

} from "../actionTypes/actionTypes";



export const GetICD10Codes =
  (filter, refreshData = true, skip = 0) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      let backUpData = [...getState().charageDetails.icd10List];
      //await dispatch(setICD10List([]));
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/ChargeDetails/ICD10PopupGet?filter=${
          filter ?? ""
        }&Skip=${skip}`,
      });
      // return resp.data && resp.data.length>0?resp.data[0].shortDescription:'';
      let copyData = resp.data;
        if (!refreshData) copyData = backUpData.concat(resp.data);
      await dispatch(setICD10List(copyData || []));
    } catch (error) {
      await dispatch(setICD10List([]));
      console.log("error ==> ", error);
      dispatch({
        type: ICD10_DIAGNOSIS_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const GetCPTCodes = (filter) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    //await dispatch(setCPTList([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ChargeDetails/CptCodesGet?cptCode=${filter}`,
    });
    await dispatch(setCPTList(resp.data || []));
  } catch (error) {
    await dispatch(setCPTList([]));
    console.log("error ==> ", error);
    dispatch({
      type: CPT_LIST_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const resetCPTCodes = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setCPTList([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: CPT_LIST_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};

export const GetCharageDetails = (chargeSID) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    //await dispatch(setChargeDetailsList([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ChargeDetails/ChargeDetailsGet?ChargeSID=${chargeSID}`,
    });
    //await dispatch(setChargeDetailsList(resp.data || []));
    return resp.data;
  } catch (error) {
    await dispatch(setChargeDetailsList([]));
    console.log("error ==> ", error);
    dispatch({
      type: CHARGE_DETAILS_GRID_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const GetCharageActivity = (chargeSID) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    //await dispatch(setChargeActivityList([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ChargeDetails/ChargeActivityGet?ChargeSID=${chargeSID}`,
    });
    //await dispatch(setChargeActivityList(resp.data || []));
    return resp.data;
  } catch (error) {
    console.log("error ==> ", error);
    await dispatch(setChargeActivityList([]));
    dispatch({
      type: CHARGE_DETAILS_GRID_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const ResetICD10Codes = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setICD10List([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: ICD10_DIAGNOSIS_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const setICD10List = (icd10list) => {
  return {
    type: ICD10_DIAGNOSIS,
    payload: icd10list,
  };
};
export const setCPTList = (cptCodes) => {
  return {
    type: CPT_LIST,
    payload: cptCodes,
  };
};

export const setChargeDetailsList = (data) => {
  return {
    type: CHARGE_DETAILS_GRID,
    payload: data,
  };
};
export const setChargeActivityList = (data) => {
  return {
    type: CHARGE_ACTIVITY_GRID,
    payload: data,
  };
};

