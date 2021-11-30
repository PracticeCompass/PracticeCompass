using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSChargeDate
    {
        public string prrowid { get; set; }
        public int? ERSChargeSID { get; set; }
        public string DateTimeQualifier { get; set; }
        public DateTime? ServiceDate { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
