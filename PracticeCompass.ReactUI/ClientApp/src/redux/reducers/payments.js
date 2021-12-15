import { PostEraPayment } from "../actions/payments";
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
    GET_ERA_PAYMENTS_FAILS
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
    patientPayments: [],
    patientPaymentsFailed: false,
    insurancePayemnts: [],
    insurancePayemntsFailed: false,
    paymentClass: [],
    paymentClassFailed: false,
    paymentAssignments: [],
    paymentAssignmentFailed: false,
    applyPatientPayments: [],
    applyPatientPaymentsFailed: false,
    applyPlanPayments: [],
    applyPlanPaymentsFailed: false,
    eRApayments: [],
    eRApaymentFaild: false,
    postEraPaymentFailed: false,
};

export function paymentsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PATIENT_PAYMENTS:
            return { ...state, patientPayments: action.payload };
        case GET_PATIENT_PAYMENTS_FAILED:
            return { ...state, patientPaymentsFailed: action.payload };
        case GET_PAYMENT_CLASS:
            return { ...state, paymentClass: action.payload };
        case GET_PAYMENT_CLASS_FAILED:
            return { ...state, paymentClassFailed: action.payload };
        case GET_INSURANCE_PAYMENTS:
            return { ...state, insurancePayemnts: action.payload };
        case GET_INSURANCE_PAYMENTS_FAILED:
            return { ...state, insurancePayemntsFailed: action.payload };
        case GET_PAYMENT_ASSIGNMENT:
            return { ...state, paymentAssignments: action.payload };
        case GET_PAYMENT_ASSIGNMENT_FAILS:
            return { ...state, payemntAssignmentFailed: action.payload };
        case GET_APPLY_PATIENT_PAYMENTS:
            return { ...state, applyPatientPayments: action.payload };
        case GET_APPLY_PATIENT_PAYMENTS_FAILS:
            return { ...state, applyPatientPaymentsFailed: action.payload };
        case GET_APPLY_PLAN_PAYMENTS:
            return { ...state, applyPlanPayments: action.payload };
        case GET_APPLY_PLAN_PAYMENTS_FAILS:
            return { ...state, applyPlanPaymentsFailed: action.payload };
        case GET_ERA_PAYMENTS:
            return { ...state, eRApayments: action.payload };
        case GET_ERA_PAYMENTS_FAILS:
            return { ...state, eRApaymentFaild: action.payload };
        case POST_ERA_PAYMENTS_FAILS:
            return { ...state, postEraPaymentFailed: action.payload };
        default:
            return state;
    }
}
