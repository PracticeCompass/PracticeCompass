using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSRemittanceFileInstance
    {
        public string prrowid { get; set; }
        public int? RemittanceSID { get; set; }
        public int? PracticeID { get; set; }
        public string RemittanceSourceCode { get; set; }
        public DateTime? DateReceived { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public int? FileArchiveSID { get; set; }
        public string RecordStatus { get; set; }
        public DateTime? DateFinished { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
