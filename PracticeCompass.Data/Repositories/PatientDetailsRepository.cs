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
using Z.Dapper.Plus;

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
        public bool InActiveInsurance(int PlanID, string PolicyNumber, int CoverageOrder)
        {
            string sql = "select * from PolicyMember where PlanID=@PlanID and PolicyNumber=@PolicyNumber and CoverageOrder=@CoverageOrder";
            var PolicyMemberResults = this.db.QueryMultiple(sql, new { PlanID = PlanID, PolicyNumber= PolicyNumber, CoverageOrder= CoverageOrder });
            var PolicyMember = PolicyMemberResults.Read<PolicyMember>().FirstOrDefault();
            if(PolicyMember != null)
            {
                PolicyMember.RecordStatus= PolicyMember.RecordStatus == "A" ? "I" : "A";
                this.db.BulkUpdate(PolicyMember);
            }
            return true;
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
        public bool InsuranceDetailsUpdate(InsuranceDetails insuranceDetails)
        {
           string sql = "select * from PolicyMember where  convert(varchar, PlanID, 10) + convert(varchar, PolicyMember.CoverageOrder, 10) + convert(varchar, PolicyMember.PolicyNumber, 10) = @gridId";
            var PolicyMemberResults = this.db.QueryMultiple(sql, new { gridId = insuranceDetails.GridID});
            var PolicyMember = PolicyMemberResults.Read<PolicyMember>().FirstOrDefault();
            if (PolicyMember != null)
            {
                PolicyMember.PlanID = insuranceDetails.PlanID;
                PolicyMember.PolicyNumber = insuranceDetails.PolicyNumber;
                //PolicyMember.=insuranceDetails.groupNumber;
                //PolicyMember.insuredID=insuranceDetails.insuredID;
                //PolicyMember.insured=insuranceDetails.insured;
                PolicyMember.RelationToSub=insuranceDetails.relationToSub;
                this.db.BulkUpdate(PolicyMember);
            }
            return true;
        }

        public bool PatientDetailsUpdate(PatientDetails patientDetails)
        {
            var data = this.db.QueryMultiple("uspPatientDetailsUpdate", new {
                @PatientID= patientDetails.PatientID,
                @DNLastName= patientDetails.DNLastName,
                @DNFirstName= patientDetails.DNFirstName,
                @DNMiddleName= patientDetails.DNMiddleName,
                @DNNameSuffix= patientDetails.DNNameSuffix,
                @StateCode= patientDetails.StateCode,
                @City = patientDetails.City,
                @GenderCode = patientDetails.GenderCode,
                @PracticeCode= patientDetails.PracticeCode,
                @Address1= patientDetails.Address1,
                @Address2= patientDetails.Address2,
                @DNDOB= patientDetails.DNDOB,
                @MaritalStatusCode= patientDetails.MaritalStatusCode,
                @Zip= patientDetails.Zip,
                @DNSSN= patientDetails.DNSSN,
                @HomePhone= patientDetails.HomePhone,
                @WorkPhone= patientDetails.WorkPhone,
                @WorkPhoneExt= patientDetails.WorkPhoneExt,
                @MobilePhone= patientDetails.MobilePhone,
                @userID = 0


            }, commandType: CommandType.StoredProcedure);
            return true;
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
