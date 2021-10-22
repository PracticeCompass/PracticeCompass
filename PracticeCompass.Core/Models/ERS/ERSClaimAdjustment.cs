using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSClaimAdjustment
    {
        public string prrowid { get; set; }
        public int? ERSClaimSID { get; set; }
        public string ClaimAdjustmentGroupCode { get; set; }
        public string AdjustmentReasonCode { get; set; }
        public decimal? AdjustmentAmt { get; set; }
        public decimal? AdjustmentQuantity { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}