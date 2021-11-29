using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSPmtPartyContactNbr
    {

        public string prrowid { get; set; }
        public int? ERSPaymentSID { get; set; }
        public string EntityIDCode { get; set; }
        public string ContactFunctionCode { get; set; }
        public string CommunicationsNbrQualifier { get; set; }
        public string CommunicationsNbr { get; set; }
        public string CommunicationsExt { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
