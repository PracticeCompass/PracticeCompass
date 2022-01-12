using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;
using PracticeCompass.Common.Models;

namespace PracticeCompass.Data.Repositories
{
    public class ClaimListRepository : IClaimListRepository
    {
        private IDbConnection db;
        public ClaimListRepository(string connString)

        { this.db = new SqlConnection(connString); }

        public Task AddAsync(LookupCodes entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<LookupCodes> entities)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<LookupCodes, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LookupCodes>> FindAsync(Expression<Func<LookupCodes, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<LookupCodes> FirstOrDefaultAsync(Expression<Func<LookupCodes, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
        public Task<IEnumerable<LookupCodes>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
        public List<LookupCodes> PatientTypesGet(string description)
        {
            var data = this.db.QueryMultiple("uspPatientTypeGet", new { @description = description }, commandType: CommandType.StoredProcedure);
            return data.Read<LookupCodes>().ToList();
        }
        public List<Insurance> PhysicianGet(string sortname, int skip)
        {
            var data = this.db.QueryMultiple("uspPhysicianGet", new { @sortname = sortname, skip }, commandType: CommandType.StoredProcedure);

            return data.Read<Insurance>().ToList();
        }
        public List<Entity> GuarantorGet(string entity, int skip)
        {
            var data = this.db.QueryMultiple("uspGuarantorGet", new { @Entity = entity, @Skip = skip }, commandType: CommandType.StoredProcedure);

            return data.Read<Entity>().ToList();
        }
        public List<LineAdjustments> GetLineAdjustments(int ChargeSID,int PlanID,int ClaimSID,string PolicyNumber)
        {

            var adjSQl = "select ClaimAdjustmentGroupCode as GroupCode,AdjustmentReasonCode as ReasonCode,AdjustmentAmount as Amount from PlanClaimChargeRemitAdj where ChargeSID=@ChargeSID and PlanID=@PlanID and ClaimSID=@ClaimSID and PolicyNumber=@PolicyNumber";
            var lineadjs = this.db.QueryMultiple(adjSQl, new { ChargeSID = ChargeSID, PlanID= PlanID, ClaimSID= ClaimSID, PolicyNumber= PolicyNumber });
            return lineadjs.Read<LineAdjustments>().ToList();

        }
        public void Remove(LookupCodes entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<LookupCodes> entities)
        {
            throw new NotImplementedException();
        }

        public Task<LookupCodes> SingleOrDefaultAsync(Expression<Func<LookupCodes, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public List<ClaimDTO> ClaimGridGet(int PatientID, int PracticeID, int PhysicianID, int DOSType, string DOSvalue,string ToDOSvalue, string PatientClass, int InsuranceType, int InsuranceID, string BillNumber, string ClaimIcnNumber, int Age, int ClaimValue, string CoverageOrder, string InsuranceStatus, string Batch, int GuarantorID, bool IncludeCompletedClaims,
            bool IncludeCashClaims, bool IncludeVoidedClaims, bool Rejections, int PastDue, bool Denials, bool TimelyFilling , int Skip, string SortColumn, string SortDirection)
        {
            if (Rejections || Denials)
            {
                var data = this.db.QueryMultiple("uspClaimGridGetByStatus", new
                {
                    @Skip = Skip,
                    @SortColumn = SortColumn,
                    @SortDirection = SortDirection,
                    @Rejections = Rejections,
                    @PastDue = PastDue,
                    @Denials = Denials,
                    @TimelyFilling = TimelyFilling
                },
                    commandType: CommandType.StoredProcedure);
                return data.Read<ClaimDTO>().ToList();
            }
            else
            {
               var  data = this.db.QueryMultiple("uspClaimGridGet", new
                {
                    @PatientID = PatientID,
                    @PracticeID = PracticeID,
                    @PhysicianID = PhysicianID,
                    @DOSType = DOSType,
                    @DOSvalue = DOSvalue,
                    @ToDOSvalue = ToDOSvalue,
                    @PatientClass = PatientClass,
                    @InsuranceType = InsuranceType,
                    @InsuranceID = InsuranceID,
                    @BillNumber = BillNumber,
                    @ClaimIcnNumber = ClaimIcnNumber,
                    @Age = Age,
                    @InsuranceStatus = InsuranceStatus,
                    @CoverageOrder = CoverageOrder,
                    @TotalClaimAmount = ClaimValue,
                    @Batch = Batch,
                    @GuarantorID = GuarantorID,
                    @IncludeCompletedClaims = IncludeCompletedClaims,
                    @IncludeCashClaims = IncludeCashClaims,
                    @IncludeVoidedClaims = IncludeVoidedClaims,
                    @Skip = Skip,
                    @SortColumn = SortColumn,
                    @SortDirection = SortDirection,
                    @Rejections = Rejections,
                    @PastDue = PastDue,
                    @Denials = Denials,
                    @TimelyFilling = TimelyFilling
                },
                    commandType: CommandType.StoredProcedure);
                return data.Read<ClaimDTO>().ToList();
            }
            
        }
    }
}
