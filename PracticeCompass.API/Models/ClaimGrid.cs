namespace PracticeCompass.API.Models
{
    public class ClaimGrid
    {
        public int PatientID { get; set; }
        public int PracticeID { get; set; }
        public int PhysicianID { get; set; }
        public int DOSType { get; set; }
        public string DOSvalue { get; set; }
        public string PatientClass { get; set; }
        public int InsuranceType { get; set; }
        public int InsuranceID { get; set; }
        public string BillNumber { get; set; }
        public string ClaimIcnNumber { get; set; }
        public int ClaimValue { get; set; }
        public int Age { get; set; }
        public string CoverageOrder { get; set; }
        public string InsuranceStatus { get; set; }
        public string Batch { get; set; }
        public int GuarantorID { get; set; }
        public bool IncludeCompletedClaims { get; set; }
        public bool IncludeCashClaims { get; set; }
        public bool IncludeVoidedClaims { get; set; }
        public int Skip { get; set; }
        public string SortColumn { get; set; }
        public string SortDirection { get; set; }

    }
}
