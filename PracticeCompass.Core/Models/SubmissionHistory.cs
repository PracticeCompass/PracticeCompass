using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    //,,,,,,,,
    public class SubmissionHistory
    {
        public string GridId { get; set; }
        public int PlanID { get; set; }
        public int ClaimSID { get; set; }
        public string ReportType { get; set; }
        public string StatusCategory { get; set; }
        public string StatusCategory_ { get; set; }
        public int StatusCount { get; set; }
        public string StatusSource { get; set; }
        public string StatusDate { get; set; }
        public string ClaimStatus { get; set; }
        public string AmountPaid { get; set; }
        public string PayerClaimID { get; set; }
        public string ErrorMessage { get; set; }
    }
}
