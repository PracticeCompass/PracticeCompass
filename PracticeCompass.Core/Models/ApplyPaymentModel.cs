using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ApplyPaymentModel
    {
        public int ChargeSID { get; set; }
        public int PaymentSID { get; set; }
        public int PayorID { get; set; }
        public float AmountPaid { get; set; }
        public float Adjustment { get; set; }
        public string PaymentType { get; set; } // G : Patient , I Insurace 

    }
}
