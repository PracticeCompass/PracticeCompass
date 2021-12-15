export const columnsclaimNote = [
    {
        field: "claimNoteSID",
        title: "ID",
        minWidth: 80,
        orderIndex: 1,
        hide: true
    },
    {
        field: "body",
        title: "Note",
        minWidth: 1500,
        orderIndex: 2
    }
];
export const columns = [
    {
        field: "fromServiceDate",
        title: "from DOS",
        minWidth: 70,
        orderIndex: 1
    },
    {
        field: "procedureCode",
        title: "Procedure",
        minWidth: 70,
        orderIndex: 2
    },
    {
        field: "amount",
        title: "Charge",
        minWidth: 100,
        orderIndex: 3,
        type: "currency",
        isCustomCell: true
    },
    {
        field: "mod1",
        title: "Mod 1",
        minWidth: 70,
        orderIndex: 4
    },
    {
        field: "mod2",
        title: "Mod 2",
        minWidth: 70,
        orderIndex: 5
    },
    {
        field: "diag1",
        title: "Diag1",
        minWidth: 70,
        orderIndex: 6
    },
    {
        field: "diag2",
        title: "Diag2",
        minWidth: 70,
        orderIndex: 7
    },
    {
        field: "units",
        title: "Units",
        minWidth: 50,
        orderIndex: 8
    },
    {
        field: "outStandingBalance",
        title: "OutStanding Balance",
        minWidth: 150,
        orderIndex: 9,
        type: "currency",
        isCustomCell: true
    },
    {
        field: "prim",
        title: "Plan 1",
        minWidth: 70,
        orderIndex: 10
    },
    {
        field: "seC",
        title: "Plan 2",
        minWidth: 70,
        orderIndex: 11
    },
    {
        field: "patient",
        title: "Patient",
        minWidth: 100,
        orderIndex: 12
    },
    {
        field: "recordStatus",
        title: "Record Status",
        minWidth: 100,
        orderIndex: 13,
        showToolTip: true

    },
    {
        field: "currentStatus",
        title: "Current Status",
        minWidth: 100,
        orderIndex: 14,
        showToolTip: true

    },
    {
        field: "providerName",
        title: "Rendering",
        minWidth: 150,
        orderIndex: 15
        // minWidth: 65,
    },
    {
        field: "respCoverageOrder",
        title: "Resp Coverage Order",
        minWidth: 150,
        orderIndex: 16
        // minWidth: 65,
    },
    {
        field: "chargeSID",
        title: "ID",
        minWidth: 19,
        orderIndex: 0,
        hide: true
    }
];

export const submissionHistoryColumns = [
    {
        field: "statusCount",
        title: "Status Count",
        minWidth: 50,
        orderIndex: 1
    },
    {
        field: "reportType",
        title: "Report Type",
        minWidth: 50,
        orderIndex: 2
    },
    {
        field: "statusSource",
        title: "Status Source",
        minWidth: 50,
        orderIndex: 3
    },
    {
        field: "statusDate",
        title: "Status Date",
        minWidth: 70,
        orderIndex: 4
    },
    {
        field: "statusCategory",
        title: "Status Category",
        minWidth: 100,
        orderIndex: 5,
        showToolTip: true
    },
    {
        field: "claimStatus",
        title: "Claim Status",
        minWidth: 100,
        orderIndex: 6
    },
    {
        field: "amountPaid",
        title: "Amount Paid",
        minWidth: 100,
        orderIndex: 7,
        type: "currency",
        isCustomCell: true
    },
    {
        field: "payerClaimID",
        title: "Payer Claim ID",
        minWidth: 100,
        orderIndex: 8
    },
    {
        field: "errorMessage",
        title: "Error Message",
        minWidth: 650,
        orderIndex: 9,
        showToolTip: true
    },
    {
        field: "gridId",
        title: "ID",
        minWidth: 50,
        hide: true
    }
];
