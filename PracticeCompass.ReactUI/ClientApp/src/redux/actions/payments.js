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
    GET_APPLY_PLAN_PAYMENTS_FAILS,
    GET_ERA_PAYMENTS,
    GET_ERA_PAYMENTS_FAILS, POST_ERA_PAYMENTS_FAILS,
    GET_CHARGE_ADJUSTMENT_DETAILS_FAILED
} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../config";
export const getPatientPayments =
    (
        PracticeID,
        PatientID,
        DateType,
        Datevalue,
        totxnDate,
        Fullyapplied,
        amountType,
        amountFilter
    ) =>
        async (dispatch, getState) => {
            try {
                dispatch(uiStartLoading());
                dispatch(setPatientPayments([]));
                // if (PracticeID == null && PatientID == null) return;
                const resp = await axios({
                    method: "GET",
                    url: `${config.baseUrl}/payment/PatientPaymentGet?PracticeID=${PracticeID}&PatientID=${PatientID}&DateType=${DateType}&Datevalue=${Datevalue}&totxnDate=${totxnDate}&Fullyapplied=${Fullyapplied}`,
                });
                dispatch(setPatientPayments(resp.data || []));
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

export const getERAPaymentHeader =
    (
        PracticeID,
        IsPosted,
        Amount,
        CheckNumber,
        AmountType,
        SenderAccount,
        ReceiverAccount,
        PostDate,
        Days
    ) =>
        async (dispatch, getState) => {
            try {
                dispatch(uiStartLoading());
                dispatch(setERAPayments([]));
                // if (PracticeID == null && PatientID == null) return;
                const resp = await axios({
                    method: "GET",
                    url: `${config.baseUrl}/payment/ERAPaymentHeaderGet?PracticeID=${PracticeID}&IsPosted=${IsPosted}&Amount=${Amount}&CheckNumber=${CheckNumber}&AmountType=${AmountType}&SenderAccount=${SenderAccount}&ReceiverAccount=${ReceiverAccount}&PostDate=${PostDate}&Days=${Days}`,
                });
                dispatch(setERAPayments(resp.data || []));
            } catch (error) {
                console.log("error ==> ", error);
                dispatch({
                    type: GET_ERA_PAYMENTS,
                    payload: error,
                });
            } finally {
                dispatch(uiStopLoading());
            }
        };
export const getInsurancePayments =
    (
        PracticeID,
        InsuranceID,
        DateType,
        Datevalue,
        totxnDate,
        Fullyapplied,
        amountType,
        amountFilter
    ) =>
        async (dispatch, getState) => {
            try {
                dispatch(uiStartLoading());
                dispatch(setInsurancePayments([]));
                // if (PracticeID == null && InsuranceID == null) return;
                const resp = await axios({
                    method: "GET",
                    url: `${config.baseUrl}/payment/InsurancePaymentGet?PracticeID=${PracticeID}&InsuranceID=${InsuranceID}&DateType=${DateType}&Datevalue=${Datevalue}&totxnDate=${totxnDate}&Fullyapplied=${Fullyapplied}`,
                });
                dispatch(setInsurancePayments(resp.data || []));
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
export const GetChargeAdjustmentDetails = (chargeSID,claimSID,planId) => async (dispatch, getState) => {
    try {
        const resp = await axios({
            method: "GET",
            url: `${config.baseUrl}/payment/GetChargeAdjustmentDetails?ChargeSID=${chargeSID}&ClaimSID=${claimSID}&PlanId=${planId}`,
        });
        return resp.data || [];
    } catch (error) {
        console.log("error ==> ", error);
        dispatch({
            type: GET_CHARGE_ADJUSTMENT_DETAILS_FAILED,
            payload: error,
        });
    }
};
export const GetERAPaymentDetails =
    (ERSPaymentSID) => async (dispatch, getState) => {
        try {
            dispatch(uiStartLoading());
            // if (PracticeID == null && InsuranceID == null) return;
            const resp = await axios({
                method: "GET",
                url: `${config.baseUrl}/payment/ERAPaymentDetailsGet?ERSPaymentSID=${ERSPaymentSID}`,
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
    };
export const GetPaymentDetails = (PaymentSID) => async (dispatch, getState) => {
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
};
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
            dispatch(setPaymentAssignments(resp.data || []));
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
    (
        PaymentSID,
        PracticeID,
        PostDate,
        Source,
        PayorID,
        Class,
        Amount,
        Method,
        CreditCard,
        AuthorizationCode,
        Voucher,
        CreateMethod,
        CurrentUser
    ) =>
        async (dispatch, getState) => {
            try {
                dispatch(uiStartLoading());
                // if (PracticeID == null && PatientID == null) return;
                const resp = await axios({
                    method: "GET",
                    url: `${config.baseUrl}/payment/PaymentSave?PaymentSID=${PaymentSID}&PracticeID=${PracticeID}&PostDate=${PostDate}&Source=${Source}&PayorID=${PayorID}&Class=${Class === 'null' ? '' : Class}&Amount=${Amount}&Method=${Method}&CreditCard=${CreditCard}&AuthorizationCode=${AuthorizationCode}&Voucher=${Voucher}&CreateMethod=${CreateMethod}&CurrentUser=${CurrentUser}`,
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
        };

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
            dispatch(setApplyPatientPayments(resp.data || []));
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
    (GuarantorID, DOSType, DOSvalue,toTxnApplyDate, InsuranceID, ClaimIcnNumber) =>
        async (dispatch, getState) => {
            try {
                dispatch(uiStartLoading());
                dispatch(setApplyPlanPayments([]));
                // if (PracticeID == null && PatientID == null) return;
                const resp = await axios({
                    method: "GET",
                    url: `${config.baseUrl}/payment/ApplyInsurancePaymentGet?GuarantorID=${GuarantorID}&DOSType=${DOSType}&DOSvalue=${DOSvalue}&ToDOSvalue=${toTxnApplyDate}&InsuranceID=${InsuranceID}&ClaimIcnNumber=${ClaimIcnNumber}`,
                });
                dispatch(setApplyPlanPayments(resp.data || []));
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

export const ApplyPayments = (list) => async (dispatch, getState) => {
    try {
        dispatch(uiStartLoading());
        // if (PracticeID == null && PatientID == null) return;
        let applyPaymentList = list;
        let url = `${config.baseUrl}/payment/ApplyPayment?applyPaymentModel`;
        const resp = await axios.post(url, applyPaymentList);
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
export const PostEraPayment = (checkTraceNbr) => async (dispatch, getState) => {
    try {
        dispatch(uiStartLoading());
        // if (PracticeID == null && PatientID == null) return;
        const resp = await axios({
            method: "GET",
            url: `${config.baseUrl}/payment/ERAPost?CheckTraceNbr=${checkTraceNbr}`,
        });
        return resp.data;
    } catch (error) {
        console.log("Post Era Payment Error ==> ", error);
        dispatch({
            type: POST_ERA_PAYMENTS_FAILS,
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

export const setERAPayments = (ERApayments) => {
    return {
        type: GET_ERA_PAYMENTS,
        payload: ERApayments,
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
