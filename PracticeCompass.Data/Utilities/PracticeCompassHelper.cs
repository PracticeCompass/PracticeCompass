using System;
using System.Data;
using Dapper;
using PracticeCompass.Common.Enums;

namespace PracticeCompass.Data.Utilities
{
    public class PracticeCompassHelper
    {
        private IDbConnection db;
        public PracticeCompassHelper(IDbConnection _db)

        { this.db = _db; }
        public string GetMAXprrowid(string tableName, string lastprrowid)
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
        public int GetMAXColumnid(string tableName, string ColumnName, int lastMaxID=0, string WhereCondition="")
        {
            try
            {
                if (lastMaxID != 0)
                {
                    return lastMaxID+ 1;
                }
                int maxcolumnid = 1;
                string sql = string.Format("SELECT MAX({0}) from [{1}] {2}", ColumnName, tableName, WhereCondition);
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
        public  static TransactionHandlingMethod GetHandlingMethodFromCode(string code)
        {
            var method = TransactionHandlingMethod.None;
            switch (code)
            {
                case "C":
                    method = TransactionHandlingMethod.PaymentWithTransaction;
                    break;
                case "D":
                    method = TransactionHandlingMethod.MakePaymentOnly;
                    break;
                case "H":
                    method = TransactionHandlingMethod.NotificationOnly;
                    break;
                case "I":
                    method = TransactionHandlingMethod.RemittanceInformationOnly;
                    break;
                case "P":
                    method = TransactionHandlingMethod.Prenotification;
                    break;
                case "U":
                    method = TransactionHandlingMethod.Split;
                    break;
                case "X":
                    method = TransactionHandlingMethod.SplitOrTogether;
                    break;
            }
            return method;
        }
        public  static PaymentFormat GetPaymentFormatFromCode(string code)
        {
            var qual = PaymentFormat.None;
            switch (code)
            {
                case "CCP":
                    qual = PaymentFormat.CashConcentrationPlusAddenda;
                    break;
                case "CTX":
                    qual = PaymentFormat.CorporateTradeExchange;
                    break;
            }
            return qual;
        }

    }
}
