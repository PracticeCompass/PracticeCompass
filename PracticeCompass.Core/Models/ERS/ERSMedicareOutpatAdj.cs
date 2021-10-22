using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSMedicareOutpatAdj
    {
        public string prrowid { get; set; }
        public int? ERSClaimSID { get; set; }
        public decimal? ReimbursementRate { get; set; }
        public decimal? ClaimHCPCSPayableAmt { get; set; }
        public string ClaimPaymentRemarkCode01 { get; set; }
        public string ClaimPaymentRemarkCode02 { get; set; }
        public string ClaimPaymentRemarkCode03 { get; set; }
        public string ClaimPaymentRemarkCode04 { get; set; }
        public string ClaimPaymentRemarkCode05 { get; set; }
        public decimal? ClaimESRDPaymentAmt { get; set; }
        public decimal? NonpayableProfComponentAmt { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }

    }
}
