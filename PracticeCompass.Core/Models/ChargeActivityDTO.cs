namespace PracticeCompass.Core.Models
{
    public class ChargeActivityDTO
    {
        public string GridID { get; set; }
        public string ActivityCount { get; set; }
        public string ActivityType { get; set; }
        public string SourceType { get; set; }
        public string PostDate { get; set; }
        public decimal Amount { get; set; }
        public decimal ChargeAmount { get; set; }
        public string DisplayText { get; set; }
        public string AmountValue { get; set; }
        public string ChargeAmountValue { get; set; }
        public string ProcedureCode { get; set; }
    }
}
