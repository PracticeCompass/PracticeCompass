using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class LedgerData
    {
        public string ActivityType { get; set; }
        public string Date { get; set; }
        public int ClaimSID { get; set; }
        public int sortorder { get; set; }
        public string ClaimNumber { get; set; }
        public string LowestRespCoverageOrder { get; set; }
        public string chargetype { get; set; }
        public float? Amount { get; set; }
        public float? approvedamount { get; set; }
        public string CurrentStatus { get; set; }
        public string patientstatment { get; set; }
        public string procedurecode { get; set; }
        public string description { get; set; }
        public string mod1 { get; set; }
        public string mod2 { get; set; }
        public string mod3 { get; set; }
        public string mod4 { get; set; }
        public string diag1 { get; set; }
        public string diag2 { get; set; }
        public string diag3 { get; set; }
        public string diag4 { get; set; }
        public int ActivityCount { get; set; }
        public int ChargeSID { get; set; }
        public string BalanceStr { get; set; }
        public string AmountStr { get; set; }

    }
}
