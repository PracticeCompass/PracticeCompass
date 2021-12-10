
export const documentColumns = [
    {
      field: "fileID",
      title: "ID",
      minWidth: 50,
      orderIndex: 1,
    },
    {
      field: "fileName",
      title: "Name",
      minWidth: 100,
      orderIndex: 2,
    },
    {
        field: "fileDate",
        title: "File Date",
        minWidth: 100,
        orderIndex: 3,
    },
    {
      field: "path",
      title: "file Path",
      minWidth: 200,
      hide:true,
      orderIndex: 4,
    },
    {
      field: "isProcessed",
      title: "Processed",
      minWidth: 70,
      orderIndex: 5,
      cell:"checkBox"
    },
    {
      field: "notes",
      title: "Notes",
      minWidth: 140,
      orderIndex: 6,
      showToolTip: true,
      //iscellWithIcon:true

    },
  ];