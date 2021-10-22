using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class InsuranceGrid
    {
        public string GridID { get; set; }
        public int CoverageOrder { get; set; }
        public string PlanName { get; set; }
        public int PlanID { get; set; }
        public string InsuranceTypeName { get; set; }
        public string InsuranceTypeCode { get; set; }
        public string PolicyNumber { get; set; }
        public string plantypecode { get; set; }
        public string PlanTypeName { get; set; }
        public string GroupNumber { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string RelationToSub { get; set; }
        public string RecordStatus { get; set; }
        public string Insured { get; set; }
        public string InsuredID { get; set; }
        public string CompanyName { get; set; }
        public int CarrierID { get; set; }
        //Subscriber info (other)
        public string SubscriberName { get; set; }
        public string ReleationDescription { get; set; }
        public string HomePhone { get; set; }
        public string WorkPhone { get; set; }
        public string MobilePhone { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string StateCode { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }


    }
}
