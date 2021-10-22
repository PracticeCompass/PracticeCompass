using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PracticeCompass.API.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using System;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class PatientController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public PatientController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/patient/PatientTypesGet")]
        public List<LookupCodes> PatientTypesGet(string description)
        {
            try
            {
                return unitOfWork.PatientRepository.GetPatientTypes(description);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        [HttpGet]
        [Route("api/patient/PracticesGet")]
        public List<Practice> PracticesGet(string sortname)
        {
            try
            {
                return unitOfWork.PatientRepository.GetPractices(sortname);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Practice>();
            }
        }
        [HttpGet]
        [Route("api/patient/PatientsGridGet")]
        public List<Patient> PatientsGridGet(PatientGrid searchCriteria)
        {
            try
            {
                
                if (searchCriteria.PatientClass == null)
                    searchCriteria.PatientClass = "";
                if (searchCriteria.SortColumn == null)
                    searchCriteria.SortColumn = "";
                if (searchCriteria.SortDirection == null)
                    searchCriteria.SortDirection = "";
                List<Patient> Result = unitOfWork.PatientRepository.PatientsGridGet(searchCriteria.PatientID, searchCriteria.PracticeID, searchCriteria.PatientClass, searchCriteria.BalanceType, searchCriteria.BalanceValue, searchCriteria.InsuranceType, searchCriteria.InsurancID,searchCriteria.NoBalancePatients, searchCriteria.Skip, searchCriteria.SortColumn, searchCriteria.SortDirection);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Patient>();
            }
        }
        [HttpGet]
        [Route("api/patient/PatientsListGet")]
        public List<PatientLookup> PatientsListGet(string FirstName, string LastName,string AccountNumber, string PersonNumber,int DOBType, string DOB,int Skip)
        {
            try
            {
                if (DOB == null) DOB = "";
                if (AccountNumber == null) AccountNumber = "";
                if (PersonNumber == null) PersonNumber = "";
                if (FirstName == null) FirstName = "";
                if (LastName == null) LastName = "";

                return unitOfWork.PatientRepository.GetPatientsList(FirstName, LastName, DOB, AccountNumber, PersonNumber,DOBType, Skip);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PatientLookup>();
            }
        }
        [HttpGet]
        [Route("api/patient/InsurancesGet")]
        public List<Insurance> InsurancesGet(string sortName,int skip)
        {
            try
            {
                return unitOfWork.PatientRepository.GetInsurances(sortName, skip);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Insurance>();
            }
        }

    }
}
