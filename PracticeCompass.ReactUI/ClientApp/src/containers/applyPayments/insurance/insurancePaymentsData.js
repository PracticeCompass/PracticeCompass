export const methodList = [
  { value: "C", label: "Cash" },
  { value: "K", label: "Check" },
  { value: "R", label: "Charge Card" },
  { value: "E", label: "Electronic Fund Transfer" },
  { value: "O", label: "Other" },
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
    title: "Insurance Company",
    //minWidth: "100px",
  },
];

export const insuranceColumns = [
  {
    field: "insurance",
    title: "Insurance",
    minWidth: 300,
    orderIndex: 1,
  },
  {
    field: "depositDate",
    title: "Deposit Date",
    minWidth: 100,
    orderIndex: 2,
  },
  {
    field: "amount",
    title: "Amount",
    minWidth: 100,
    orderIndex: 3,
  },
  {
    field: "applied",
    title: "Applied",
    minWidth: 70,
    orderIndex: 4,
  },
  {
    field: "onHold",
    title: "OnHold",
    minWidth: 70,
    orderIndex: 5,
  },
  {
    field: "location",
    title: "Location",
    minWidth: 300,
    orderIndex: 6,
  },
  {
    field: "method",
    title: "Payment Method",
    minWidth: 150,
    orderIndex: 7,
  },
  {
    field: "class",
    title: "Payment Class",
    minWidth: 150,
    orderIndex: 8,
  },
  {
    field: "notes",
    title: "Notes",
    minWidth: 300,
    orderIndex: 9,
  },
  {
    field: "id",
    title: "ID",
    minWidth: 50,
    orderIndex: 0,
    hide: true,
  },
];
export const insuranceAssignmentColumns = [
  {
    field: "chargeSID",
    title: "ChargeSID",
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
    field: "patient",
    title: "Patient",
    minWidth: 200,
    orderIndex: 3,
  },
  {
    field: "postDate",
    title: "Post Date",
    minWidth: 100,
    orderIndex: 4,
  },
  {
    field: "amount",
    title: "Amount",
    minWidth: 100,
    orderIndex: 5,
  },
  {
    field: "patientBilled",
    title: "Patient Billed",
    minWidth: 100,
    orderIndex: 6,
  },
  {
    field: "patientStatement",
    title: "Patient Statement",
    minWidth: 150,
    orderIndex: 7,
  },
  {
    field: "createdUser",
    title: "Created User",
    minWidth: 150,
    orderIndex: 8,
  },
  {
    field: "lastUser",
    title: "Last Edited User",
    minWidth: 150,
    orderIndex: 9,
  },
  {
    field: "id",
    title: "ID",
    minWidth: 50,
    orderIndex: 0,
    hide: true,
  },
];
