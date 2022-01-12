using System.Collections.Generic;

namespace PracticeCompass.Common.Models
{
    public class ClaimReportModel
    {
        public ClaimReportModel()
        {
            ClaimReportItems = new List<ClaimReportItem>();
        }
        public string reportType { get; set; }
        public List<ClaimReportItem> ClaimReportItems { get; set; }


    }
    public class ClaimReportItem

    {
        public string ClearingHouseFileref { get; set; }
        public string ClearingHouseClaimref { get; set; }
        public string ClaimNumber { get; set; }
        public string PayerPlanID { get; set; }
        public string PracticeTaxCode { get; set; }
        public string ClaimMemberID { get; set; }
        public string PayerClaimID { get; set; }
        public string SatatusSource { get; set; }
        public string Message { get; set; }
        public string SatatusCategory { get; set; }
        public string ClaimStatus { get; set; }
        public string ErrorFieldData { get; set; }
        public string ErrorField { get; set; }
        public string ErrorRejectReason { get; set; }
        public string ErrorLevel { get; set; }
        public string RunNumber { get; set; }

    }
}
