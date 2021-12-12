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

    }
}
