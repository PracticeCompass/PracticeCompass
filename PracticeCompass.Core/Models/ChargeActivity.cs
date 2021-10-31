using System;

namespace PracticeCompass.Core.Models
{
    public class ChargeActivity
    {

        public string prrowid { get; set; }
        public int? ChargeSID { get; set; }
        public int? ActivityCount { get; set; }
        public string ActivityType { get; set; }
        public string SourceType { get; set; }
        public int? SourceID { get; set; }
        public int? JournalSID { get; set; }
        public DateTime? PostDate { get; set; }
        public float? Amount { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public int? AccountSID { get; set; }
        public string PatientStatement { get; set; }
        public string DisplayText { get; set; }
        public string CreateMethod { get; set; }
        public int? DNPracticeID { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
