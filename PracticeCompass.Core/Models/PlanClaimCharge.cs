using System;

namespace PracticeCompass.Core.Models
{
    public class PlanClaimCharge
    {

        public string prrowid { get; set; } 
        public int? PlanID { get; set; }
        public int? ClaimSID { get; set; }
        public string PolicyNumber { get; set; }
        public int? LineItem { get; set; }
        public int? ChargeSID { get; set; }
        public decimal? BilledAmount { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public decimal? PatReceipts { get; set; }
        public decimal? InsReceipts { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
