using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class ServiceLine
    {
        public MedicalProcedure Procedure { set; get; }
        public decimal BilledMonetaryAmount { set; get; }
        public decimal PaidMonetaryAmount { set; get; }
        public int Units { set; get; }
        public DateTime? DateOfService { set; get; }
        public string ControlNumber { set; get; }
        public List<Provider>RenderingProviders { set; get; }
        public List<ChargeIndustryCode> ChargeIndustryCodes { set; get; }
        public List<ServiceLineSupplementalAmount> ServiceLineSupplementalAmounts { get; set; }
        public List<ClaimAdjustment> Adjustments { set; get; }
        public ServiceLine()
        {
            this.Procedure = new MedicalProcedure();
            this.BilledMonetaryAmount = 0;
            this.PaidMonetaryAmount = 0;
            this.Units = 1;
            this.ControlNumber = string.Empty;
            this.RenderingProviders = new List<Provider>();
            this.Adjustments = new List<ClaimAdjustment>();
            this.ChargeIndustryCodes = new List<ChargeIndustryCode>();
            this.ServiceLineSupplementalAmounts = new List<ServiceLineSupplementalAmount>();
        }
    }
}
