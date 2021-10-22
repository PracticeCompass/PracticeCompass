using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSChargeServiceInfo
    {
        public string prrowid { get; set; }
        public int? ERSChargeSID { get; set; }
        public int? ERSClaimSID { get; set; }
        public string ProductServiceIDQualifier { get; set; }
        public string ProductServiceID { get; set; }
        public string ProcedureModifier01 { get; set; }
        public string ProcedureModifier02 { get; set; }
        public string ProcedureModifier03 { get; set; }
        public string ProcedureModifier04 { get; set; }
        public string ProcedureCodeDescription { get; set; }
        public decimal? LineItemChargeAmt { get; set; }
        public decimal? LineItemProviderPaymentAmt { get; set; }
        public string NUBCRevenueCode { get; set; }
        public decimal? UnitsOfServicePaidCount { get; set; }
        public string OrigProductServiceIDQualifier { get; set; }
        public string OrigProductServiceID { get; set; }
        public string OrigProcedureModifier01 { get; set; }
        public string OrigProcedureModifier02 { get; set; }
        public string OrigProcedureModifier03 { get; set; }
        public string OrigProcedureModifier04 { get; set; }
        public string OrigProcedureCodeDescription { get; set; }
        public decimal? OrigUnitsOfServiceCount { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}