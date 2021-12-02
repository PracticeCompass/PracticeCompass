using System;
using System.Collections.Generic;

namespace PracticeCompass.Common.Models
{
    public class ElectronicRemittanceAdvice
    {
        public InterchangeData Interchangedata { set; get; }
        public FinancialInformation financialInformation { set; get; }
        public DateTime ProductionDate { set; get; }
        public List<PayerIdentifier> Payer { set; get; }

        public string PayerName { set; get; }
        public string PayerIDCode { set; get; }
        public Address PayerAddress { set; get; }
        public PayeeIdentifier Payee { set; get; }
        public List<ClaimHeaderGroup> ClaimHeaderGroups { set; get; }
        public List<ERAReference> ERAReferences { set; get; }
        public List<ERAReference> ERSPmtPartyReferences { get; set; }
        public List<ProviderAdjustment> ProviderAdjustments { set; get; }
        public ElectronicRemittanceAdvice()
        {
            this.Interchangedata = new InterchangeData();
            this.financialInformation = new FinancialInformation();
            this.ERAReferences = new List<ERAReference>();
            this.ProductionDate = new DateTime(1900, 1, 1);
            this.Payer = new List<PayerIdentifier>();
            this.Payee = new PayeeIdentifier();
            this.ClaimHeaderGroups = new List<ClaimHeaderGroup>();
            this.ProviderAdjustments = new List<ProviderAdjustment>();
            PayerIDCode = "";
            PayerName = "";
            PayerAddress = new Address();
            ERSPmtPartyReferences = new List<ERAReference>();
        }
    }
}
