using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSPmtProvLevelAdj
    {
        public string prrowid { set; get; }
        public int? ERSPaymentSID { set; get; }
        public string RemitterProviderID { set; get; }
        public DateTime? FiscalPeriodDate { set; get; }
        public string AdjustmentReasonCode { set; get; }
        public string ProviderAdjustmentID { set; get; }
        public string AdjCorrection { set; get; }
        public decimal? ProviderAdjustmentAmt { set; get; }
        public string TimeStamp { set; get; }
        public int? LastUser { set; get; }
        public string CreateStamp { set; get; }
        public int? CreateUser { set; get; }
        public string OrigAdjustmentCode { set; get; }
        public string MedicareCode { set; get; }
        public string FinancialControlNumber { set; get; }
        public string HICNumber { set; get; }
        public string Pro2SrcPDB { set; get; }
        public DateTime? pro2created { set; get; }
        public DateTime? pro2modified { set; get; }
    }
}
