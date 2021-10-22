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
    public class PatientRepository : IPatientRepository
    {
        private IDbConnection db;
        public PatientRepository(string connString)

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

        public List<LookupCodes> GetPatientTypes(string description)
        {
            var data = this.db.QueryMultiple("uspPatientTypeGet", new { @description = description }, commandType: CommandType.StoredProcedure);
            return data.Read<LookupCodes>().ToList();
        }
        public List<Practice> GetPractices(string sortname)
        {
            var data = this.db.QueryMultiple("uspPracticeGet", new { @practicename = sortname }, commandType: CommandType.StoredProcedure);
            return data.Read<Practice>().ToList();
        }
        public List<Patient> PatientsGridGet(int PatientID, int practiceID, string PatientClass, int BalanceType, float BalanceValue, int InsuranceType, int InsurancID, bool NoBalancePatients, int skip, string SortColumn, string SortDirection)
        {
            var data = this.db.QueryMultiple("uspPatientGridGet", new
            {
                @PatientID = PatientID,
                @practiceID = practiceID,
                @PatientClass = PatientClass,
                @BalanceType = BalanceType,
                @BalanceValue = BalanceValue,
                @InsuranceType = InsuranceType,
                @InsurancID = InsurancID,
                @NoBalancePatients = NoBalancePatients,
                @Skip = skip,
                @SortColumn = SortColumn,
                @SortDirection = SortDirection
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<Patient>().ToList();
        }
        public List<PatientLookup> GetPatientsList(string firstName, string lastName, string DOB, string accountNumber, string personNumber, int DOBType, int Skip)
        {
            var data = this.db.QueryMultiple("uspPatientPoupGet", new { @FirstName = firstName, @lastName = lastName, @DOB = DOB, @accountNumber = accountNumber, @PersonNumber = personNumber, @DOBType = DOBType, @Skip = Skip }, commandType: CommandType.StoredProcedure);
            return data.Read<PatientLookup>().ToList();
        }
        public List<Insurance> GetInsurances(string sortname, int skip)
        {
            var data = this.db.QueryMultiple("uspInsuranceGet", new { @sortname = sortname, @skip = skip }, commandType: CommandType.StoredProcedure);

            return data.Read<Insurance>().ToList();
        }
        public Task<IEnumerable<LookupCodes>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        //public Task<IEnumerable<LookupCodes>> GetAllAsync(bool trackChanges = false)
        //{
        //    throw new NotImplementedException();
        //}

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
    }
}
