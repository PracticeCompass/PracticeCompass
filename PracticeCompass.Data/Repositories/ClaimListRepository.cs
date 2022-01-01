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
            bool IncludeCashClaims, bool IncludeVoidedClaims, bool Rejections, bool PastDue, bool Denials, int Skip, string SortColumn, string SortDirection)
        {
            var data = this.db.QueryMultiple("uspClaimGridGet", new
            {
                @PatientID = PatientID,
                @PracticeID = PracticeID,
                @PhysicianID = PhysicianID,
                @DOSType = DOSType,
                @DOSvalue = DOSvalue,
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
                @Rejections = Rejections,
                @PastDue = PastDue,
                @Denials = Denials,
                @Skip = Skip,
                @SortColumn = SortColumn,
                @SortDirection = SortDirection
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<ClaimDTO>().ToList();
        }
    }
}
