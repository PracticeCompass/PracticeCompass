using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class InsuranceRecord
    {
        public int PlanID { get; set; }
        public string CarrierCode { get; set; }
        public string SortName { get; set; }
        public string Class { get; set; }
        public string RecordStatus { get; set; }
        public string DNZip { get; set; }
        public string FilingCode { get; set; }
        public string Description { get; set; }
        public string LineOfBusiness { get; set; }
        public string payername { get; set; }
        public string EDIOptions { get; set; }
        public string GovernmentType { get; set; }
        public string PlanType { get; set; }
        public string ProviderIDTag { get; set; }
        public string WebURL { get; set; }
        public string AffiliatedState { get; set; }
        public string EnrollInstructions { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Zip { get; set; }
        public string Attention { get; set; }
        public string Number { get; set; }
    }
}
