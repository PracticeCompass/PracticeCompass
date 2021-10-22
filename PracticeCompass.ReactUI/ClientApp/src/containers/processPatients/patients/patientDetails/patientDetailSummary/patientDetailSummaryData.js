import config from "../../../../../config";
export const getParacticesUrl = (filter) => {
  return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
};
export const getMaritalStatus = (filter) => {
  return `${config.baseUrl}/PatientDetails/MaritalStatusGet?description=${filter}`;
};
export const getGenderUrl = (filter) => {
  return `${config.baseUrl}/PatientDetails/GenderGet?description=${filter}`;
};
export const getRelationUrl = (filter) => {
  return `${config.baseUrl}/PatientDetails/RelationGet?description=${filter}`;
};
export const getPatientTypeUrl = (filter) => {
  return `${config.baseUrl}/PatientDetails/PatientTypesGet?description=${filter}`;
};
export const getCompanyNameUrl = (filter) => {
  return `${config.baseUrl}/PatientDetails/companiesGet?sortName=${filter}`;
};
export const getCompanyTypeUrl = (filter) => {
  return `${config.baseUrl}/PatientDetails/InsuranceTypesGet?description=${filter}`;
};
export const getPlanTypeUrl = (filter) => {
  return `${config.baseUrl}/PatientDetails/PlanTypesGet?description=${filter}`;
};
export const countryStateGetUrl = (filter) => {
  return `${config.baseUrl}/PatientDetails/CountryStateGet?stateName=${filter}`;
};
export const stateList = [
  { id: 1, text: "AL" },
  { id: "AR", text: "AR" },
  { id: "IL", text: "IL" },
  { id: "NY", text: "NY" },
  { id: "NJ", text: "NJ" },
];
export const Insured = [
  { id: "Self", label: "Self", value: "Self" },
  { id: "Other", label: "Other", value: "Other" },
];

export const columns = [
  {
    field: "disable",
    title: "Disable",
    minWidth: 50,
    isCustomCell: true,
    type: "checkBox",
    orderIndex: 1,
  },
  {
    field: "planID",
    title: "ID",
    minWidth: 50,
    orderIndex: 2,
  },
  {
    field: "coverageOrder",
    title: "Order",
    minWidth: 50,
    orderIndex: 3,
  },
  {
    field: "planName",
    title: "Insurance Company",
    minWidth: 180,
    showToolTip: true,
    orderIndex: 4,
  },
  {
    field: "insuranceTypeName",
    title: "Type",
    minWidth: 140,
    orderIndex: 5,
  },
  {
    field: "insured",
    title: "Insured",
    minWidth: 70,
    orderIndex: 6,
  },
  {
    field: "planName",
    title: "Plan Name",
    minWidth: 125,
    orderIndex: 7,
  },
  {
    field: "policyNumber",
    title: "Policy Num",
    minWidth: 70,
    orderIndex: 8,
  },
  {
    field: "planTypeName",
    title: "Plan Type",
    minWidth: 100,
    orderIndex: 9,
  },
  {
    field: "groupNumber",
    title: "Group Num",
    minWidth: 100,
    orderIndex: 10,
  },
  {
    field: "startDate",
    title: "Eff Date",
    format: "MM/DD/YYYY",
    minWidth: 70,
    orderIndex: 11,
  },
  {
    field: "endDate",
    title: "Exp Date",
    format: "MM/DD/YYYY",
    minWidth: 70,
    orderIndex: 12,
    //minWidth: 120,
  },
];
