using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class PaymentAssignmentDTO
    {
        public PaymentAssignmentDTO()
        {
        }

        public int PaymentSID { get; set; }
        public int ChargeSID { get; set; }
        public int ActivityCount { get; set; }
        public int AccountSID { get; set; }
        public string SortName { get; set; }
        public string AccountNumber { get; set; }
        public string PostDate { get; set; }
        public string Amount { get; set; }
        public string PatientBilled { get; set; }
        public string PatientStatement { get; set; }
    }
}
