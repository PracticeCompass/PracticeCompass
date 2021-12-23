using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class PaymentDTO
    {
        public string prrowid { get; set; }
        public int PaymentSID { get; set; }
        public string PracticeName { get; set; }
        public string PostDate { get; set; }
        public string Source { get; set; }
        public string PayorName { get; set; }
        public int payorID { get; set; }
        public string paymentClass { get; set; }
        public float Amount { get; set; }
        public float Remaining { get; set; }
        public string PayMethod { get; set; }
        public string FullyApplied { get; set; }
        public string Voucher { get; set; }
        public string CreateMethod { get; set; }
        public int PracticeID { get; set; }

    }
}
