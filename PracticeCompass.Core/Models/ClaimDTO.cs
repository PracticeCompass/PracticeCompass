namespace PracticeCompass.Core.Models
{
    public class ClaimDTO
    {
        public string GridID { get; set; }
        public string ClaimSID { get; set; }
        public string PatientID { get; set; }
        public string ClaimNumber { get; set; }
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
