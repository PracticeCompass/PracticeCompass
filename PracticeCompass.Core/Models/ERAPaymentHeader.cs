using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ERAPaymentHeader
    {
        public ERAPaymentHeader()
        {
        }

        public int ERSPaymentSID { get; set; }
        public int PracticeID { get; set; }
        public string CheckTraceNbr { get; set; }
        public string TransHandlingCode { get; set; }
        public float TotalActualProviderPaymentAmt { get; set; }
        public string PaymentMethodCode { get; set; }
        public string PaymentFormatCode { get; set; }
        public string SenderBankAcctNbr { get; set; }
        public string RemitPayerIdent { get; set; }
        public string ReceiverAcctNbr { get; set; }
        public string CheckIssueDate { get; set; }
        public string PayerNameText { get; set; }
        public string PracticeName { get; set; }
        public bool PaymentFound { get; set; }

    }
}
