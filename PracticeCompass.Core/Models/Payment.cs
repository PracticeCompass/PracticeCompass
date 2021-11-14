using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class Payment
    {
        public Payment()
        {
        }

        public string PaymentSID { get; set; }
        public string PracticeName { get; set; }
        public string PostDate { get; set; }
        public string Source { get; set; }
        public string PayorName { get; set; }
        public string payorID { get; set; }
        public string paymentClass { get; set; }
        public string Amount { get; set; }
        public string Remaining { get; set; }
        public string PayMethod { get; set; }
        public string FullyApplied { get; set; }
        public string Voucher { get; set; }
        public string CreateMethod { get; set; }

    }
}
