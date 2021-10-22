using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Enums
{
    public enum PayerIdentifierType
    {
        BlueCrossBlueShieldPlanCode, // AD
        FederalTaxPayerId, // FI
        NaicId, // NI;
        PayerIdentification, // PI
        PharmacyProcessorNumber, // PP
        MedicareMedicaidPlanId, // XV
        None, // Default
    }
}
