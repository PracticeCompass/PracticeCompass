using System;

namespace PracticeCompass.Core.Models
{
    public class Claim
    {
        public string prrowid { get; set; }
        public int? ClaimSID { get; set; }
        public int? PracticeID { get; set; }
        public int? PatientID { get; set; }
        public int? AccountSID { get; set; }
        public int? AilmentSID { get; set; }
        public string ClaimNumber { get; set; }
        public DateTime? SatisfiedDate { get; set; }
        public string AssignBenefits { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public int? LowestRespCoverageOrder { get; set; }
        public int? ParentClaimSID { get; set; }
        public string LegacyClaimNumber { get; set; }
        public string Converted { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }


    }
}
