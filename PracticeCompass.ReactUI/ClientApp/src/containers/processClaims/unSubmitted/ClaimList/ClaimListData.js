export const PatientTypesColumns = [
    
    {
        field: "lookupCode",
        title: "Code",
        minWidth: "150px",
        orderIndex:0,
    },
    {
        field: "description",
        title: "Patient Type",
        minWidth: "650px",
        orderIndex:1,
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
    // {
    //     field: "sortName",
    //     title: "Practice Name",
    //     minWidth: "817px",
    // },
];
export const PhysicianColumns = [
    {
        field: "sortName",
        title: "Physician Name",
        minWidth: "817px",
    },
];
export const insuranceColumns = [
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
export const guarantorColumns = [
    {
        field: "sortName",
        title: "Guarantor Name",
        minWidth: "817px",
        //minWidth: "100px",
    },
];
export const columns = [
    {
        field: "dos",
        title: "DOS",
        minWidth: 50,
        orderIndex: 1,
    },
    {
        field: "claimNumber",
        title: "Claim Number",
        minWidth: 100,
        orderIndex: 2,
    },
    {
        field: "patientName",
        title: "Patient",
        minWidth: 100,
        showToolTip: true,
        orderIndex: 3,
    },
    {
        field: "totalClaimAmount",
        title: "Total Amount",
        minWidth: 100,
        type: "currency",
        isCustomCell: true,
        orderIndex: 4,
    },
    {
        field: "outStandingBalanace",
        title: "Outstanding Balance",
        minWidth: 100,
        type: "currency",
        isCustomCell: true,
        orderIndex: 5,
    },
    {
        field: "practiceName",
        title: "Practice",
        minWidth: 200,
        showToolTip: true,
        orderIndex: 6,
    },
    {
        field: "providerName",
        title: "Provider",
        minWidth: 150,
        orderIndex: 7,
    },
    {
        field: "claimPastDue",
        title: "Past Due",
        minWidth: 50,
        orderIndex: 8,
        showToolTip: true,
    },
    {
        field: "primaryStatus",
        title: "Plan 1",
        minWidth: 50,
        orderIndex: 9,
        showToolTip: true,
    },
    {
        field: "seconadryStatus",
        title: "Plan 2",
        minWidth: 50,
        orderIndex: 10,
        showToolTip: true,
    },
    {
        field: "tertiaryStatus",
        title: "Plan 3",
        minWidth: 50,
        orderIndex: 11,
        showToolTip: true,
    },
    {
        field: "destination",
        title: "L.R.C.O",
        minWidth: 70,
        orderIndex: 12,
    },
    {
        field: "notes",
        title: "Notes ",
        iscellWithIcon: true,
        minWidth: 60,
        orderIndex: 13,
        hide:true,
    },
];
export const sortColumns = [
    {
        field: "dos",
        dir: "desc",
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
export const InsuranceStatus = [
    {
        id: "1",
        text: "READY",
    },
    {
        id: "2",
        text: "BILLED",
    },
    {
        id: "3",
        text: "PAID",
    },
    {
        id: "4",
        text: "REBILL",
    },
    {
        id: "4",
        text: "FORWARDED",
    },
    {
        id: "5",
        text: "DENIED",
    },
    {
        id: "6",
        text: "HOLD",
    },
];
export const InsuranceOrder = [
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
export const guarantorSort = [
    {
        field: "sortName",
        dir: "asc",
    },
];
