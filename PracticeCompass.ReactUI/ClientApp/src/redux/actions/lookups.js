import axios from "axios";
import {
  FILTERS_PATIENTS,
  FILTERS_INSURANCES,
  FILTERS_GUARANTORS,
  FILTERS_PRACTICE,
  FILTERS_PATIENTTYPE,
  FILTERS_PHYSICIAN,
  FILTERS_CPT,
  FILTERS_ICD10,
  GET_MODIFIER_LIST,
  GET_MODIFIER_LIST_FAILED,
  SET_COMPANIES_LIST,
  GET_PLANS_GROUP_filter,
  GET_LOOKUP_TYPES_Filter,
  GET_LOOKUP_TYPES_Filter_FAILS,
  GET_User_LOOKUP_TYPES_Filter

} from "../actionTypes/actionTypes";
import { uiStopLoading, uiStartLoading } from "./ui";
import config from "../../../src/config";
import { setCompanies } from "./patient";


export const SaveLookups =
  (EntityValueID, EntityName) => async (dispatch, getState) => {
    try {
      //   dispatch(uiStartLoading());
      const userId = getState().account.userId;
      await axios({
        method: "GET",
        url: `${config.baseUrl}/Trends/TrendsSave?EntityName=${EntityName}&UserID=${userId}&EntityValueID=${EntityValueID}`,
      });
      dispatch(GetLookupsByEnityName(EntityName));
    } catch (error) {
    } finally {
      //   dispatch(uiStopLoading());
    }
  };
export const GetLookupsByEnityName =
  (EntityName) => async (dispatch, getState) => {
    try {
      // dispatch(uiStartLoading());
      const userId = getState().account.userId;
      const resp = await axios({
        method: "GET",
        url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=${EntityName}`,
      });
      if (EntityName == "Patient") dispatch(savePatients(resp.data));
      else if (EntityName == "Insurance") dispatch(saveInsurances(resp.data));
      else if (EntityName == "Guarantor") dispatch(saveGuarantors(resp.data));
      else if (EntityName == "Practice") dispatch(savePractices(resp.data));
      else if (EntityName == "PatientType")
        dispatch(savePatientTypes(resp.data));
      else if (EntityName == "Physician") dispatch(savePhysicians(resp.data));
      else if (EntityName == "CPT") dispatch(saveCpts(resp.data));
      else if (EntityName == "ICD10") dispatch(saveICD10(resp.data));
      else if (EntityName == "Company") dispatch(setCompanies(resp.data));
      else if (EntityName == "PlanGroup") dispatch(setPlanGroupList(resp.data));
      else if (EntityName == "lookupTypes") dispatch(setLookupTypesList(resp.data));
      else if (EntityName == "userlookupTypes") dispatch(setUserLookupTypesList(resp.data));
    } catch (error) {
    } finally {
      // dispatch(uiStopLoading());
    }
  };
export const GetModifier = () => async (dispatch, getState) => {
  try {
    // dispatch(uiStartLoading());
    await dispatch(setModifierList([]));
    const resp = await axios({
      method: "GET",
      url: `${config.baseUrl}/ChargeDetails/ModifierGet`,
    });
    await dispatch(setModifierList(resp.data || []));
  } catch (error) {
    console.log("error ==> ", error);
    dispatch({
      type: GET_MODIFIER_LIST_FAILED,
      payload: error,
    });
  } finally {
    // dispatch(uiStopLoading());
  }
};
export const GetLookups = () => async (dispatch, getState) => {
  try {
    // dispatch(uiStartLoading());
    dispatch(GetModifier());
    const userId = getState().account.userId;
    const respPatient = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=Patient`,
    });
    dispatch(savePatients(respPatient.data));
    const respInsurance = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=Insurance`,
    });
    dispatch(saveInsurances(respInsurance.data));
    const respGuarantor = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=Guarantor`,
    });
    dispatch(saveGuarantors(respGuarantor.data));

    const respPractice = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=Practice`,
    });
    dispatch(savePractices(respPractice.data));
    const respPatientType = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=PatientType`,
    });
    dispatch(savePatientTypes(respPatientType.data));
    const respPhysician = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=Physician`,
    });
    dispatch(savePhysicians(respPhysician.data));
    const respCPT = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=CPT`,
    });

    dispatch(saveCpts(respCPT.data));
    const respICD10 = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=ICD10`,
    });
    dispatch(saveICD10(respICD10.data));

    const companies = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=Company`,
    });
    dispatch(setCompanies(companies.data));

    const PlanGroups = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=PlanGroup`,
    });
    dispatch(setPlanGroupList(PlanGroups.data));

    const lookupTypes = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=lookupTypes`,
    });
    dispatch(setLookupTypesList(lookupTypes.data));

    const userlookupTypes = await axios({
      method: "GET",
      url: `${config.baseUrl}/Trends/TrendsGet?UserId=${userId}&EntityName=userlookupTypes`,
    });
    dispatch(setUserLookupTypesList(userlookupTypes.data));

    

    // dispatch(uiStopLoading());
  } catch (error) {
  } finally {
    // dispatch(uiStopLoading());
  }
};
export const isExist = (list = [], item = {}) => {
  return list.find((x) => x.id == item.id) != null;
};
export const savePatients = (patients) => {
  return {
    type: FILTERS_PATIENTS,
    payload: patients,
  };
};
export const saveInsurances = (insurances) => {
  return {
    type: FILTERS_INSURANCES,
    payload: insurances,
  };
};
export const saveGuarantors = (guarantors) => {
  return {
    type: FILTERS_GUARANTORS,
    payload: guarantors,
  };
};
export const savePractices = (practices) => {
  return {
    type: FILTERS_PRACTICE,
    payload: practices,
  };
};
export const savePatientTypes = (patientTypes) => {
  return {
    type: FILTERS_PATIENTTYPE,
    payload: patientTypes,
  };
};
export const savePhysicians = (physicians) => {
  return {
    type: FILTERS_PHYSICIAN,
    payload: physicians,
  };
};

export const saveCpts = (cpts) => {
  return {
    type: FILTERS_CPT,
    payload: cpts,
  };
};
export const saveICD10 = (icd10s) => {
  return {
    type: FILTERS_ICD10,
    payload: icd10s,
  };
};
export const setModifierList = (data) => {
  return {
    type: GET_MODIFIER_LIST,
    payload: data,
  };
};
export const setCompaniesList = (data) => {
  return {
    type: SET_COMPANIES_LIST,
    payload: data,
  };
};
export const setPlanGroupList = (data) => {
  return {
    type: GET_PLANS_GROUP_filter,
    payload: data,
  };
};
export const setLookupTypesList =(data)=>{
  return {
    type: GET_LOOKUP_TYPES_Filter,
    payload: data,
  };
}
export const setUserLookupTypesList =(data)=>{
  return {
    type: GET_User_LOOKUP_TYPES_Filter,
    payload: data,
  };
}
