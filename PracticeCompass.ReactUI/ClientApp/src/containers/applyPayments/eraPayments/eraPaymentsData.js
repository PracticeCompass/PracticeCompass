export const methodList = [
  { value: "Credit", label: "Credit" },
  { value: "Check", label: "Check" },
  { value: "EFT", label: "EFT" },
  { value: "MoneyOrder", label: "Money Order" },
  { value: "Cash", label: "Cash" },
];
export const typeList = [
  { value: "Patient", label: "Patient" },
  { value: "Plan", label: "Plan" },
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

export const detailsColumns = [
    {
      field: "id",
      title: "ID",
      minWidth: 250,
      orderIndex: 0,
      hide:true
    },
    {
      field: "patient",
      title: "Patient",
      minWidth: 150,
      orderIndex: 1,
    },
    {
      field: "dos",
      title: "DOS",
      minWidth: 100,
      orderIndex: 2,
    },
    {
      field: "cpt",
      title: "CPT",
      minWidth: 100,
      orderIndex: 3,
    },
    {
      field: "asking/amount",
      title: "Asking / Amount",
      minWidth: 100,
      orderIndex: 4,
    },
    {
      field: "adjustment1",
      title: "Adjustment1",
      minWidth: 100,
      orderIndex: 5,
    },
    {
      field: "adjustment2",
      title: "Adjustment2",
      minWidth: 100,
      orderIndex: 6,
    },
    {
      field: "adjustment3",
      title: "Adjustment3",
      minWidth: 100,
      orderIndex: 7,
    },
]
export const masterColumns = [

  {
    field: "practiceName",
    title: "Practice Name",
    minWidth: 250,
    orderIndex: 0,
  },
  {
    field: "checkTraceNbr",
    title: "Check Trace",
    minWidth: 150,
    orderIndex: 1,
  },
  {
    field: "transHandlingCode",
    title: "Trans Handling",
    minWidth: 200,
    orderIndex: 2,
  },
  {
    field: "totalActualProviderPaymentAmt",
    title: "Total Payment",
    minWidth: 170,
    orderIndex: 3,
  },
  {
    field: "paymentMethodCode",
    title: "Payment Method",
    minWidth: 120,
    orderIndex: 4,
  },
  {
    field: "paymentFormatCode",
    title: "Payment Format",
    minWidth: 120,
    orderIndex: 5,
  },
  {
    field: "senderBankAcctNbr",
    title: "Sender Acct",
    minWidth: 150,
    orderIndex: 6,
  },
  {
    field: "receiverAcctNbr",
    title: "Receiver Acct",
    minWidth: 100,
    orderIndex: 8,
  },
  {
    field: "remitPayerIdent",
    title: "Remit Payer Ident",
    minWidth: 150,
    orderIndex: 9,
  },
  {
    field: "checkIssueDate",
    title: "Check Issue",
    minWidth: 100,
    orderIndex: 10,
  },
  {
    field: "payerNameText",
    title: "Payer Name",
    minWidth: 100,
    orderIndex: 11,
  },
  {
    field: "paymentFound",
    title: "Payment Found",
    minWidth: 110,
    orderIndex: 12,
    isCustomCell:true,
    type:"checkBox"
  },
  {
    field: "manualMatch",
    title: "Manual match",
    minWidth: 110,
    orderIndex: 13,
    isCustomCell:true,
    type:"button"
  },
  
  {
    field: "eRSPaymentSID",
    title: "eRSPaymentSID",
    minWidth: 250,
    orderIndex: 0,
    hide:true
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
    text: "Greater than",
  },
  {
    id: "3",
    text: "Less than",
  },
];
