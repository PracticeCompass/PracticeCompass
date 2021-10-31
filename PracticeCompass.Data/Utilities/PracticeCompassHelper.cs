using System;
using System.Data;
using Dapper;
namespace PracticeCompass.Data.Utilities
{
    public class PracticeCompassHelper
    {
        private IDbConnection db;
        public PracticeCompassHelper(IDbConnection _db)

        { this.db = _db; }
        private string GetMAXprrowid(string tableName, string lastprrowid)
        {
            try
            {


                long intFromHex;
                if (lastprrowid != "0")
                {
                    intFromHex = Convert.ToInt64(lastprrowid, 16) + 1;
                }
                else
                {
                    string sql = string.Format("SELECT MAX(CONVERT(INT, CONVERT(VARBINARY, prrowid,1))) from [{0}]", tableName);
                    var prrowid = db.ExecuteScalar(sql);
                    intFromHex = 1;
                    if (prrowid != null)
                        intFromHex = (int)prrowid + 1;
                }
                string hexValue = intFromHex.ToString("x16");
                return string.Format("0x{0:X}", hexValue);
            }
            catch (Exception e)
            {
                return "";
            }
        }
        private int GetMAXColumnid(string tableName, string ColumnName)
        {
            try
            {
                int maxcolumnid = 1;
                string sql = string.Format("SELECT MAX({0}) from [{1}]", ColumnName, tableName);
                var columnid = db.ExecuteScalar(sql);
                if (columnid != null)
                    maxcolumnid= (int)columnid + 1;
                return maxcolumnid;
            }
            catch (Exception e)
            {

                return 0;
            }
        }

    }
}
