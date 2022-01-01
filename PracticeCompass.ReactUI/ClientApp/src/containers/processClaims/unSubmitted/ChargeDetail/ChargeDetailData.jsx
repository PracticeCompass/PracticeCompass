export const columns = [
    {
        field: "activityCount",
        title: "Count",
        minWidth: 50,
        orderIndex: 1,
    },
    {
        field: "activityType",
        title: "Type",
        minWidth: 100,
        orderIndex: 2,
    },
    {
        field: "sourceType",
        title: "Source Type",
        minWidth: 100,
        orderIndex: 3,
    },
    {
        field: "sourceName",
        title: "Source",
        minWidth: 150,
        orderIndex: 4,
        showToolTip: true

    },
    {
        field: "procedureCode",
        title: "Procedure Code",
        minWidth: 100,
        orderIndex: 5,
    },
    {
        field: "postDate",
        title: "Post Date",
        minWidth: 70,
        orderIndex: 6,
    },
    {
        field: "amountValue",
        title: "Amount",
        minWidth: 100,
        orderIndex: 7,
        type: "currency",
        isCustomCell: true,
    },
    {
        field: "chargeAmountValue",
        title: "Charge Amount",
        minWidth: 100,
        orderIndex: 8,
        type: "currency",
        isCustomCell: true,
    },
    {
        field: "displayText",
        title: "Notes",
        minWidth: 600,
        orderIndex: 9,
        showToolTip: true,
    },
    {
        field: "gridID",
        title: "ID",
        minWidth: 180,
        orderIndex: 10,
        hide: true,
    },
];
export const CptColumns = [
    {
        field: "procedureCode",
        title: "Code",
        minWidth: 80,
        orderIndex: 1,
    },
    {
        field: "description",
        title: "Description",
        minWidth: 300,
        orderIndex: 2,
    },
];
export const ProviderColumns = [
    {
        field: "providerID",
        title: "ID",
        minWidth: 0,
        orderIndex: 1,
        hide:true

    },
    {
        field: "sortName",
        title: "Sort Name",
        minWidth: 700,
        orderIndex: 2,
    },
];
export const currentStatusLookup = [
    { id: "G", text: "Guarantor responsible charge " },
    { id: "GT", text: "Responsibility manually transferred to guarantor" },
    { id: "GA", text: "Responsibility automatically transferred to guarantor " },
    { id: "I", text: "Insurance responsible charge " },
    { id: "IU", text: "Unbilled insurance responsible charge " },
    { id: "IT", text: "Responsibility manually transferred to insurance " },
    { id: "IF", text: "Responsibility forwarded to insurance" },
];
export const recordStatusLookUp = [
    { id: "O", text: "Open" },
    { id: "S", text: "Satisfied" },
    { id: "V", text: "Voided" },
    { id: "P", text: "Over Paid" },
];
export const ICDcolumns = [
    {
        field: "diagnosisCode",
        title: "Code",
        minWidth: 80,
        orderIndex: 1,
    },
    {
        field: "shortDescription",
        title: "Short Description",
        minWidth: 300,
        orderIndex: 2,
    },
    {
        field: "longDescription",
        title: "Long Description",
        orderIndex: 3,
    },
];
export const medicalProcType = [
    { id: "Chicago", text: "Chicago" },
    { id: "Los Angeles", text: "Los Angeles" },
];
export const modifiers = [
    { id: "LT", text: "LT" },
    { id: "RT", text: "RT" },
    { id: "25", text: "25" },
    { id: "98", text: "98" },
];
// export const status = [
//   { id: "Unbilled", text: "Unbilled" },
//   { id: "Billed", text: "Billed" },
//   { id: "Paid", text: "Paid" },
//   { id: "Error", text: "Error" },
// ];
export const units = [
    { id: "International", text: "International" },
    { id: "Milliliter", text: "Milliliter" },
    { id: "Milligram", text: "Milligram" },
    { id: "Gram", text: "Gram" },
];
