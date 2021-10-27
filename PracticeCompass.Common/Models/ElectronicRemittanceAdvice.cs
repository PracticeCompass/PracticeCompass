using System;
using System.Collections.Generic;

namespace PracticeCompass.Common.Models
{
    public class ElectronicRemittanceAdvice
    {
        public InterchangeData Interchangedata { set; get; }
        public FinancialInformation financialInformation { set; get; }
        public DateTime ProductionDate { set; get; }
        public PayerIdentifier Payer { set; get; }
        public PayeeIdentifier Payee { set; get; }
        public List<ClaimHeaderGroup> ClaimHeaderGroups { set; get; }
        public List<ERAReference> ERAReferences { set; get; }
        public List<ProviderAdjustment> ProviderAdjustments { set; get; }
        public ElectronicRemittanceAdvice()
        {
            this.Interchangedata = new InterchangeData();
            this.financialInformation = new FinancialInformation();
            this.ERAReferences = new List<ERAReference>();
            this.ProductionDate = new DateTime(1900, 1, 1);
            this.Payer = new PayerIdentifier();
            this.Payee = new PayeeIdentifier();
            this.ClaimHeaderGroups = new List<ClaimHeaderGroup>();
            this.ProviderAdjustments = new List<ProviderAdjustment>();
        }
    }
}
