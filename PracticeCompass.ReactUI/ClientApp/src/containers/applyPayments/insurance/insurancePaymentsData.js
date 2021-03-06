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
        field: "practiceCode",
        title: "Code",
        orderIndex:0,
        minWidth: "100px",
    },
    {
        field: "sortName",
        title: "Name",
        orderIndex:1,
        minWidth: "700px",
    },
];
export const insurancePatientColumns = [
    {
        field: "carrierCode",
        title: "Code",
        orderIndex:0,
        minWidth: "100px",
    },
    {
        field: "sortName",
        title: "Company",
        orderIndex:1,
        minWidth: "700px",
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
        title: "Fully Applied",
        minWidth: 100,
        orderIndex: 5,
        type: "checkBox",
        cell: "checkBox",
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
    {
        field: "createMethod",
        title: "Create Method",
        minWidth: 150,
        orderIndex: 9,
        showToolTip: true,
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
        field: "accountNumber",
        title: "Patient Account No",
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
        field: "chargeBalance",
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
        editable: false,
    },
    {
        field: "fromServiceDate",
        title: "DOS",
        editor: "date",
        minWidth: 50,
        orderIndex: 1,
        editable: false,
    },
    {
        field: "procedureCode",
        title: "CPT",
        minWidth: 50,
        orderIndex: 2,
        editable: false,
    },
    {
        field: "modifier1",
        title: "Modifier/ICD",
        minWidth: 50,
        orderIndex: 3,
        editable: false,
    },
    {
        field: "amount",
        title: "Billed Amount",
        minWidth: 50,
        editor: "numeric",
        type: "currency",
        orderIndex: 4,
        editable: false,
    },
    {
        field: "approvedAmount",
        title: "Allowed Amount",
        minWidth: 50,
        editor: "numeric",
        type: "currency",
        orderIndex: 5
    },
    {
        field: "insurancePaid",
        title: "Plan Paid",
        minWidth: 50,
        orderIndex: 6,
        editor: "numeric",
        // cell: "currency",
        type: "currency",
        //type:"currency",
    },
    {
        field: "copayAmount",
        title: "Copay",
        minWidth: 50,
        orderIndex: 7,
        editor: "numeric",
        // cell: "currency",
        type: "currency",
        //type:"currency",
    },
    {
        field: "deductibleApplied",
        title: "Deductible",
        minWidth: 50,
        orderIndex: 8,
        editor: "numeric",
        // cell: "currency",
        type: "currency",
        //type:"currency",
    },
    {
        field: "adjustments",
        title: "Other Adjustment",
        minWidth: 50,
        orderIndex: 9,
        type: "currency",
        editable:false
        //type:"currency",
    },
    {
        field: "chargeBalance",
        title: "Remaining",
        minWidth: 50,
        orderIndex: 10,
        editor: "numeric",
        type: "currency",
        editable: false,
    },
    {
        field: "moveToNextPlan",
        title: "Move to next plan",
        minWidth: 50,
        editor: "boolean",
        isCustomCell: true,
        type: "checkBox",
        orderIndex: 11,
        cell: "checkBox",
    },
];
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
    {
        id: "4",
        text: "Range",
    },
];
export const applyPlanColumns=[
    
    {
        field: "gridId",
        title: "gridId",
        minWidth: 0,
        hide:true,
        orderIndex: 0,
    },
    {
        field: "chargeSid",
        title: "chargeSid",
        minWidth: 0,
        hide:true,
        orderIndex: 0,
    },
    {
        field: "claimSid",
        title: "claimSid",
        minWidth: 0,
        hide:true,
        orderIndex: 0,
    },
    {
        field: "adjustmentAmount",
        title: "Adjustment",
        minWidth: 150,
        editor: "edit",
        orderIndex: 1,
        cell : "currency"
    },
    {
        field: "claimAdjustmentGroupCode",
        title: "Group Code",
        minWidth: 200,
        orderIndex: 2,
        editor: "edit",
        cell: "dropDown",
        Items:"GroupCode"
    },
    {
        field: "adjustmentReasonCode",
        title: "Reason Code",
        minWidth: 200,
        orderIndex: 3,
        editor: "edit",
        cell: "dropDown",
        Items:"ReasonCode"
    },
    // {
    //     field: "remove",
    //     title: "Remove",
    //     minWidth: 50,
    //     orderIndex: 4,
    //     editor: "edit",
    //     cell: "removeButton"
    // },

    // {
    //     field: "description",
    //     title: "Description",
    //     minWidth: 100,
    //     orderIndex: 4,
    // },
]
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
