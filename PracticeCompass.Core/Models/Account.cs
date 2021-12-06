using System;

namespace PracticeCompass.Core.Models
{
    public  class Account
    {
        public string prrowid { get; set; }
        public int? AccountSID { get; set; }
        public int? PracticeID { get; set; }
        public int? GuarantorID { get; set; }
        public string AccountNumber { get; set; }
        public string AccountStatus { get; set; }
        public string AcctFinanceGroup { get; set; }
        public decimal? Balance { get; set; }
        public decimal? PeriodBalance { get; set; }
        public DateTime? LastReportedDate { get; set; }
        public string RecordStatus { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string Class { get; set; }
        public decimal? MonthlyPayment { get; set; }
        public string TaxCode { get; set; }
        public string NonPatientAccount { get; set; }
        public string NonPatientAccountType { get; set; }
        public string IndustrialAccount { get; set; }
        public decimal? LastStatementAmount { get; set; }
        public string DNSortAccountNumber { get; set; }
        public string DNGuarLastName { get; set; }
        public string DNGuarFirstName { get; set; }
        public string DNGuarMiddleName { get; set; }
        public string DNGuarNameSuffix { get; set; }
        public string DiscountAdjCode { get; set; }
        public string HL7Updated { get; set; }
        public string PreviousAcctFinanceGroup { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
