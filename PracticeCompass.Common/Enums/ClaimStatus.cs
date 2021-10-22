using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Enums
{
    public enum ClaimStatus
    {
        ProcessedAsPrimary,  // 1
        ProcessedAsSecondary, // 2
        ProcessedAsTertiary, // 3
        Denied, // 4
        ProcessedAsPrimaryAndForwarededToAdditionalPayers, // 19
        ProcessedAsSecondaryAndForwarededToAdditionalPayers, // 20
        ProcessedAsTertiaryAndForwarededToAdditionalPayers, // 21
        ReversalOfPreviousPayment, // 22
        NotOurClaimForwardedToAdditionalPayers, // 23
        PredeterminationPricingOnlyAndNoPayment, // 24
        None, // Default
    }
}
