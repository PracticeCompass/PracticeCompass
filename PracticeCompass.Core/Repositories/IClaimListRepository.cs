using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IClaimListRepository : IRepository<LookupCodes>
    {
        List<LookupCodes> PatientTypesGet(string description);
        List<Insurance> PhysicianGet(string sortname,int skip);
        List<Entity> GuarantorGet(string entity,int skip);
        List<Claim> ClaimGridGet(int PatientID, int PracticeID, int PhysicianID, int DOSType, string DOSvalue, string PatientClass, int InsuranceType, int InsuranceID, string BillNumber,string ClaimIcnNumber, int Age, int ClaimValue, string CoverageOrder, string InsuranceStatus, string Batch, int GuarantorID, bool IncludeCompletedClaims,int Skip,string SortColumn, string SortDirection);
    }
}
