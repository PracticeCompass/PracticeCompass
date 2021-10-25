using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class PaymentClass
    {
        public PaymentClass()
        {
        }

        public string LookupCode { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
    }
}
