using System;

namespace PracticeCompass.Core.Models
{
    public class ClaimCharge
    {
        public string prrowid { get; set; }
        public int? ClaimSID { get; set; }
        public int? ChargeSID { get; set; }
        public string CurrentStatus { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
