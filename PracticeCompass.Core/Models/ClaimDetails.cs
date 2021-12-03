using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ClaimDetails
    {
        public ClaimDetails()
        {
        }

        #region Generated Properties
        public string ClaimNumber { get; set; }
        public string SortName { get; set; }
        public string PracticeName { get; set; }
        public string PracticeID { get; set; }
        public string PatientID { get; set; }
        public string PersonID { get; set; }
        public string PracticeCode { get; set; }
        public int?  StaffID { get; set; }
        public string OriginalCRN { get; set; }
        public int? PCPID { get; set; }
        public string PCPName { get; set; }
        public string StaffName { get; set; }
        public int? CopayAmount { get; set; }
        public int? Adjustments { get; set; }
        public int? PatientPaid { get; set; }
        public float? InsurancePaid { get; set; }
        public float? ClaimTotal { get; set; }
        public float? BillBalance { get; set; }
        public string AccidentRelated { get; set; }
        public string EmploymentRelated { get; set; }
        public string Lastseen { get; set; }
        public string PrimaryStatus { get; set; }
        public string SeconadryStatus { get; set; }
        public string TertiaryStatus { get; set; }
        public string PrimaryBilledDate { get; set; }
        public string SeconadryBilledDate { get; set; }
        public string TertiaryBilledDate { get; set; }


        #endregion

    }
}
