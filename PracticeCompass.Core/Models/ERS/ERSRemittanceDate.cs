using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSRemittanceDate
    {
        public string prrowid { set; get; }
        public int? RemittanceSID { set; get; }
        public string DateTimeQualifier { set; get; }
        public DateTime? Date { set; get; }
        public string TimeStamp { set; get; }
        public int? LastUser { set; get; }
        public string CreateStamp { set; get; }
        public int? CreateUser { set; get; }
        public string Pro2SrcPDB { set; get; }
        public DateTime? pro2created { set; get; }
        public DateTime? pro2modified { set; get; }
    }
}
