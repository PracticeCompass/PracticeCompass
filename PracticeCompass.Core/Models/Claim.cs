using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class Claim
    {
        public string GridID { get; set; }
        public string ClaimSID { get; set; }
        public string TotalClaimAmount { get; set; }
        public string OutStandingBalanace { get; set; }

        public string PracticeName { get; set; }
        public string PracticeID { get; set; }
        public string patientName { get; set; }
        public string Dos { get; set; }
        public string ProviderName { get; set; }
        public string Destination { get; set; }
        public string PrimaryStatus { get; set; }
        public string SeconadryStatus { get; set; }
        public string TertiaryStatus { get; set; }
        public int totalCount { get; set; }


    }
}
