using PracticeCompass.Core.Repositories;

namespace PracticeCompass.Core.Common
{
    public interface ITechnoMedicUnitOfWork
    {
        IPatientDetailsRepository PatientDetailsRepository { get; }
        IPatientRepository PatientRepository { get; }
        IClaimListRepository ClaimListRepository { get; }
        IFilterRepository FilterRepository { get; }
        ITrendRepository TrendRepository { get; }
        IClaimDetailsRepository ClaimDetailsRepository { get; }
        IChargeDetailsRepository ChargeDetailsRepository { get; }
        IClaimSubmitRepository ClaimSubmitRepository { get; }
        IAuditLogRepositroy AuditLogRepository { get; }
        IGridColumnsRepository GridColumnsRepository { get; }
        IERATransaction ERATransactionRepository { get; }
        IInsuranceRecordRepository InsuranceRecordRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        IPhysicianRepository PhysicianRepository { get; }
        IPlanRepository PlanRepository { get; }
        IERAPosting ERAPostingRepository { get; }
        IFileManagerRepository ERAFileManagerRepository { get; }
    }
}
