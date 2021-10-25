using Microsoft.Extensions.Configuration;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;
using PracticeCompass.Data.Repositories;

namespace PracticeCompass.Data.Common
{
    public class TechnoMedicUnitOfWork : ITechnoMedicUnitOfWork
    {
        private readonly IConfiguration configuration;
        public TechnoMedicUnitOfWork(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public PatientDetailsRepository _PatientDetailsRepository;
        public PatientRepository _PatientRepository;
        public FilterRepository _FilterRepository;
        public ClaimListRepository _ClaimListRepository;
        public TrendRepository _TrendRepository;
        public ClaimDetailsRepository _ClaimDetailsRepository;
        public ChargeDetailsRepository _ChargeDetailsRepository;
        public ClaimSubmitRepository _ClaimSubmitRepository;
        public AuditLogRepositroy _AuditLogRepositroy;
        public GridColumnsRepository _GridColumnsRepository;
        public InsuranceRecordRepository _InsuranceRecordRepository;
        public ERATransactionRepository _ERATransactionRepository;
        public PaymentRepository _PaymentRepository;
        public IPatientDetailsRepository PatientDetailsRepository => _PatientDetailsRepository = _PatientDetailsRepository ??
           new PatientDetailsRepository(configuration.GetConnectionString("PracticeCompass"));
        public IPatientRepository PatientRepository => _PatientRepository = _PatientRepository ??
          new PatientRepository(configuration.GetConnectionString("PracticeCompass"));
        public IFilterRepository FilterRepository => _FilterRepository = _FilterRepository ??
          new FilterRepository(configuration.GetConnectionString("PracticeCompass"));
        public IClaimListRepository ClaimListRepository => _ClaimListRepository = _ClaimListRepository ??
          new ClaimListRepository(configuration.GetConnectionString("PracticeCompass"));
        public ITrendRepository TrendRepository => _TrendRepository = _TrendRepository ??
          new TrendRepository(configuration.GetConnectionString("PracticeCompass"));
        public IClaimDetailsRepository ClaimDetailsRepository => _ClaimDetailsRepository = _ClaimDetailsRepository ??
         new ClaimDetailsRepository(configuration.GetConnectionString("PracticeCompass"));
        public IChargeDetailsRepository ChargeDetailsRepository => _ChargeDetailsRepository = _ChargeDetailsRepository ??
         new ChargeDetailsRepository(configuration.GetConnectionString("PracticeCompass"));

        public IClaimSubmitRepository ClaimSubmitRepository => _ClaimSubmitRepository = _ClaimSubmitRepository ??
         new ClaimSubmitRepository(configuration.GetConnectionString("PracticeCompass"));

        public IAuditLogRepositroy AuditLogRepository => _AuditLogRepositroy = _AuditLogRepositroy ??
            new AuditLogRepositroy(configuration.GetConnectionString("PracticeCompass"));
        public IGridColumnsRepository GridColumnsRepository => _GridColumnsRepository = _GridColumnsRepository ??
            new GridColumnsRepository(configuration.GetConnectionString("PracticeCompass"));
        public IERATransaction ERATransactionRepository => _ERATransactionRepository = _ERATransactionRepository ??
            new ERATransactionRepository(configuration.GetConnectionString("PracticeCompass"));
        public IInsuranceRecordRepository InsuranceRecordRepository => _InsuranceRecordRepository = _InsuranceRecordRepository ??
           new InsuranceRecordRepository(configuration.GetConnectionString("PracticeCompass"));

        public IPaymentRepository PaymentRepository => _PaymentRepository = _PaymentRepository ??
            new PaymentRepository(configuration.GetConnectionString("PracticeCompass"));
        
    }
}
