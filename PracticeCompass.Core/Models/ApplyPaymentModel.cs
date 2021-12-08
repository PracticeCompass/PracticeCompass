﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ApplyPaymentModel
    {
        public int ChargeSID { get; set; }
        public int PaymentSID { get; set; }
        public int PayorID { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal Adjustment { get; set; }
        public string PaymentType { get; set; } // G : Patient , I Insurace 
        public int? PlanID { get; set; }
        public decimal PaymentRemaining { get; set; }

    }
}
