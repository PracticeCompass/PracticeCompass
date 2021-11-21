namespace PracticeCompass.API.Models
{
    public class PhysicianGrid
    {

        public int ProviderID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int Skip { get; set; }
        public string SortColumn { get; set; }
        public int ZIP { get; set; }
        public string PositionCode { get; set; }
        public string SortDirection { get; set; }
    }
}
