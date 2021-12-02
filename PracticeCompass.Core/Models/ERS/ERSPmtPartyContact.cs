using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSPmtPartyContact
    {
        public string prrowid { get; set; }
        public int? ERSPaymentSID { get; set; }
        public string EntityIDCode { get; set; }
        public string ContactFunctionCode { get; set; }
        public string Name { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
