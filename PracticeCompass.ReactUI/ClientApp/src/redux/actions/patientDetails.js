import config from "../../../src/config";
import { SET_PATIENTS_Details } from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import axios from "axios";
import {
  GET_PATIENT_FILTER_FAILED,
  GET_PATIENT_LEDGER_FAILED,
} from "../actionTypes/actionTypes";
export const InsuranceGridGet = (personID) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    if (personID == null) return;
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/PatientDetails/InsuranceGridGet?PersonID=${personID}`,
    });
    await dispatch(setInsurance(resp.data || []));
  } catch (error) {
    await dispatch(setInsurance([]));
    console.log("error ==> ", error);
    dispatch({
      type: GET_PATIENT_FILTER_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const inActivePlan=(PlanID,PolicyNumber,CoverageOrder)=>async(dispatch,getState)=>{
  try{
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/PatientDetails/inActiveInsurance?PlanID=${PlanID}&PolicyNumber=${PolicyNumber}&CoverageOrder=${CoverageOrder}`,
    });
   return resp.data;
  }catch(error){

  }finally {
    dispatch(uiStopLoading());
  }
}

export const GuarantorInfoGet = (personID) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    if (personID == null) return;
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/PatientDetails/GuarantorInfoGet?PersonID=${personID}`,
    });
    return resp.data;
  } catch (error) {
    await dispatch(setInsurance([]));
    console.log("error ==> ", error);
    dispatch({
      type: GET_PATIENT_FILTER_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const updateInsuranceDetails=(data)=>async(dispatch,getState)=>{
  try{
    dispatch(uiStartLoading());
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/PatientDetails/InsuranceDetailsUpdate?GridID=${data.gridId}&PatientID=${data.patientId}&PlanID=${data.planId}&PolicyNumber=${data.policyNumber}`,
    });
   return resp.data;
  }catch(error){

  }finally {
    dispatch(uiStopLoading());
  }
}
export const resetInsuranceGridGet = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setInsurance([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_PATIENT_FILTER_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const GetPatientDetails =
  (personID, PracticeID) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      //await dispatch(setInsurance([]));
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/PatientDetails/PatientDetailsGet?PersonID=${personID}&PracticeID=${PracticeID}`,
      });
      return resp.data && resp.data[0] ? resp.data[0] : null;
      // await dispatch(setInsurance(resp.data || []));
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_PATIENT_FILTER_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const GetPatientLedger = (personID) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    //await dispatch(setInsurance([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/PatientDetails/LedgerDataGet?PersonID=${personID}`,
    });
    return resp.data;
    // await dispatch(setInsurance(resp.data || []));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_PATIENT_LEDGER_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const setInsurance = (insurances) => {
  return {
    type: SET_PATIENTS_Details,
    payload: insurances,
  };
};
