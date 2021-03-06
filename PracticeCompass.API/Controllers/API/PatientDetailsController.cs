using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class PatientDetailsController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public PatientDetailsController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/PatientDetails/PhysicianGet")]
        public List<Insurance> PhysicianGet(string sortName,int skip)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.PhysicianGet(sortName, skip);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Insurance>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/CountryStateGet")]
        public List<CountryState> CountryStateGet(string stateName)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.CountryStateGet(stateName);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<CountryState>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/GenderGet")]
        public List<LookupCodes> GenderGet(string description)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.GenderGet(description);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        
        [HttpGet]
        [Route("api/PatientDetails/RelationGet")]
        public List<LookupCodes> RelationGet(string description)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.RelationGet(description);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/MaritalStatusGet")]
        public List<LookupCodes> MaritalStatusGet(string description)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.MaritalStatusGet(description);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/PatientTypesGet")]
        public List<LookupCodes> PatientTypesGet(string description)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.PatientTypesGet(description);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/companiesGet")]
        public List<Carrier> companiesGet(string sortName,int skip)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.CompaniesGet(sortName, skip);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Carrier>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/PlanTypesGet")]
        public List<LookupCodes> PlanTypesGet(string description)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.PlanTypesGet(description);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/InsuranceTypesGet")]
        public List<LookupCodes> InsuranceTypesGet(string description)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.InsuranceTypesGet(description);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/InsuranceGridGet")]
        public List<InsuranceGrid> InsuranceGridGet(int PersonID)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.InsuranceGridGet(PersonID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<InsuranceGrid>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/GuarantorInfoGet")]
        public InsuranceGrid GuarantorInfoGet(int PersonID)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.GuarantorInfoGet(PersonID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new InsuranceGrid();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/PlanInfoGet")]
        public InsuranceGrid PlanInfoGet(int PlanId)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.PlanInfoGet(PlanId);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new InsuranceGrid();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/inActiveInsurance")]
        public bool InActiveInsurance(int PlanID, string PolicyNumber, int CoverageOrder)
        {
            try
            {
                return unitOfWork.PatientDetailsRepository.InActiveInsurance(PlanID, PolicyNumber, CoverageOrder);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/PatientDetailsGet")]
        public List<PatientDetails> PatientDetailsGet(int PersonID, int PracticeID)
        {
            try
            {
                List<PatientDetails> Result = unitOfWork.PatientDetailsRepository.PatientDetailsGet(PersonID, PracticeID);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PatientDetails>();
            }
        }

        [HttpGet]
        [Route("api/PatientDetails/LedgerDataGet")]
        public List<LedgerData> LedgerDataGet(int PersonID)
        {
            try
            {
                var LedgerData = unitOfWork.PatientDetailsRepository.LedgerDataGet(PersonID);
                float TotalAmount = 0;
                foreach (var row in LedgerData)
                {
  
                    row.AmountStr = row.Amount == null? "" : row.Amount.ToString();
                    if (row.ActivityType == "Charge Details")
                    {
                        TotalAmount = row.Amount == null? 0 : row.Amount.Value;
                    }
                    if(row.ActivityType == "Txn")
                    {
                        row.BalanceStr = (TotalAmount + (row.Amount == null ? 0 : row.Amount.Value)).ToString();
                        TotalAmount = TotalAmount +( row.Amount == null ? 0 : row.Amount.Value);
                    }

                }
                return LedgerData;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LedgerData>();
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/PatientDetailsUpdate")]
        public bool PatientDetailsUpdate(PatientDetails patientDetails)
        {
            try
            {
                bool Result = unitOfWork.PatientDetailsRepository.PatientDetailsUpdate(patientDetails);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/PatientDetails/InsuranceDetailsUpdate")]
        public bool InsuranceDetailsUpdate(InsuranceDetails insuranceDetails)
        {
            try
            {
                bool Result = unitOfWork.PatientDetailsRepository.InsuranceDetailsUpdate(insuranceDetails);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }

    }
}
