using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Enums
{
    public enum ProviderAdjustmentReason
    {
        LateFiling, // 50
        InterestPenalty, // 51
        AuthorizedReturn, // 72
        EarlyPaymentAllowance, // 90
        OriginationFee, // AH
        ApliedToBorrowerAccount, // AM
        AccelerationOfBenefits, // AP
        Rebate, // B2
        RecoveryAllowance, // B3
        BadDebtAdjustment, // BD
        Bonus, // BN
        TemporaryAllowance, // C5
        CapitationInterest, // CR
        Adjustment, // CS
        CapitationPayment, // CT
        CapitationPassthru, // CV
        CertifiedNurseAnestheticPassthru, // CW
        DirectMedicalEducationPassthru, // DM
        Withholding, // E3
        ForwardingBalance, // FB
        FundAllocation, // FC
        GraduateMedicalEducationPassthru, // GO
        HemophiliaClotingFactorSupplement, // HM
        IncentivePremiumPayment, // IP
        InternalRevenueServiceWithholding, // IR:
        InterimSettlement, // IS
        Nonreimbursable, // J1
        Penalty, // L3
        InterestOwed, // L6
        Levy, // LE
        LumpSum, // LS
        OrganAcquisitionPassthru, // OA
        OffsetForAffiliatedProviders, // OB 
        PeriodicInterimPayment, // PI
        PaymentFinal, // PL
        RetroActivityAdjustment, // RA
        ReturnOnEquity, // RE
        StudentLoadRepayment, // SL
        ThirdPartyLiability, // TL
        OverpaymentRecovery, // WO
        UnspecifiedRecovery, // WU
        None, // Default
    }
}
