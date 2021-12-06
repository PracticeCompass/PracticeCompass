using System;

namespace PracticeCompass.Core.Models
{
    public class PlanClaimStatus
    {
        public string prrowid { get; set; }
        public int? PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public int? ClaimSID { get; set; }
        public int? StatusCount { get; set; }
        public string ReportType { get; set; }
        public string StatusSource { get; set; }
        public string StatusDateStamp { get; set; }
        public string StatusCategory { get; set; }
        public string ClaimStatus { get; set; }
        public decimal? AmountPaid { get; set; }
        public string PayerClaimID { get; set; }
        public string ErrorFieldData { get; set; }
        public string ErrorField { get; set; }
        public string ErrorFieldName { get; set; }
        public int? ErrorSequence { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorRejectReason { get; set; }
        public string ErrorLevel { get; set; }
        public int? SplitClaim { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public int? FileArchiveSID { get; set; }
        public string ClearinghouseFileRef { get; set; }
        public string ClearinghouseClaimRef { get; set; }
        public DateTime? DueDate { get; set; }
        public string PayerPhone { get; set; }
        public string PayerContact { get; set; }
        public string PayerAddress1 { get; set; }
        public string PayerAddress2 { get; set; }
        public string PayerCity { get; set; }
        public string PayerState { get; set; }
        public string PayerZip { get; set; }
        public string PayerFileID { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }

    }
}
