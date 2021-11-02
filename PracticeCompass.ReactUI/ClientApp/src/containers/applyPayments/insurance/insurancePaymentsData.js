export const methodList = [
  { value: "C", label: "Cash" },
  { value: "K", label: "Check" },
  { value: "R", label: "Charge Card" },
  { value: "E", label: "Electronic Fund Transfer" },
  { value: "O", label: "Other" },
];
export const creditCared = [
  { code: "AE", value: "American Express" },
  { code: "MC", value: "Master Card" },
  { code: "VI", value: "Visa" },
  { code: "DC", value: "Discover" },
  { code: "JC", value: "JCB" },
  { code: "DB", value: "Debit Card" },
  { code: "CC", value: "Care Credit Card" },
  { code: "00", value: "kk" },
];
export const InsuranceCategory = [
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
export const PracticeColumns = [
  {
    field: "sortName",
    title: "Practice Name",
  },
];
export const insurancePatientColumns = [
  {
    field: "sortName",
    title: "Plan Company",
    //minWidth: "100px",
  },
];

export const insuranceColumns = [
  {
    field: "payorName",
    title: "Plan",
    minWidth: 300,
    orderIndex: 1,
  },
  {
    field: "postDate",
    title: "Deposit Date",
    minWidth: 100,
    format: "MM/DD/YYYY",
    orderIndex: 2,
  },
  {
    field: "amount",
    title: "Amount",
    type: "currency",
    minWidth: 100,
    orderIndex: 3,
  },
  {
    field: "remaining",
    title: "Remaining",
    type: "currency",
    minWidth: 100,
    orderIndex: 4,
  },
  {
    field: "fullyApplied",
    title: "Applied",
    minWidth: 70,
    orderIndex: 5,
  },
  {
    field: "practiceName",
    title: "Location",
    minWidth: 300,
    orderIndex: 6,
  },
  {
    field: "payMethod",
    title: "Payment Method",
    minWidth: 150,
    orderIndex: 7,
  },
  {
    field: "paymentClass",
    title: "Payment Class",
    minWidth: 150,
    orderIndex: 8,
  },
  // {
  //   field: "notes",
  //   title: "Notes",
  //   minWidth: 300,
  //   orderIndex: 8,
  // },
  {
    field: "paymentSID",
    title: "ID",
    minWidth: 50,
    orderIndex: 0,
    hide: true,
  },
];
export const insuranceAssignmentColumns = [
  {
    field: "chargeSID",
    title: "Charge ID",
    minWidth: 100,
    orderIndex: 1,
  },
  {
    field: "accountSID",
    title: "Patient Account ID",
    minWidth: 150,
    orderIndex: 2,
  },
  {
    field: "sortName",
    title: "Patient",
    minWidth: 200,
    orderIndex: 3,
  },
  {
    field: "postDate",
    title: "Post Date",
    format: "MM/DD/YYYY",
    minWidth: 100,
    orderIndex: 4,
  },
  {
    field: "amount",
    title: "Amount",
    type: "currency",
    minWidth: 100,
    orderIndex: 5,
  },
  {
    field: "remaining",
    title: "Remaining",
    type: "currency",
    minWidth: 100,
    orderIndex: 6,
  },
  {
    field: "patientBilled",
    title: "Patient Billed",
    minWidth: 100,
    orderIndex: 7,
  },
  {
    field: "patientStatement",
    title: "Patient Statement",
    minWidth: 150,
    orderIndex: 8,
  },
  {
    field: "id",
    title: "ID",
    minWidth: 50,
    orderIndex: 0,
    hide: true,
  },
];
export const guarantorColumns = [
  {
    field: "sortName",
    title: "Guarantor Name",
    //minWidth: "100px",
  },
];
export const applyPlanPaymentColumns = [
  {
    field: "chargeSID",
    title: "ID",
    minWidth: 50,
    orderIndex: 0,
    hide: true,
    editable:false
  },
  {
    field: "fromServiceDate",
    title: "Dos",
    editor:"date",
    minWidth: 50,
    orderIndex: 1,
    editable:false
  },
  {
    field: "procedureCode",
    title: "Cpt",
    minWidth: 50,
    orderIndex: 2,
    editable:false
  },
  {
    field: "modifier1",
    title: "Modifier/ICD",
    minWidth: 50,
    orderIndex: 3,
    editable:false
  },
  {
    field: "chargeBalance",
    title: "Balanace",
    minWidth: 50,
    editor:"numeric",
    type:"currency",
    orderIndex: 4,
    editable:false
  },
  {
    field: "insurancePaid",
    title: "Plan Paid",
    minWidth: 50,
    orderIndex: 5,
    editor:"numeric",
    //type:"currency",
  },
  {
    field: "adjustments",
    title: "Adjustment",
    minWidth: 50,
    orderIndex: 6,
    editor:"numeric",
    //type:"currency",
  },
  {
    field: "amount",
    title: "Remaining",
    minWidth: 50,
    orderIndex: 7,
    editor:"numeric",
    type:"currency",
    editable:false
  },
  {
    field: "MoveToNextPlan",
    title: "Move to next plan",
    minWidth: 50,
    editor:"boolean",
    orderIndex: 8,
    isCustomCell:true,
    type:"checkBox"
  },
]
export const DOSFilter = [
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
export const AmountFilter = [
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
    text: "greater than",
  },
  {
    id: "3",
    text: "less than",
  },
];
