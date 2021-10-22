using System;

namespace PracticeCompass.Common.Models
{
    public class FinancialInformation
    {
        public Enums.TransactionHandlingMethod HandlingMethod { set; get; }
        public decimal TotalPaidAmount { set; get; }
        public Enums.CreditDebit CreditDebit { set; get; }
        public Enums.PaymentMethod PaymentMethod { set; get; }
        public Enums.PaymentFormat PaymentFormat { set; get; }
        public Enums.DepositoryFinancialInstitutionType AccountNumber { set; get; }
        public string DfiNumber { set; get; }
        public string senderAccountNumber { set; get; }
        public string CompanyId { set; get; }
        public string OriginCompanySupplementalCode { set; get; }
        public Enums.DepositoryFinancialInstitutionType RoutingNumber { set; get; }
        public string receiverDfiNumber { set; get; }
        public string receiverAccountNumber { set; get; }
        public DateTime PaymentEffectiveDate { set; get; }
        public string ReferenceIdentificationNumber { set; get; }
        public FinancialInformation()
        {
            this.HandlingMethod= Enums.TransactionHandlingMethod.None;
            this.TotalPaidAmount = 0;
            this.CreditDebit = Enums.CreditDebit.None;
            this.PaymentMethod = Enums.PaymentMethod.None;
            this.PaymentFormat = Enums.PaymentFormat.None;
            this.AccountNumber = Enums.DepositoryFinancialInstitutionType.None;
            this.DfiNumber = string.Empty;
            this.senderAccountNumber = string.Empty;
            this.CompanyId = string.Empty;
            this.OriginCompanySupplementalCode = string.Empty;
            this.RoutingNumber = Enums.DepositoryFinancialInstitutionType.None;
            this.receiverDfiNumber = string.Empty;
            this.receiverAccountNumber = string.Empty;
            this.PaymentEffectiveDate = new DateTime(1900, 1, 1);
            this.ReferenceIdentificationNumber = string.Empty;
        }
    }
}
