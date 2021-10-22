using System;
using System.Collections.Generic;

namespace PracticeCompass.Common.Models
{
    public class ClaimHeaderGroup
    {
        public string HeaderNumber { set; get; }
        public string ProviderIdentifier { set; get; }
        public string FacilityCode { set; get; }
        public DateTime ProviderFiscalYearEndsOn { set; get; }
        public int ClaimsCount { set; get; }
        public decimal TotalClaimMonetaryValue { set; get; }
        public List<ClaimDetails> ClaimRemittanceAdviceItems { set; get; }
        public ClaimHeaderGroup()
        {
            this.HeaderNumber = string.Empty;
            this.ProviderIdentifier = string.Empty;
            this.FacilityCode = string.Empty;
            this.ProviderFiscalYearEndsOn = new DateTime(1900, 1, 1);
            this.ClaimsCount = 0;
            this.TotalClaimMonetaryValue = 0;
            this.ClaimRemittanceAdviceItems = new List<ClaimDetails>();
        }
    }
}
