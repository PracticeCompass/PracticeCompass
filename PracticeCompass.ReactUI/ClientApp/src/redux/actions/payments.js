import axios from "axios";
import {
  GET_PATIENT_PAYMENTS,
  GET_PATIENT_PAYMENTS_FAILED,
  GET_PAYMENT_CLASS,
  GET_PAYMENT_CLASS_FAILED,
  GET_INSURANCE_PAYMENTS,
  GET_INSURANCE_PAYMENTS_FAILED,
  GET_PAYMENT_ASSIGNMENT,
  GET_PAYMENT_ASSIGNMENT_FAILS,
  GET_APPLY_PATIENT_PAYMENTS,
  GET_APPLY_PATIENT_PAYMENTS_FAILS,
  GET_APPLY_PLAN_PAYMENTS,
  GET_APPLY_PLAN_PAYMENTS_FAILS

} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../config";
export const getPatientPayments =
  (PracticeID, PatientID,DateType,Datevalue,Fullyapplied) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      dispatch(setPatientPayments([]));
      // if (PracticeID == null && PatientID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/payment/PatientPaymentGet?PracticeID=${PracticeID}&PatientID=${PatientID}&DateType=${DateType}&Datevalue=${Datevalue}&Fullyapplied=${Fullyapplied}`,
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
  (PracticeID, InsuranceID,DateType,Datevalue,Fullyapplied) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      dispatch(setInsurancePayments([]));
      // if (PracticeID == null && InsuranceID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/payment/InsurancePaymentGet?PracticeID=${PracticeID}&InsuranceID=${InsuranceID}&DateType=${DateType}&Datevalue=${Datevalue}&Fullyapplied=${Fullyapplied}`,
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
export const GetPaymentDetails=(PaymentSID)=>async(dispatch,getState)=>{
  try {
    dispatch(uiStartLoading());
    // if (PracticeID == null && InsuranceID == null) return;
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/payment/PaymentDetailsGet?PaymentSID=${PaymentSID}`,
    });    
    return resp.data;
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_INSURANCE_PAYMENTS_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
}
export const getPaymentAssignments =
  (PaymentSID) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      dispatch(setPaymentAssignments([]));
      // if (PracticeID == null && PatientID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/payment/PaymentAssignmentGet?PaymentSID=${PaymentSID}`,
      });
      dispatch(setPaymentAssignments(resp.data||[]));
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_PAYMENT_ASSIGNMENT_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const savePayment =
(PaymentSID,PracticeID,PostDate,Source,PayorID,Class,Amount,Method,CreditCard,AuthorizationCode,Voucher,CreateMethod,CurrentUser)=>
 async(dispatch,getState)=>{
  try {
    dispatch(uiStartLoading());
    // if (PracticeID == null && PatientID == null) return;
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/payment/PaymentSave?PaymentSID=${PaymentSID}&PracticeID=${PracticeID}&PostDate=${PostDate}&Source=${Source}&PayorID=${PayorID}&Class=${Class}&Amount=${Amount}&Method=${Method}&CreditCard=${CreditCard}&AuthorizationCode=${AuthorizationCode}&Voucher=${Voucher}&CreateMethod=${CreateMethod}&CurrentUser=${CurrentUser}`,
    });
    return resp.data;
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_PAYMENT_ASSIGNMENT_FAILS,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
}

export const getApplyPatientPayments =
  (PatientID) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      dispatch(setApplyPatientPayments([]));
      // if (PracticeID == null && PatientID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/payment/ApplyPatientPaymentGet?PatientID=${PatientID}`,
      });
      dispatch(setApplyPatientPayments(resp.data||[]));
      return resp.data;
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_APPLY_PATIENT_PAYMENTS_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  
  export const getApplyInsurancePayment =
  (GuarantorID,DOSType,DOSvalue,InsuranceID,ClaimIcnNumber) => async (dispatch, getState) => {
    try {
      debugger;
      dispatch(uiStartLoading());
      dispatch(setApplyPlanPayments([]));
      // if (PracticeID == null && PatientID == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/payment/ApplyInsurancePaymentGet?GuarantorID=${GuarantorID}&DOSType=${DOSType}&DOSvalue=${DOSvalue}&InsuranceID=${InsuranceID}&ClaimIcnNumber=${ClaimIcnNumber}`,
      });
      dispatch(setApplyPlanPayments(resp.data||[]));
      return resp.data;
    } catch (error) {
      console.log("error ==> ", error);
      dispatch({
        type: GET_APPLY_PLAN_PAYMENTS_FAILS,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const setApplyPlanPayments = (applyPayments) => {
    return {
      type: GET_APPLY_PLAN_PAYMENTS,
      payload: applyPayments,
    };
  };


  export const setApplyPatientPayments = (applyPatientPayments) => {
    return {
      type: GET_APPLY_PATIENT_PAYMENTS,
      payload: applyPatientPayments,
    };
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

export const setPaymentAssignments = (payments) => {
  return {
    type: GET_PAYMENT_ASSIGNMENT,
    payload: payments,
  };
};


