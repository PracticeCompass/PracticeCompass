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
      hide:true,
      editable:false
    },
    {
      field: "ersClaimSID",
      title: "Claim #",
      minWidth: 120,
      orderIndex: 0,
      editable:false
    },
    {
      field: "nameFirst",
      title: "Patient",
      minWidth: 150,
      orderIndex: 1,
      editable:false
    },
    {
      field: "serviceDate",
      title: "DOS",
      minWidth: 100,
      orderIndex: 2,
      editable:false
    },
    {
      field: "cpt",
      title: "CPT/ICD10",
      minWidth: 100,
      orderIndex: 3,
      editable:false
    },
    {
      field: "ersClaimAdjustmentreason",
      title: "Asking / Amount",
      minWidth: 100,
      orderIndex: 4,
      editable:false
    },
    {
      field: "adjustment1",
      title: "Adjustment1",
      minWidth: 100,
      orderIndex: 5,
      editable:false
    },
    {
      field: "adjustment2",
      title: "Adjustment2",
      minWidth: 100,
      orderIndex: 6,
      editable:false
    },
    {
      field: "adjustment3",
      title: "Adjustment3",
      minWidth: 100,
      orderIndex: 7,
      editable:false
    },
    {
      field: "suggestion",
      title: "Suggestion",
      minWidth: 150,
      orderIndex: 8,
      //isCustomCell:true,  
      // editor:"dropDown",
      dropDownList:[{id:"accepted",text:"accepted"},{id:"denied",text:"Denied"},{id:"zeroOrLowPay",text:"Zero Or Low Pay"}]
    },
]
export const masterColumns = [

  {
    field: "practiceName",
    title: "Practice Name",
    minWidth: 300,
    orderIndex: 0,
    showToolTip:true
  },
  {
    field: "totalActualProviderPaymentAmt",
    title: "Total Payment",
    minWidth: 90,
    orderIndex: 1,
    type:"currency"
  },
  {
    field: "checkTraceNbr",
    title: "Voucher",
    minWidth: 150,
    orderIndex: 2,
  },
  {
    field: "checkIssueDate",
    title: "Check Issue",
    minWidth: 130,
    orderIndex: 3,
  },
  {
    field: "payerNameText",
    title: "Payer Name",
    minWidth: 170,
    orderIndex: 4,
    showToolTip:true
  },
  {
    field: "senderBankAcctNbr",
    title: "Sender Acctount",
    minWidth: 150,
    orderIndex: 5,
  },
  {
    field: "receiverAcctNbr",
    title: "Receiver Acctount",
    minWidth: 150,
    orderIndex: 6,
  },
  {
    field: "paymentFound",
    title: "Payment Found",
    minWidth: 110,
    orderIndex: 7,
    isCustomCell:true,
    type:"checkBox"
  },
  {
    field: "manualMatch",
    title: "Manual Match",
    minWidth: 150,
    orderIndex: 8,
    isCustomCell:true,
    type:"button"
  },
  {
    field: "transHandlingCode",
    title: "Trans Handling",
    minWidth: 200,
    orderIndex: 9,
    showToolTip:true
  },
  {
    field: "paymentMethodCode",
    title: "Payment Method",
    minWidth: 120,
    orderIndex: 10,
  },
  {
    field: "paymentFormatCode",
    title: "Payment Format",
    minWidth: 120,
    orderIndex: 11,
    showToolTip:true
  },

  {
    field: "remitPayerIdent",
    title: "Remit Payer Ident",
    minWidth: 150,
    orderIndex: 12,
  },
  {
    field: "eRSPaymentSID",
    title: "eRSPaymentSID",
    minWidth: 250,
    orderIndex: 13,
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
export const Days=[
  { id: "0", text: "0"},
  { id: "1", text: "1"},
  { id: "2", text: "2"},
  { id: "3", text: "3"},
  { id: "4", text: "4"},
  { id: "5", text: "5"},
  { id: "6", text: "6"},
  { id: "7", text: "7"},
  { id: "8", text: "8"},
  { id: "9", text: "9"},
  { id: "10", text: "10"},
]
