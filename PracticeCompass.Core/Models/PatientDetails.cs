using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class PatientDetails
    {
        public int PersonID { get; set; }
        public int PatientID { get; set; }
        public string  DNLastName { get; set; }
        public string DNFirstName { get; set; }
        public string DNMiddleName { get; set; }
        public string DNNameSuffix { get; set; }
        public string PracticeCode { get; set; }
        public string PracticeName { get; set; }
        public string ProviderName { get; set; }
        public int ProviderID { get; set; }
        public string DNDOB { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string StateCode { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string DNSSN { get; set; }
        public string GenderCode { get; set; }
        public string GenderName { get; set; }
        public string MaritalStatusCode { get; set; }
        public string MaritalStatusName { get; set; }
        public string HomePhone { get; set; }
        public string WorkPhone { get; set; }
        public string WorkPhoneExt { get; set; }
        public string MobilePhone { get; set; }
        public string Email { get; set; }
        public string patienttypecode { get; set; }
        public string PatienttypeName { get; set; }
        public float CopayAmount { get; set; }
        public float InsurancePortion { get; set; }
        public float PaidAmount { get; set; }
        public float PatientPortion { get; set; }
        public float TotalDue { get; set; }

    }
}
