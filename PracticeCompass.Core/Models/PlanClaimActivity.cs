using System;

namespace PracticeCompass.Core.Models
{
    public class PlanClaimActivity
    {
        public string prrowid { get; set; }
        public int? PlanClaimActivitySID { get; set; }
        public int? PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public int? ClaimSID { get; set; }
        public string ActivityType { get; set; }
        public string Note { get; set; }
        public string ExternalUnique { get; set; }
        public DateTime? ActivityDateTime { get; set; }
        public int? PracticeID { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
