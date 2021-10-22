using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IPatientRepository : IRepository<LookupCodes>
    {
        List<LookupCodes> GetPatientTypes(string description);
        List<Practice> GetPractices(string sortname);
        List<Insurance> GetInsurances(string sortname,int skip);
        List<Patient> PatientsGridGet(int PatientID, int practiceID,  string PatientClass, int BalanceType, float BalanceValue, int InsuranceType, int InsuranceID,bool NoBalancePatients,int skip, string SortColumn, string SortDirection);
        List<PatientLookup> GetPatientsList(string firstName, string lastName, string DOB, string accountNumber, string personNumber, int DOBType,int Skip);
    }
}
