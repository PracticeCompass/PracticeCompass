using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Enums
{
    public enum ProviderSecIdentifierType
    {
        StateLicenseNumber, // 0B
        BlueCrossProviderNumber, // 1A
        BlueShieldProviderNumber, // 1B
        MedicareProviderNumber, // 1C
        MedicaidProviderNumber, // 1D
        ProviderUpin, // 1G
        ChampusIdNumber, // 1H
        FacilityIdNumber, // 1J
        PharmacyNumber, // D3
        ProviderCommercialNumber, // G2
        LocationNumber, // LU
        NPI, // HPI
        SSN, // SY
        TIN, // TJ
        None, // Default
    }
}
