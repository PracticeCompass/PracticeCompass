using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class ServiceLineSupplementalAmount
    {
        public string Type { set; get; }
        public decimal Amount { set; get; }

        public ServiceLineSupplementalAmount()
        {
            this.Type = string.Empty;
            this.Amount = 0;
        }
    }
}
