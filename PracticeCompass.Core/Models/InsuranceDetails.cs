using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class InsuranceDetails
    {
        public string GridID { get; set; }
        public int PatientID { get; set; }
        public int PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public string groupNumber { get; set; }
        public string insuredID { get; set; }
        public string insured { get; set; }
        public string relationToSub { get; set; }
    }
}
