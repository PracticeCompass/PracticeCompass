import {
  GET_PATIENT_PAYMENTS,
  GET_PATIENT_PAYMENTS_FAILED,
  GET_PAYMENT_CLASS,
  GET_PAYMENT_CLASS_FAILED,
  GET_INSURANCE_PAYMENTS,
  GET_INSURANCE_PAYMENTS_FAILED,
  GET_PAYMENT_ASSIGNMENT,
  GET_PAYMENT_ASSIGNMENT_FAILS
} from "../actionTypes/actionTypes";

const INITIAL_STATE = {
  patientPayments: [],
  patientPaymentsFailed: false,
  insurancePayemnts: [],
  insurancePayemntsFailed: false,
  paymentClass: [],
  paymentClassFailed: false,
  paymentAssignments:[],
  paymentAssignmentFailed:false
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
    default:
      return state;
  }
}
