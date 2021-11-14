using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class InsurancePayment
    {
        public InsurancePayment()
        {
        }

        public int ChargeSID { get; set; }
        public string FromServiceDate { get; set; }
        public string ProcedureCode { get; set; }
        public string ProcedureDescription { get; set; }
        public string Modifier1 { get; set; }
        public string Diag1 { get; set; }
        public string Amount { get; set; }
        public string ChargeBalance { get; set; }
        public string InsurancePaid { get; set; }
        public string Adjustments { get; set; }
        public int PatientID { get; set; }
        public int ClaimSID { get; set; }
    }
}
