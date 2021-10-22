using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Enums
{
    public enum AdjustmentType
    {
        PatientResponsibility, // PR
        ContractualObligation, // CO
        PayerInitiated, // PI; just expressing payer's opinion without contractual proof available
        OtherAdjustment, // OA
        CorrectionsAndReversals, // CR:
        None, // Default
    }
}
