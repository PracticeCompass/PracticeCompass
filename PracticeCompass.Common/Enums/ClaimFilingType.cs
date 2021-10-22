using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Enums
{
    public enum ClaimFilingType
    {
        PreferredProviderOrganization, // 12
        PointOfService, // 13
        ExclusiveProviderOrganization, // 14
        IndemnityInsurance, // 15
        HealthMaintenanceOrgranizationMedicareRisk, // 16
        DentalMaintenanceOrganization, // 17
        AutomobileMedical, // AM
        Champus, // CH
        CommercialInsurance, // CI
        Disability, // DS
        HealthMaintenanceOrganization, // HM
        LiabilityMedical, // LM
        MedicarePartA, // MA
        MedicarePartB, // MB
        Medicaid, // MC
        OtherFederalProgram, // OF
        TitleV, // TV
        VeteransAffairsPlan, // VA
        WorkersCompensationHealthClaim, // WC
        MutuallyDefined, // ZZ
        None, // Default
    }
}
