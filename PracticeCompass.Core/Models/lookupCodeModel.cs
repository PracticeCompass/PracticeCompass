using System;

namespace PracticeCompass.Core.Models
{
    public class lookupCodeModel
    {
        public string prrowid { get; set; }
        public string LookupType { get; set; }
        public string LookupCode { get; set; }
        public int order { get; set; }
        public string Description { get; set; }
        public string RecordStatus { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
