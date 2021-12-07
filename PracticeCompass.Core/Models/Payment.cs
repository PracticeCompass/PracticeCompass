using System;

namespace PracticeCompass.Core.Models
{
    public class Payment
    {
        public string prrowid { get; set; }
        public int? PaymentSID { get; set; }
        public int? PracticeID { get; set; }
        public int? JournalSID { get; set; }
        public DateTime? PostDate { get; set; }
        public string Source { get; set; }
        public int? PayorID { get; set; }
        public string Class { get; set; }
        public decimal? Amount { get; set; }
        public string Method { get; set; }
        public string FullyApplied { get; set; }
        public string CreditCard { get; set; }
        public string AuthorizationCode { get; set; }
        public string PreCollected { get; set; }
        public string RestrictUser { get; set; }
        public DateTime? ReferenceDate { get; set; }
        public string Voucher { get; set; }
        public string RecordStatus { get; set; }
        public string TimeStamp { get; set; }
        public int? LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int? CreateUser { get; set; }
        public string CreateMethod { get; set; }
        public int? CBOPaymentSID { get; set; }
        public string TraceNumber { get; set; }
        public string CCReceiptInfo { get; set; }
        public int? ReportStorageSID { get; set; }
        public string ReportStorageParams { get; set; }
        public string SPSReferenceID { get; set; }
        public bool? PatientBilled { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime? pro2created { get; set; }
        public DateTime? pro2modified { get; set; }
    }
}
