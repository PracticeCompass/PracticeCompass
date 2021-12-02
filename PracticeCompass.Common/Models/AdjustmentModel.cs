using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class AdjustmentModel
    {
        public AdjustmentReason Reason { set; get; }
        public decimal MonetaryAmount { set; get; }
        public int? Quantity { set; get; }

        public AdjustmentModel()
        {
            this.Reason = new AdjustmentReason();
            this.MonetaryAmount = 0;
            this.Quantity = null;
        }
    }
}
