using System;

namespace PracticeCompass.Core.Models
{
    public class Charge
    {
        public string prrowid { get; set; }
        public int? ChargeSID { get; set; }
        public int? PracticeID { get; set; }
        public int? StaffID { get; set; }
        public int? PatientID { get; set; }
        public int? AccountSID { get; set; }
        public int? FinanceCenterID { get; set; }
        public int? JournalSID { get; set; }
        public DateTime? PostDate { get; set; }
        public string DepartmentCode { get; set; }
        public string ChargeType { get; set; }
        public string AdminChargeCode { get; set; }
        public string DefaultFeeOverrode { get; set; }
        public decimal? Amount { get; set; }
        public decimal? ApprovedAmount { get; set; }
        public decimal? CopayAmount { get; set; }
        public decimal? VisitCopay { get; set; }
        public decimal? DeductibleApplied { get; set; }
        public decimal? TaxAmount { get; set; }
        public string CurrentStatus { get; set; }
        public DateTime? DateSatisfied { get; set; }
        public string AssignBenefits { get; set; }
        public string StmtCommentCode { get; set; }
        public DateTime? GuarantorRespDate { get; set; }
        public string ForcePaperClaim { get; set; }
        public string PatientBilled { get; set; }
        public string PatientStatement { get; set; }
        public string RecordStatus { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public float? GuarantorReceipts { get; set; }
        public float? InsuranceReceipts { get; set; }
        public float? Adjustments { get; set; }
        public string Voucher { get; set; }
        public string RespPartyType { get; set; }
        public int? RespPartyID { get; set; }
        public string PolicyNumber { get; set; }
        public int? RespCoverageOrder { get; set; }
        public string VisitCopayClass { get; set; }
        public int? ChargeSourceModuleID { get; set; }
        public string SevTwoRuleBillingHold { get; set; }
        public DateTime? SevTwoRuleBillingHoldDate { get; set; }
        public int? SevTwoRuleOffHoldUserID { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
