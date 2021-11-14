export const patientColumns = [
  {
    field: "sortName",
    title: "Patient Name",
    minWidth: "300px",
    orderIndex: 1,
  },
  {
    field: "accountNumber",
    title: "Account Nubmer",
    minWidth: "150px",
    orderIndex: 2,
  },
  {
    field: "personNumber",
    title: "Person Number",
    minWidth: "150px",
    orderIndex: 3,
  },
  {
    field: "dob",
    title: "DOB",
    minWidth: "150px",
    orderIndex: 4,
  },
];
export const PracticeColumns = [
  {
    field: "sortName",
    title: "Practice Name",
  },
];
export const PatientTypesColumns = [
  {
    field: "description",
    title: "Patient Type",
  },
];
export const companyNameColumns = [
  {
    field: "sortName",
    title: "Company Name",
  },
];
export const insuranceColumns = [
  {
    field: "entitySID",
    title: "Id",
    hide: true,
    orderIndex: 0,
  },
  {
    field: "sortName",
    title: "Plan Company",
    orderIndex: 1,
  },
];
export const sortColumns = [];
export const columns = [
  {
    field: "personNumber",
    title: "ID",
    minWidth: 50,
    orderIndex: 1,
  },
  {
    field: "dnLastName",
    title: "Last Name",
    minWidth: 100,
    orderIndex: 2,
  },
  {
    field: "dnFirstName",
    title: "First Name",
    minWidth: 100,
    orderIndex: 3,
  },
  {
    field: "practiceName",
    title: "Practice",
    minWidth: 250,
    showToolTip: true,
    orderIndex: 4,
  },
  {
    field: "dob",
    title: "DOB",
    format: "MM/DD/YYYY",
    minWidth: 70,
    orderIndex: 5,
  },
  {
    field: "balance",
    title: "Balance",
    minWidth: 100,
    type: "currency",
    isCustomCell: true,
    orderIndex: 6,
  },
  {
    field: "address",
    title: "Address",
    minWidth: 170,
    showToolTip: true,
    orderIndex: 7,
  },
  {
    field: "city",
    title: "City",
    minWidth: 120,
    showToolTip: true,
    orderIndex: 8,
  },
  {
    field: "state",
    title: "State",
    minWidth: 70,
    orderIndex: 9,
  },
  {
    field: "zip",
    title: "Zip",
    minWidth: 100,
    orderIndex: 10,
  },
  {
    field: "email",
    title: "Email",
    minWidth: 250,
    orderIndex: 11,
  },
  {
    field: "nextAppt",
    title: "Next Appt",
    minWidth: 200,
    orderIndex: 12,
    // minWidth: 170
  },
  {
    field: "patientgridID",
    title: "patientgridID",
    //minWidth: 90,
    hide: true,
  },
];
export const DOBFilter = [
  {
    id: "0",
    text: "Any",
  },
  {
    id: "1",
    text: "Equal",
  },
  {
    id: "2",
    text: "Older than",
  },
  {
    id: "3",
    text: "Newer than",
  },
];
export const BalanceList = [
  {
    id: "1",
    text: "Above",
  },
  {
    id: "2",
    text: "Below",
  },
];
export const PlanCategory = [
  {
    id: "1",
    text: "1",
  },
  {
    id: "2",
    text: "2",
  },
  {
    id: "3",
    text: "3",
  },
];
export const patientFilter = {
  logic: "and",
  filters: [
    {
      field: "sortName",
      operator: "contains",
      value: "",
    },
  ],
};
export const patientSort = [
  {
    field: "sortName",
    dir: "asc",
  },
];
export const insuranceSort = [
  {
    field: "sortName",
    dir: "asc",
  },
];
