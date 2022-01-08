using System;
using System.Collections;

namespace PracticeCompass.Common.Models
{
    public class ClaimMessageModel
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string NameSuffix { get; set; }
        public string Sex { get; set; }
        public string DOB { get; set; }
        public string PersonID { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string City { get; set; }
        public string StateCode { get; set; }
        public string Zip { get; set; }
        //public string ProviderType { get; set; }
        public string ServiceCenterName { get; set; }
        
        public string ServiceCenterLine1 { get; set; }
        public string ServiceCenterLine2 { get; set; }
        public string ServiceCenterCity { get; set; }
        public string ServiceCenterState { get; set; }
        public string ServiceCenterZip { get; set; }
        public string ServiceCenterNPI { get; set; }
        public int CoverageOrder { get; set; }
        public string RelationToSub { get; set; }

        //Payer
        public string PlanName { get; set; }
        public string PlanLine1 { get; set; }
        public string PlanLine2 { get; set; }
        public string PlanZip { get; set; }
        public string PlanCity { get; set; }
        public string PlanState { get; set; }
        public string FilingCode { get; set; }

        //CPT
        public string ProcedureCode { get; set; }
        public string Mod1 { get; set; }
        public string Mod2 { get; set; }
        public string Mod3 { get; set; }
        public string Mod4 { get; set; }

        //charge
        public decimal? ChargeAmount { get; set; }

        public decimal? ChargeTotalAmount { get; set; }
        public string Units { get; set; }
        public string ProcedureEventSID { get; set; }
        //Diagnosis
        public string Diag1 { get; set; }
        public string Diag2 { get; set; }
        public string Diag3 { get; set; }
        public string Diag4 { get; set; }
        public string Order1 { get; set; }
        public string Order2 { get; set; }
        public string Order3 { get; set; }
        public string Order4 { get; set; }
        public string FromServiceDate { get; set; }
        //rendering
        
        public string  renderingLastName { get; set; }
        public string renderingMiddleName { get; set; }
        public string renderingFirstName { get; set; }
        public string renderingSuffix { get; set; }
        public string renderingTaxonomy { get; set; }
        public string renderingNPI { get; set; }
        public int? LowestRespCoverageOrder { get; set; }

        //public string TaxonomyCode { get; set; }

        //Referring
        public string RefLastName { get; set; }
        public string RefFirstName { get; set; }
        public string RefSuffix { get; set; }
        public string RefMiddleName { get; set; }
        public string RefNPI { get; set; }

        //Practice
        public string PracticeName { get; set; }
        public string PracticePhone { get; set; }
        public string PracticeLine1 { get; set; }
        public string PracticeLine2 { get; set; }
        public string PracticeCity { get; set; }
        public string PracticeState { get; set; }
        public string PracticeZip { get; set; }
        public string PracticeContact { get; set; }
        public string PracticeCode { get; set; }
        public string ParcticeTaxonomy { get; set; }
        /// financial
        public string FinancialLine1 { get; set; }
        public string FinancialLine2 { get; set; }
        public string FinancialCity { get; set; }
        public string FinancialState { get; set; }
        public string FinancialZip { get; set; }
        /// </summary>
        public string ReceiverID { get; set; }
        public string SenderID { get; set; }

        public int ChargeSID { get; set; }
        public string ClaimNumber { get; set; }
        public string POSCode { get; set; }
        public string ClaimMemberID { get; set; }
        public int RunNumber { get; set; }
        public string EnvoyPayerID { get; set; }
        //billing provider
        public string BillingProviderType { get; set; }
        public string BillingProviderName { get; set; }
        public string BillingFirstName { get; set; }
        public string BillingLine1 { get; set; }
        public string BillingLine2 { get; set; }
        public string BillingCity { get; set; }
        public string BillingState { get; set; }
        public string BillingZip { get; set; }
        public string BillingNPI { get; set; }
        public string BillingTaxID { get; set; }

        ///
        public decimal? InsuranceReceipts { get; set; }
        public decimal? ApprovedAmount { get; set; }
        public DateTime? PostDate { get; set; }
        public int PlanID { get; set; }
        public string PolicyNumber { get; set; }
        public int ClaimSID { get; set; }
        public string GroupNumber { get; set; }

    }

}
