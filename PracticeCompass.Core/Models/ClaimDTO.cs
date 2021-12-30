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
        public string PrimaryStatus_ { get; set; }
        public string SeconadryStatus_ { get; set; }
        public string TertiaryStatus_ { get; set; }
        public string PrimaryClaimStatus { get; set; }
        public string SecondaryClaimStatus { get; set; }
        public string TertiaryClaimStatus { get; set; }
        public int ClaimPastDue { get; set; }
        public int totalCount { get; set; }
        public int Plan1 { get; set; }
        public int Plan2 { get; set; }
        public int Plan3 { get; set; }
    }
}
