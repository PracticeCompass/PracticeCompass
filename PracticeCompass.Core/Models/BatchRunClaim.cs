using System;

namespace PracticeCompass.Core.Models
{
    public class BatchRunClaim
    {
        public string prrowid { get; set; }
        public int? PracticeID { get; set; }
        public string BatchCode { get; set; }
        public int? RunNumber { get; set; }
        public int? BatchCount { get; set; }
        public int? SortOrder { get; set; }
        public int? PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public int? ClaimSID { get; set; }
        public string SortField { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public int? SubmittalCount { get; set; }
        public decimal? TotalClaimAmount { get; set; }
        public int? BillingProviderID { get; set; }
        public string PreBillFlag { get; set; }
        public int? ReportDefSetupSID { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
