using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PracticeCompass.API.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using System;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class LookupController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public LookupController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("api/Lookup/LookupTypeGet")]
        public List<LookupType> LookupTypeGet(string search)
        {
            try
            {
                List<LookupType> Result = unitOfWork.lookupRepository.LookupTypeGet(search);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupType>();
            }
        }
        [HttpGet]
        [Route("api/Lookup/LookupCodeGet")]
        public List<LookupList> LookupCodeGet(LookupGrid searchCriteria)
        {
            try
            {

                if (searchCriteria.LookupType == null)
                    searchCriteria.LookupType = "";
                if (searchCriteria.lookupCode == null)
                    searchCriteria.lookupCode = "";
                if (searchCriteria.IsActive == null)
                    searchCriteria.IsActive = "";

                List<LookupList> Result = unitOfWork.lookupRepository.LookupCodeGet(searchCriteria.LookupType, searchCriteria.IsActive, searchCriteria.lookupCode);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupList>();
            }
        }
        [HttpGet]
        [Route("api/Lookup/AddLookupCode")]
        public bool AddLookupCode(LookupList lookup)
        {
            try
            {
                if (lookup.LookupType == null || lookup.LookupCode == null || lookup.RecordStatus == null) return false;
                bool Result = unitOfWork.lookupRepository.AddLookupCode(lookup);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/Lookup/AddLookupType")]
        public bool AddLookupType(LookupType lookup)
        {
            try
            {
                if (lookup.lookupType == null || lookup.Class == null || lookup.description == null) return false;
                bool Result = unitOfWork.lookupRepository.AddLookupType(lookup);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        

    }
}
