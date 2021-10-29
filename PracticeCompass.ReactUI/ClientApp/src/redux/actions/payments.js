import axios from "axios";
import {
  GET_PATIENT_PAYMENTS,
  GET_PATIENT_PAYMENTS_FAILED,
  GET_PAYMENT_CLASS,
  GET_PAYMENT_CLASS_FAILED,
  GET_INSURANCE_PAYMENTS,
  GET_INSURANCE_PAYMENTS_FAILED,
} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../config";
export const getPatientPayments =
  (PracticeID, PatientID) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      dispatch(setPatientPayments([]));
      // if (PracticeID == null && PatientID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/payment/PatientPaymentGet?PracticeID=${PracticeID}&PatientID=${PatientID}`,
      });
      dispatch(setPatientPayments(resp.data||[]));
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_PATIENT_PAYMENTS_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const getInsurancePayments =
  (PracticeID, InsuranceID) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      dispatch(setInsurancePayments([]));
      // if (PracticeID == null && InsuranceID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/payment/InsurancePaymentGet?PracticeID=${PracticeID}&InsuranceID=${InsuranceID}`,
      });     
      dispatch(setInsurancePayments(resp.data||[]));
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_INSURANCE_PAYMENTS_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const GetPaymentClass = () => async (dispatch, getState) => {
  try {
    await dispatch(setPaymentClass([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/payment/PaymentClassGet`,
    });
    await dispatch(setPaymentClass(resp.data || []));
    // await dispatch(setInsurance(resp.data || []));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_PAYMENT_CLASS_FAILED,
      payload: error,
    });
  }
};
export const setPaymentClass = (paymentClass) => {
  return {
    type: GET_PAYMENT_CLASS,
    payload: paymentClass,
  };
};
export const setPatientPayments = (payments) => {
  return {
    type: GET_PATIENT_PAYMENTS,
    payload: payments,
  };
};

export const setInsurancePayments = (payments) => {
  return {
    type: GET_INSURANCE_PAYMENTS,
    payload: payments,
  };
};

