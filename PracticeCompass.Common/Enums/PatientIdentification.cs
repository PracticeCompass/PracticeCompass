using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Enums
{
    public enum PatientIdentification
    {
        SocialSecurityNumber, // 34
        HealthInsuranceClaimNumber, // HN
        UniqueHealthIdentifier, // II
        MemberIdentificationNumber, // MI
        MedicaidRecipientId, // MR
        FederalTaxPayer, // FI
        None, // Default
    }
}
