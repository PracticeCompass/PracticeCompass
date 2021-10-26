using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSPaymentHeader
    {
        public string prrowid { set; get; }
        public int? ERSPaymentSID { set; get; }
        public int? RemittanceSID { set; get; }
        public string RemittanceSourceCode { set; get; }
        public string ParameterGroupCode { set; get; }
        public string TransHandlingCode { set; get; }
        public decimal? TotalActualProviderPaymentAmt { set; get; }
        public string CreditOrDebitFlagCode { set; get; }
        public string PaymentMethodCode { set; get; }
        public string PaymentFormatCode { set; get; }
        public string SenderDFIIDNbrQualifier { set; get; }
        public string SenderDFINbr { set; get; }
        public string SenderAcctNbrQualifier { set; get; }
        public string SenderBankAcctNbr { set; get; }
        public string RemitPayerIdent { set; get; }
        public string PayerSupplCode { set; get; }
        public string ReceiverDFIIDNbrQualifier { set; get; }
        public string ReceiverBankIDNbr { set; get; }
        public string ReceiverAcctNbrQualifier { set; get; }
        public string ReceiverAcctNbr { set; get; }
        public DateTime? CheckIssueDate { set; get; }
        public string TraceTypeCode { set; get; }
        public string CheckTraceNbr { set; get; }
        public string TracePayerIdent { set; get; }
        public string TraceOrigCompanySupplCode { set; get; }
        public string TimeStamp { set; get; }
        public int? LastUser { set; get; }
        public string CreateStamp { set; get; }
        public int? CreateUser { set; get; }
        public string RuralHealth { set; get; }
        public string RecordStatus { set; get; }
        public string PayerNameText { set; get; }
        public bool? PaymentNotBalanced { set; get; }
        public int? PaymentSID { set; get; }
        public string DeletedAfterPost { set; get; }
        public decimal? OriginalPaymentAmt { set; get; }
        public int? CBOERAPaymentSID { set; get; }
        public int? ReportStorageSID { set; get; }
        public string ReportStorageParams { set; get; }
        public int? PracticeID { set; get; }
        public DateTime? DateReceived { set; get; }
        public int? FileArchiveSID { set; get; }
        public string Pro2SrcPDB { set; get; }
        public DateTime? pro2created { set; get; }
        public DateTime? pro2modified { set; get; }
    }
}
