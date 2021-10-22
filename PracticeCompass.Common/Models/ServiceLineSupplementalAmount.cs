using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class ServiceLineSupplementalAmount
    {
        public ServiceSuplementalAmountType Type { set; get; }
        public decimal Amount { set; get; }

        public ServiceLineSupplementalAmount()
        {
            this.Type = ServiceSuplementalAmountType.None;
            this.Amount = 0;
        }
    }
}
