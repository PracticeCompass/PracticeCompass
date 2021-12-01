using System;

namespace PracticeCompass.Common.Models
{
    public class FinancialInformation
    {
        public string HandlingMethod { set; get; }
        public decimal TotalPaidAmount { set; get; }
        public string CreditDebit { set; get; }
        public string PaymentMethod { set; get; }
        public string PaymentFormat { set; get; }
        public string AccountNumber { set; get; }
        public string DfiNumber { set; get; }
        public string senderAccountNumber { set; get; }
        public string senderAccountNbrQualifier { set; get; }
        public string CompanyId { set; get; }
        public string OriginCompanySupplementalCode { set; get; }
        public string RoutingNumber { set; get; }
        public string receiverDfiNumber { set; get; }
        public string receiverAccountNumber { set; get; }
        public string receiverAcctNumberQualifier { set; get; }
        public DateTime PaymentEffectiveDate { set; get; }
        public string ReferenceIdentificationNumber { set; get; }
        public string TraceOrigCompanySupplCode { set; get; }
        public string parameterGroupCode { get; set; }
        public string CheckTraceNbr { set; get; }
        public string TraceTypeCode { set; get; }
        public FinancialInformation()
        {
            this.HandlingMethod= string.Empty;
            this.TotalPaidAmount = 0;
            this.CreditDebit = string.Empty;
            this.PaymentMethod = string.Empty;
            this.PaymentFormat = string.Empty;
            this.AccountNumber = string.Empty;
            this.TraceTypeCode = string.Empty;
            this.CheckTraceNbr = string.Empty;
            this.DfiNumber = string.Empty;
            this.senderAccountNumber = string.Empty;
            this.CompanyId = string.Empty;
            this.OriginCompanySupplementalCode = string.Empty;
            this.RoutingNumber = string.Empty;
            this.receiverDfiNumber = string.Empty;
            this.receiverAccountNumber = string.Empty;
            this.PaymentEffectiveDate = new DateTime(1900, 1, 1);
            this.ReferenceIdentificationNumber = string.Empty;
        }
    }
}
