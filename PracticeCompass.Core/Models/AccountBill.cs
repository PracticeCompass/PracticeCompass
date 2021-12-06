using System;

namespace PracticeCompass.Core.Models
{
    public class AccountBill
    {
        public string prrowid { get; set; }
        public int? AccountSID { get; set; }
        public string BillFormCode { get; set; }
        public int? PracticeID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string AccountNumber { get; set; }
        public string GuarantorLastName { get; set; }
        public string GuarantorName { get; set; }
        public string GuarLine1 { get; set; }
        public string GuarLine2 { get; set; }
        public string GuarCity { get; set; }
        public string GuarState { get; set; }
        public string GuarZip { get; set; }
        public string PracticeName { get; set; }
        public string PracLine1 { get; set; }
        public string PracLine2 { get; set; }
        public string PracCity { get; set; }
        public string PracState { get; set; }
        public string PracZip { get; set; }
        public string PracPhone { get; set; }
        public decimal? BalanceForward { get; set; }
        public decimal? CurrentBalance { get; set; }
        public decimal? GuarantorDue { get; set; }
        public decimal? InsuranceDue { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public int? ReportSID { get; set; }
        public decimal? TotalGuarantorBalance { get; set; }
        public decimal? NewUnpaidCopay { get; set; }
        public decimal? TotalUnpaidCopay { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
