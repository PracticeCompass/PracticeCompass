using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSPmtPartyReference
    {
        public string prrowid { set; get; }
        public int? ERSPaymentSID { set; get; }
        public string EntityIDCode { set; get; }
        public string ReferenceIDQualifier { set; get; }
        public string ReferenceID { set; get; }
        public string TimeStamp { set; get; }
        public int? LastUser { set; get; }
        public string CreateStamp { set; get; }
        public int? CreateUser { set; get; }
        public string Pro2SrcPDB { set; get; }
        public DateTime? pro2created { set; get; }
        public DateTime? pro2modified { set; get; }
    }
}
