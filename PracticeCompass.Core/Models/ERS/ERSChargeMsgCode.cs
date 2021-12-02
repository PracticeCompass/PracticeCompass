using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSChargeMsgCode
    {

        public string prrowid { set; get; }
        public int? ERSChargeSID { set; get; }
        public string MessageCode { set; get; }
        public string TimeStamp { set; get; }
        public int? LastUser { set; get; }
        public string CreateStamp { set; get; }
        public int? CreateUser { set; get; }
        public int? SortOrder { set; get; }
        public decimal? Amount { set; get; }
        public decimal? Quantity { set; get; }
        public string Pro2SrcPDB { set; get; }
        public DateTime? pro2created { set; get; }
        public DateTime? pro2modified { set; get; }
    }
}
