using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ChargeCoverage
    {
        public string prrowid { get; set; }
        public int ChargeSID { get; set; }
        public int CoverageOrder { get; set; }
        public int PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public int PersonID { get; set; }
        public int ClaimSID { get; set; }
        public int PracticeID { get; set; }
        public int AilmentSID { get; set; }
        public string AssignBenefits { get; set; }
        public string EMCBillable { get; set; }
        public string CurrentStatus { get; set; }
        public string TimeStamp { get; set; }
        public int LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int CreateUser { get; set; }
        public string PreBillBatchCode { get; set; }
        public int PreBillRunNumber { get; set; }
        public int PreBillClaimSID { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime pro2created { get; set; }
        public DateTime pro2modified { get; set; }
    }
}
