export const methodList = [
  { value: "Credit", label: "Credit" },
  { value: "Check", label: "Check" },
  { value: "EFT", label: "EFT" },
  { value: "MoneyOrder", label: "Money Order" },
  { value: "Cash", label: "Cash" },
];
export const typeList = [
  { value: "Patient", label: "Patient" },
  { value: "Insurance", label: "Insurance" },
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
export const PhysicianColumns = [
  {
    field: "sortName",
    title: "Physician Name",
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
export const guarantorColumns = [
  {
    field: "sortName",
    title: "Guarantor Name",
    //minWidth: "100px",
  },
];

export const applyPatientPaymentColumns = [
  {
    field: "chargeSID",
    title: "ID",
    minWidth: 50,
    orderIndex: 0,
    hide: true,
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
    field: "procedureDescription",
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
    orderIndex: 4,
    editable:false
  },
  {
    field: "patientPaid",
    title: "patient Paid",
    minWidth: 50,
    orderIndex: 5,
    editor:"numeric",
  },
  {
    field: "adjustments",
    title: "Adjustment",
    minWidth: 50,
    orderIndex: 6,
    editor:"numeric",
  },
  {
    field: "amount",
    title: "Remaining",
    minWidth: 50,
    orderIndex: 7,
    editor:"numeric",
    editable:false
  }
]

export const patientPaymentColumns = [
  {
    field: "payorName",
    title: "Patient",
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
    isCustomCell: true,
    minWidth: 100,
    orderIndex: 3,
  },
  {
    field: "fullyApplied",
    title: "Applied",
    minWidth: 70,
    orderIndex: 4,
  },
  {
    field: "practiceName",
    title: "Location",
    minWidth: 300,
    orderIndex: 5,
  },
  {
    field: "payMethod",
    title: "Payment Method",
    minWidth: 150,
    orderIndex: 6,
  },
  {
    field: "paymentClass",
    title: "Payment Class",
    minWidth: 150,
    orderIndex: 7,
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
export const insuranceColumns = [
  {
    field: "id",
    title: "ID",
    minWidth: 60,
  },
  {
    field: "insurance",
    title: "Plan",
    minWidth: 180,
  },
  {
    field: "depositDate",
    title: "Deposit Date",
    minWidth: 100,
  },
  {
    field: "amount",
    title: "Amount",
    minWidth: 150,
  },
  {
    field: "applied",
    title: "Applied",
    minWidth: 80,
  },
  {
    field: "onHold",
    title: "OnHold",
    minWidth: 70,
  },
  {
    field: "location",
    title: "Location",
    minWidth: 150,
  },
  {
    field: "user",
    title: "User",
    minWidth: 130,
  },
  {
    field: "notes",
    title: "Notes",
  },
];
