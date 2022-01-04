using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ChargeAdjustmentDetail
    {
        public ChargeAdjustmentDetail()
        {
        }
        public string gridId { get; set; }
        public int chargeSid { get; set; }
        public int claimSid { get; set; }
        public float AdjustmentAmount { get; set; }
        public string AdjustmentReasonCode { get; set; }
        public string ClaimAdjustmentGroupCode { get; set; }


    }
}
