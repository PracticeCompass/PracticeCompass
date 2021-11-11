using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IPatientDetailsRepository:IRepository<LookupCodes>
    {
        List<Insurance> PhysicianGet(string sortname,int skip);
        List<CountryState> CountryStateGet(string statename);
        List<LookupCodes> GenderGet(string description);
        List<LookupCodes> RelationGet(string description);
        List<LookupCodes> MaritalStatusGet(string description);
        List<LookupCodes> PatientTypesGet(string description);
        List<Carrier> CompaniesGet(string sortname,int CompaniesGet);
        List<LookupCodes> PlanTypesGet(string description);
        List<LookupCodes> InsuranceTypesGet(string description);
        List<InsuranceGrid> InsuranceGridGet(int PersonID);
        List<PatientDetails> PatientDetailsGet(int PersonID,int PracticeID);
        List<LedgerData> LedgerDataGet(int PersonID);
        bool PatientDetailsUpdate(PatientDetails patientDetails);

    }
}
