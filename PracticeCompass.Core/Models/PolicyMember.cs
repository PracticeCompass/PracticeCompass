using System;

namespace PracticeCompass.Core.Models
{
    public class PolicyMember
    {
        public string prrowid { get; set; }
        public int? PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public int? PersonID { get; set; }
        public string RelationToSub { get; set; }
        public int? CoverageOrder { get; set; }
        public string DeductibleSource { get; set; }
        public decimal? DeductibleRemaining { get; set; }
        public string DeductibleTimestamp { get; set; }
        public string MemberNumber { get; set; }
        public string RecordStatus { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string InsuranceType { get; set; }
        public string RxBenefit { get; set; }
        public string ClaimMemberID { get; set; }
        public string EDIMemberID { get; set; }
        public string Note { get; set; }
        public int? FrontImageSID { get; set; }
        public int? BackImageSID { get; set; }
        public string CopayClass { get; set; }
        public string ClaimMemberID2 { get; set; }
        public string HL7Updated { get; set; }
        public string FrontImageFileID { get; set; }
        public string BackImageFileID { get; set; }
        public string FrontImageScanStamp { get; set; }
        public string BackImageScanStamp { get; set; }
        public int? FrontImageScanUserID { get; set; }
        public int? BackImageScanUserID { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
