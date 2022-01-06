using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ApplyPaymentModel
    {
        public int? ChargeSID { get; set; }
        public int PaymentSID { get; set; }
        public int PayorID { get; set; }
        public decimal? AmountPaid { get; set; }
        public decimal? Adjustment { get; set; }
        public string PaymentType { get; set; } // G : Patient , I Insurace 
        public int? PlanID { get; set; }
        public decimal PaymentRemaining { get; set; }
        public decimal? ApprovedAmount { get; set; }
        public decimal? deductibleApplied { get; set; }
        public decimal? copayAmount { get; set; }
        public bool? GoToNext { get; set; }
        public string PolicyNumber { get; set; }
        public List<ChargeAdjustment> ChargeAdjustments { get; set; }
    }

    public class ChargeAdjustment
    {
        public int chargeSid { get; set; }
        public int claimSid { get; set; }
        public int planId { get; set; }
        public decimal? adjustmentAmount { get; set; }
        public string claimAdjustmentGroupCode { get; set; }
        public string adjustmentReasonCode { get; set; }
        public bool isAdd { get; set; }
        public bool isDelete { get; set; }
        public bool isEdit { get; set; }
        public string gridId { get; set; }
    }
}
