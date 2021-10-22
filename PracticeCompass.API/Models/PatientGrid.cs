namespace PracticeCompass.API.Models
{
    public class PatientGrid
    {
        public int PatientID { get; set; }
        public int PracticeID { get; set; }
        public string PatientClass { get; set; }
        public int BalanceType { get; set; }
        public float BalanceValue { get; set; }
        public int InsuranceType { get; set; }
        public int InsurancID { get; set; }
        public bool NoBalancePatients { get; set; }
        public int Skip { get; set; }
        public string SortColumn { get; set; }
        public string SortDirection { get; set; }
    }
}
