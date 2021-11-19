using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PracticeCompass.API.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using System;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class PhysicianController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public PhysicianController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("api/physician/PhysiciansGridGet")]
        public List<Physician> PhysiciansGridGet(PhysicianGrid searchCriteria)
        {
            try
            {
                
                if (searchCriteria.firstName == null)
                    searchCriteria.firstName = "";
                if (searchCriteria.lastName == null)
                    searchCriteria.lastName = "";
                if (searchCriteria.SortColumn == null)
                    searchCriteria.SortColumn = "";
                if (searchCriteria.SortDirection == null)
                    searchCriteria.SortDirection = "";
                List<Physician> Result = unitOfWork.PhysicianRepository.PhysiciansGridGet(searchCriteria.ProviderID, searchCriteria.firstName, searchCriteria.lastName, searchCriteria.ZIP, searchCriteria.Skip, searchCriteria.SortColumn, searchCriteria.SortDirection);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Physician>();
            }
        }

    }
}
