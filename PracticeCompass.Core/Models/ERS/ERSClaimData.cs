using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSClaimData
    {
        public string prrowid { set; get; }
        public int? ERSClaimSID { set; get; }
        public int? ERSPaymentSID { set; get; }
        public string PatientControlNbr { set; get; }
        public string ClaimStatusCode { set; get; }
        public decimal? TotalClaimChargeAmt { set; get; }
        public decimal? ClaimPaymentAmt { set; get; }
        public decimal? PatientResponsibilityAmt { set; get; }
        public string ClaimFilingIndicatorCode { set; get; }
        public string PayerClaimControlNumber { set; get; }
        public string FacilityTypeCode { set; get; }
        public string ClaimFrequencyTypeCode { set; get; }
        public string DiagnosisRelatedGroupCode { set; get; }
        public decimal? DiagnosisRelatedGroupWeight { set; get; }
        public decimal? DischargeFraction { set; get; }
        public string TimeStamp { set; get; }
        public int? LastUser { set; get; }
        public string CreateStamp { set; get; }
        public int? CreateUser { set; get; }
        public string ClaimDetail { set; get; }
        public bool? SkipClaim { set; get; }
        public bool? Posted { set; get; }
        public string Pro2SrcPDB { set; get; }
        public DateTime? pro2created { set; get; }
        public DateTime? pro2modified { set; get; }
    }
}
