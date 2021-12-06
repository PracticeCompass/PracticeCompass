using System;

namespace PracticeCompass.Core.Models
{
    public class PlanClaim
    {
        public string prrowid { get; set; }
        public int? PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public int? ClaimSID { get; set; }
        public string CurrentStatus { get; set; }
        public int? SubmittalCount { get; set; }
        public int? PracticeID { get; set; }
        public int? PatientID { get; set; }
        public int? AccountSID { get; set; }
        public string AccountNumber { get; set; }
        public DateTime? BilledDate { get; set; }
        public DateTime? FromDate { get; set; }
        public decimal? TotalClaimAmount { get; set; }
        public int? CoverageOrder { get; set; }
        public string PlanICN { get; set; }
        public int? BillingProviderID { get; set; }
        public DateTime? BilledThruDate { get; set; }
        public int? AilmentSID { get; set; }
        public int? SubscriberID { get; set; }
        public int? PerformingProviderID { get; set; }
        public int? RefProviderID { get; set; }
        public int? ReferralSID { get; set; }
        public int? OtherSubscriberID { get; set; }
        public int? ServiceCenterID { get; set; }
        public string SortField { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public DateTime? SatisfiedDate { get; set; }
        public string PrevResponsible { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
        public string ClaimFlagCode { get; set; }
    }
}
