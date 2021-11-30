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
    field: "ersChargeSID",
    title: "ID",
    minWidth: 250,
    orderIndex: 0,
    hide: true,
    editable: false
  },
  {
    field: "ersClaimSID",
    title: "Claim",
    minWidth: 120,
    orderIndex: 0,
    editable: false
  },
  {
    field: "nameFirst",
    title: "Patient",
    minWidth: 150,
    orderIndex: 1,
    editable: false
  },
  {
    field: "serviceDate",
    title: "DOS",
    minWidth: 100,
    orderIndex: 2,
    editable: false
  },
  {
    field: JSON.stringify([{ text: "productServiceID", s: "/" }, { text: "procedureModifier01", s: "," }, { text: "procedureModifier02", s: "," }]),
    title: "CPT/Modifier",
    minWidth: 100,
    orderIndex: 3,
    cell: "merge",
    editable: false
  },
  {
    field: "lineItemChargeAmt" ,
    title: "Asking",
    minWidth: 100,
    orderIndex: 4,
    type: "currency",
    editable: false,
    isEmptyZero:true
  },
  {
    field: "lineItemProviderPaymentAmt" ,
    title: "Paid",
    minWidth: 100,
    orderIndex: 5,
    type: "currency",
    editable: false,
    isEmptyZero:true
  },
  {
    type: "currency",
    field: "chargeClaimAdjustmentAmt",
    title: "Adjustment",
    minWidth: 100,
    orderIndex: 6,
    editable: false,
    // fontColor:"red",
    //fontWeight:"900"

  },
  {
    field: "chargeClaimAdjustmentReason",
    title: "Adjustment Type",
    minWidth: 120,
    orderIndex: 7,
    editable: false,
    showToolTip: true
  },
  //{
  //  type: "currency",
  //  field: "claimAdjustmentAmt",
  //  title: "Claim Adjustment",
  //  minWidth: 120,
  //  orderIndex: 8,
  //  editable: false
  //},
  //{
  //  type: "currency",
  //  field: "providerAdjustmentAmt",
  //  title: "Provider Adjustment",
  //  minWidth: 120,
  //  orderIndex: 9,
  //  editable: false
  //},
  {
    field: "comment",
    title: "Comments",
    minWidth: 300,
    orderIndex: 10,
      editable: false,
      showToolTip: true
  },
  {
    field: "alertCode",
    title: "Recommendation",
    minWidth: 300,
    orderIndex: 11,
    //isCustomCell:true,  
    editor: "edit",
    cell: "dropDown",
    //dropDownList:[{id:"accepted",text:"accepted"},{id:"denied",text:"Denied"},{id:"zeroOrLowPay",text:"Zero Or Low Pay"}]
  },
]
export const masterColumns = [

  {
    field: "practiceName",
    title: "Practice Name",
    minWidth: 300,
    orderIndex: 0,
    showToolTip: true
  },
  {
    field: "totalActualProviderPaymentAmt",
    title: "Total Payment",
    minWidth: 90,
    orderIndex: 1,
    type: "currency"
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
    showToolTip: true
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
    isCustomCell: true,
    type: "checkBox"
  },
  {
    field: "manualMatch",
    title: "Manual Match",
    minWidth: 150,
    orderIndex: 8,
    isCustomCell: true,
    type: "button"
  },
  {
    field: "transHandlingCode",
    title: "Trans Handling",
    minWidth: 200,
    orderIndex: 9,
    showToolTip: true
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
    showToolTip: true
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
    hide: true
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
export const Days = [
  { id: "0", text: "0" },
  { id: "1", text: "1" },
  { id: "2", text: "2" },
  { id: "3", text: "3" },
  { id: "4", text: "4" },
  { id: "5", text: "5" },
  { id: "6", text: "6" },
  { id: "7", text: "7" },
  { id: "8", text: "8" },
  { id: "9", text: "9" },
  { id: "10", text: "10" },
]
