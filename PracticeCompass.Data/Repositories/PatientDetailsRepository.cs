using Dapper;
using Microsoft.Extensions.Configuration;
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
    public class PatientDetailsRepository : IPatientDetailsRepository
    {
        private IDbConnection db;
        public PatientDetailsRepository(string connString)

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
        public List<Insurance> PhysicianGet(string sortname,int skip)
        {
            var data = this.db.QueryMultiple("uspPhysicianGet", new { @sortname = sortname, @Skip = skip }, commandType: CommandType.StoredProcedure);

            return data.Read<Insurance>().ToList();
        }
        public List<CountryState> CountryStateGet(string statename)
        {
            var data = this.db.QueryMultiple("uspCountryStateGet", new { @statename = statename }, commandType: CommandType.StoredProcedure);

            return data.Read<CountryState>().ToList();
        }
        public List<LookupCodes> GenderGet(string description)
        {
            var data = this.db.QueryMultiple("uspGenderGet", new { @description = description }, commandType: CommandType.StoredProcedure);

            return data.Read<LookupCodes>().ToList();
        }
        public List<LookupCodes> RelationGet(string description)
        {
            var data = this.db.QueryMultiple("uspRelationGet", new { @description = description }, commandType: CommandType.StoredProcedure);

            return data.Read<LookupCodes>().ToList();
        }
        public List<LookupCodes> MaritalStatusGet(string description)
        {
            var data = this.db.QueryMultiple("uspMaritalStatusGet", new { @description = description }, commandType: CommandType.StoredProcedure);

            return data.Read<LookupCodes>().ToList();
        }
        public List<LookupCodes> PatientTypesGet(string description)
        {
            var data = this.db.QueryMultiple("uspPatientTypeGet", new { @description = description }, commandType: CommandType.StoredProcedure);
            return data.Read<LookupCodes>().ToList();
        }
        public List<Carrier> CompaniesGet(string sortname,int skip)
        {
            var data = this.db.QueryMultiple("uspInsuranceGet", new { @sortname = sortname,@skip=skip }, commandType: CommandType.StoredProcedure);

            return data.Read<Carrier>().ToList();
        }
        public List<LookupCodes> PlanTypesGet(string description)
        {
            var data = this.db.QueryMultiple("uspPlanTypeGet", new { @description = description }, commandType: CommandType.StoredProcedure);
            return data.Read<LookupCodes>().ToList();
        }
        public List<LookupCodes> InsuranceTypesGet(string description)
        {
            var data = this.db.QueryMultiple("uspInsuranceTypesGet", new { @description = description }, commandType: CommandType.StoredProcedure);
            return data.Read<LookupCodes>().ToList();
        }
        public List<InsuranceGrid> InsuranceGridGet(int PersonID)
        {
            var data = this.db.QueryMultiple("uspInsuranceGridGet", new { @PersonID = PersonID }, commandType: CommandType.StoredProcedure);
            return data.Read<InsuranceGrid>().ToList();
        }
        public List<PatientDetails> PatientDetailsGet(int PersonID, int PracticeID)
        {
            var data = this.db.QueryMultiple("uspPatientDetailsGet", new { @PersonID = PersonID, @PracticeID = PracticeID }, commandType: CommandType.StoredProcedure);
            return data.Read<PatientDetails>().ToList();
        }
        public List<LedgerData> LedgerDataGet(int PersonID)
        {
            var data = this.db.QueryMultiple("uspLedgerGet", new { @PatientID = PersonID }, commandType: CommandType.StoredProcedure);
            return data.Read<LedgerData>().ToList();
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
    }
}
