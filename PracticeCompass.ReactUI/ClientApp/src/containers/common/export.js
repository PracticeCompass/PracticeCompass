export const exportExcelFile =
(_export,data, columns) => {
    if (_export !== null) {
        _export.save(data, columns.filter(x=>x.hide !=true));
      }
};