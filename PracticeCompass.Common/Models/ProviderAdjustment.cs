using System;
using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class ProviderAdjustment
    {
        public string ProviderIdentifer { set; get; }
        public DateTime FiscalPeriodEndDate { set; get; }
        //public ProviderAdjustmentReason AdjustmentReason { set; get; }
        public string AdjustmentReason { set; get; }
        public string ReferenceIdentification { set; get; }
        public decimal Amount { set; get; }

        public ProviderAdjustment()
        {
            this.ProviderIdentifer = string.Empty;
            this.FiscalPeriodEndDate = new DateTime(1900, 1, 1);
            this.AdjustmentReason = string.Empty;
            this.ReferenceIdentification = string.Empty;
            this.Amount = 0;
        }
    }
}
