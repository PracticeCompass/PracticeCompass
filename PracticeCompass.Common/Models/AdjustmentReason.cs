using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class AdjustmentReason
    {
        public string IdentifyingCode { set; get; }
        public string Description { set; get; }

        public AdjustmentReason()
        {
            this.IdentifyingCode = string.Empty;
            this.Description = string.Empty;
        }
    }
}
