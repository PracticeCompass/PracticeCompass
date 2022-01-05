using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using PracticeCompass.Common.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IClaimListRepository : IRepository<LookupCodes>
    {
        List<LookupCodes> PatientTypesGet(string description);
        List<Insurance> PhysicianGet(string sortname, int skip);
        List<Entity> GuarantorGet(string entity, int skip);
        List<ClaimDTO> ClaimGridGet(int PatientID, int PracticeID, int PhysicianID, int DOSType, string DOSvalue,string ToDOSvalue, string PatientClass, int InsuranceType, int InsuranceID, string BillNumber, string ClaimIcnNumber, int Age, 
            int ClaimValue, string CoverageOrder, string InsuranceStatus, string Batch, int GuarantorID, bool IncludeCompletedClaims, bool IncludeCashClaims, bool IncludeVoidedClaims, bool IncludeRejections, bool IncludePastDue, 
            bool IncludeDenials, bool Rejections, bool PastDue, bool Denials, bool TimelyFilling ,int Skip, string SortColumn, string SortDirection);
        List<LineAdjustments> GetLineAdjustments(int ChargeSID, int PlanID, int ClaimSID, string PolicyNumber);
    }
}
