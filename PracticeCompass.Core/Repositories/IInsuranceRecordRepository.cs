using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IInsuranceRecordRepository : IRepository<InsuranceRecord>
    {
        InsuranceRecord GetInsuranceRecord (int PlanId);
       
    }
}
