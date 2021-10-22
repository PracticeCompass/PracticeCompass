using System;
using System.Collections.Generic;
using System.Text;
using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class ClaimAdjustment
    {
        //public AdjustmentType Type { set; get; }
        public string Type { set; get; }
        public List<AdjustmentModel> AdjustmentModel { set; get; }

        public ClaimAdjustment()
        {
            this.Type = "";//AdjustmentType.None;
            this.AdjustmentModel = new List<AdjustmentModel>();
        }
    }
}
