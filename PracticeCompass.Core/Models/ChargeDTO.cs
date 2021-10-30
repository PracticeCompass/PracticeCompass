namespace PracticeCompass.Core.Models
{
    public class ChargeDTO
    {
        public int ChargeSID { get; set; }
        public string FromServiceDate { get; set; }
        public string ProcedureCode { get; set; }
        public string Amount { get; set; }
        public string Mod1 { get; set; }
        public string Mod2 { get; set; }
        public string Diag1 { get; set; }
        public string Diag2 { get; set; }
        public decimal? Units { get; set; }
        public string Prim { get; set; }
        public string SeC { get; set; }
        public string Patient { get; set; }
        public string ProviderName { get; set; }
    }
}
