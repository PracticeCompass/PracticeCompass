using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class PatientPayment
    {
        public PatientPayment()
        {
        }

        public int ChargeSID { get; set; }
        public string FromServiceDate { get; set; }
        public string ProcedureCode { get; set; }
        public string  ProcedureDescription { get; set; }
        public string Modifier1 { get; set; }
        public string Diag1 { get; set; }
        public float Amount { get; set; }
        public float ChargeBalance { get; set; }
        public float PatientPaid { get; set; }
        public float Adjustments { get; set; }
        public int PatientID { get; set; }
    }
}
