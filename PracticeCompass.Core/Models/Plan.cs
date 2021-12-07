using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class Plan
    {
        public string prrowid { get; set; }
        public int PlanID { get; set; }
        public string CarrierCode { get; set; }
        public string Code { get; set; }
        public string SortName { get; set; }
        public string Class { get; set; }
        public float Deductible { get; set; }
        public int CollectionAgingDays { get; set; }
        public int CollectionPriority { get; set; }
        public string ProfileOverrideAllowed { get; set; }
        public string RecordStatus { get; set; }
        public string TimeStamp { get; set; }
        public int LastUser { get; set; }
        public string CreateStamp { get; set; }
        public int CreateUser { get; set; }
        public string PrimaryOnlyEMC { get; set; }
        public string ClaimMemberIDLabel { get; set; }
        public string EDIMemberIDLabel { get; set; }
        public string DNZip { get; set; }
        public int ImportPlanID { get; set; }
        public string FormularyPlanID { get; set; }
        public string BillablePlan { get; set; }
        public string EDIMemberIDEnable { get; set; }
        public string ClaimMemberID2Enable { get; set; }
        public string ClaimMemberID2Label { get; set; }
        public string ClaimMemberID2Qual { get; set; }
        public string FilingCode { get; set; }
        public int DenialMsgCodeProfileID { get; set; }
        public int PayerID { get; set; }
        public string SplitEMCSecAllowed { get; set; }
        public int BillableEMCCoverage { get; set; }
        public string UnbalancedRemit { get; set; }
        public string Pro2SrcPDB { get; set; }
        public DateTime pro2created { get; set; }
        public DateTime pro2modified { get; set; }
    }
}
