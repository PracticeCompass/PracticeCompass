using System;

namespace PracticeCompass.Core.Models
{
    public class PlanClaimChargeRemit
    {
        public string prrowid { get; set; }
        public int? PlanID { get; set; }
        public int? ClaimSID { get; set; }
        public string PolicyNumber { get; set; }
        public int? ChargeSID { get; set; }
        public int? RemitCount { get; set; }
        public int? PaymentChargeSID { get; set; }
        public int? PaymentSID { get; set; }
        public int? ActivityCount { get; set; }
        public decimal? PaidAmount { get; set; }
        public string RemitProcedureCode { get; set; }
        public string RemitProcedureDesc { get; set; }
        public decimal? PaidUnits { get; set; }
        public DateTime? AdjudicationDate { get; set; }
        public string RemitCodesChanged { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string ProductServiceIDQualifier { get; set; }
        public string NUBCRevenueCode { get; set; }
        public int? LineItem { get; set; }
        public int? BundledChargeSID { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }

    }
}
