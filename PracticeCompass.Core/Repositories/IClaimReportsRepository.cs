using PracticeCompass.Common.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IClaimReportsRepository : IRepository<PlanClaimStatus>
    {
        bool ParseClaimReport(ClaimReportModel claimReportModel);
    }
}
