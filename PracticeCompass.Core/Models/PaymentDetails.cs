using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class PaymentDetails
    {
        public PaymentDetails()
        {
        }

        public int PaymentSID { get; set; }
        public string PracticeName { get; set; }
        public int PracticeID { get; set; }
        public string PostDate { get; set; }
        public string Source { get; set; }
        public string PayorName { get; set; }
        public int PayorID { get; set; }
        public string paymentClass { get; set; }
        public string paymentClasscode { get; set; }
        public float Amount { get; set; }
        public string Paymentmethodcode { get; set; }
        public string PayMethod { get; set; }
        public string AuthorizationCode { get; set; }
        public string FullyApplied { get; set; }
        public string Voucher { get; set; }
        public string CreateMethod { get; set; }
        public string CreditCard { get; set; }
        public string CreditCardname { get; set; }

    }
}
