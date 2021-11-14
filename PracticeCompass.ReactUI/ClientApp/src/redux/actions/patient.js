import axios from "axios";
import {
  SET_PATIENT_TYPES,
  SET_PATIENT_FILTER,
  GET_PATIENT_TYPES_FAILED,
  GET_PATIENT_FILTER_FAILED,
  GET_PRACTICE_FAILED,
  SET_PRACTICE,
  SET_PATIENTS,
  GET_PATIENTS_FAILED,
  SET_PATIENT_LIST,
  RESET_PATIENT_LIST_FAILED,
  SET_INSURANCE_LIST,
  GET_INSURANCE_lIST_FAILED,
  RESET_INSURANCE_LIST_FAILED,
  SET_COMPANIES,
  GET_COMPANIES_FAILED
} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../../src/config";
export const getpatientTypes = (filter) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    //await dispatch(setPatientTypes([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/patient/PatientTypesGet?description=${
        filter ?? ""
      }`,
    });
    await dispatch(setPatientTypes(resp.data || []));
  } catch (error) {
    await dispatch(setPatientTypes([]));
    console.log("error ==> ", error);
    dispatch({
      type: GET_PATIENT_TYPES_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const getpatientFilters = (filter) => async (dispatch, getState) => {
  try {
    if (filter !== undefined) {
      dispatch(uiStartLoading());
      //await dispatch(setPatientFilter([]));
      //TO:DO call API
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/Filters/FiltersGet?Entity=patient&DisplayName=${filter}`,
      });
      await dispatch(setPatientFilter(resp.data || []));
    }
  } catch (error) {
    await dispatch(setPatientFilter([]));
    console.log("error ==> ", error);
    dispatch({
      type: GET_PATIENT_FILTER_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const getpatientList =
  (
    fname,
    lname,
    patientAccountNumber,
    patientNumber,
    dobType,
    dob,
    skip,
    refreshData = true
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      let backUpData = [...getState().patients.patientList];
      //await dispatch(setPatientList([]));
      //TO:DO call API
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/patient/PatientsListGet?FirstName=${
          fname === null ? "" : fname
        }&LastName=${lname === null ? "" : lname}&AccountNumber=${
          patientAccountNumber === null ? "" : patientAccountNumber
        }&PersonNumber=${patientNumber === null ? "" : patientNumber}&DOBType=${
          dobType === null ? "" : dobType
        }&DOB=${dob === null ? "" : dob}
        &Skip=${skip}`,
      });
      let copyData = resp.data;
      if (!refreshData) copyData = resp.data.concat(backUpData);
      await dispatch(setPatientList(copyData || []));
    } catch (error) {
      await dispatch(setPatientList([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_PATIENT_FILTER_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const getinsuranceList =
  (name, refreshData = true, skip = 0) =>
  async (dispatch, getState) => {
    try {
        let backUpData = [...getState().patients.insuranceList];
        dispatch(uiStartLoading());
        //await dispatch(setInsuranceList([]));
        //TO:DO call API
        const resp = await axios({
          method: "GET",
          url: `${config.baseUrl}/patient/InsurancesGet?sortName=${
            name === null ? "" : name
          }&skip=${skip}`,
        });
        let copyData = resp.data;
        if (!refreshData) copyData = resp.data.concat(backUpData);
        await dispatch(setInsuranceList(copyData || []));
    } catch (error) {
      await dispatch(setInsuranceList([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_INSURANCE_lIST_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
  export const getCompaniesList = (filter) => async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/PatientDetails/companiesGet?sortName=${filter??""}`,
      });
      await dispatch(setCompanies(resp.data || []));
    } catch (error) {
      await dispatch(setCompanies([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_COMPANIES_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };
export const getPracticeList = (name) => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    //await dispatch(setParactices([]));
    //TO:DO call API
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/patient/PracticesGet?sortName=${name ?? ""}`,
    });
    await dispatch(setParactices(resp.data || []));
  } catch (error) {
    await dispatch(setParactices([]));
    console.log("error ==> ", error);
    dispatch({
      type: GET_PRACTICE_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const resetPracticeList = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setParactices([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_PRACTICE_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const resetPatientTypeList = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setPatientTypes([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_PATIENT_TYPES_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const resetCompanyList = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setCompanies([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_COMPANIES_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const resetPatientList = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setPatientList([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: RESET_PATIENT_LIST_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};
export const resetInsuranceList = () => async (dispatch, getState) => {
  try {
    dispatch(uiStartLoading());
    await dispatch(setInsuranceList([]));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: RESET_INSURANCE_LIST_FAILED,
      payload: error,
    });
  } finally {
    dispatch(uiStopLoading());
  }
};

export const getPatients =
  (searchCriteria, refreshData = true) =>
  async (dispatch, getState) => {
    try {
      dispatch(uiStartLoading());
      var data = getState();
      let backUpData = [...data.patients.patients];
      //await dispatch(setPatients([]));
      if (searchCriteria == null) return;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/patient/PatientsGridGet?PatientID=${
          searchCriteria.PatientID
        }&PracticeID=${searchCriteria.PracticeID}&PatientClass=${
          searchCriteria.PatientClass ? searchCriteria.PatientClass : ""
        }&BalanceType=${searchCriteria.BalanceType}&BalanceValue=${
          searchCriteria.BalanceValue
        }&InsuranceType=${searchCriteria.InsuranceType}&InsurancID=${
          searchCriteria.InsurancID
        }&skip=${searchCriteria.skip}&take=${
          searchCriteria.take
        }&NoBalancePatients=${searchCriteria.NoBalancePatients}&SortColumn=${
          searchCriteria.SortColumn ? searchCriteria.SortColumn : ""
        }&SortDirection=${
          searchCriteria.SortDirection ? searchCriteria.SortDirection : ""
        }`,
      });
      let copyData = resp.data;
      if (!refreshData) copyData = resp.data.concat(backUpData);

      await dispatch(setPatients(copyData || []));
    } catch (error) {
      await dispatch(setPatients([]));
      console.log("error ==> ", error);
      dispatch({
        type: GET_PATIENTS_FAILED,
        payload: error,
      });
    } finally {
      dispatch(uiStopLoading());
    }
  };

export const setPatientTypes = (patientTypes) => {
  return {
    type: SET_PATIENT_TYPES,
    payload: patientTypes,
  };
};
export const setPatientFilter = (patientFilter) => {
  return {
    type: SET_PATIENT_FILTER,
    payload: patientFilter,
  };
};
export const setPatientList = (patientList) => {
  return {
    type: SET_PATIENT_LIST,
    payload: patientList,
  };
};
export const setInsuranceList = (insuranceList) => {
  return {
    type: SET_INSURANCE_LIST,
    payload: insuranceList,
  };
};
export const setParactices = (paractices) => {
  return {
    type: SET_PRACTICE,
    payload: paractices,
  };
};
export const setCompanies = (companies) => {
  return {
    type: SET_COMPANIES,
    payload: companies,
  };
};
export const setPatients = (patients) => {
  return {
    type: SET_PATIENTS,
    payload: patients,
  };
};
