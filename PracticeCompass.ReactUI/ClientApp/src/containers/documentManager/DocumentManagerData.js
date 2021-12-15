
export const documentColumns = [
    {
      field: "fileID",
      title: "ID",
      minWidth: 50,
      orderIndex: 1,
      editable: false,
    },
    {
      field: "fileName",
      title: "Name",
      minWidth: 100,
      orderIndex: 2,
      editable: false
    },
    {
        field: "fileDate",
        title: "File Date",
        minWidth: 100,
        orderIndex: 3,
        editable: false
    },
    {
      field: "path",
      title: "file Path",
      minWidth: 200,
      hide:true,
      orderIndex: 4,
      editable: false
    },
    {
      field: "isProcessed",
      title: "Processed",
      minWidth: 70,
      orderIndex: 5,
      cell:"checkBox",
      editable: true
    },
    {
      field: "notes",
      title: "Notes",
      minWidth: 370,
      orderIndex: 6,
      showToolTip: true,
      editable: false
      //iscellWithIcon:true

    },
  ];