export const lookupTypeColumns=[

    {
        field: "lookupType",
        title: "Lookup Type",
        orderIndex: 1,
    },
    {
        field: "description",
        title: "Description",
        orderIndex: 2,
    }
]
export const lookupColumns = [
    {
        field: "gridId",
        title: "ID",
        hide:true,
        orderIndex: 1,
    },
    {
        field: "lookupType",
        title: "Lookup Type",
        orderIndex: 2,
        minWidth: 200
    },
    {
        field: "lookupCode",
        title: "Lookup Code",
        orderIndex: 3,
        minWidth: 200
    },
    {
        field: "description",
        title: "Description",
        orderIndex: 4,
        minWidth: 200
    },
    {
        field: "recordStatus",
        title: "Active",
        orderIndex: 5,
        type: "checkBox",
        cell: "checkBox",
        minWidth: 5
    }

];
export const LookupFilter = [
    { id: "SystemLookup", label: "System Lookup", value: "SystemLookup" },
    { id: "UserLookup", label: "User Lookup", value: "UserLookup" },
];

export const LookupTypeClass=

[
    {id:"S",text:"S"},
    {id:"U",text:"U"},

]