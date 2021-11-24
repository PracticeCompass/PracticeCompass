using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PracticeCompass.API.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using System;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class PlanController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public PlanController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("api/plan/PlansGridGet")]
        public List<PlanList> PlansGridGet(PlanGrid searchCriteria)
        {
            try
            {
                
                if (searchCriteria.SortColumn == null)
                    searchCriteria.SortColumn = "";
                if (searchCriteria.SortDirection == null)
                    searchCriteria.SortDirection = "";
                if (searchCriteria.ZIP == null)
                    searchCriteria.ZIP = "";
                List<PlanList> Result = unitOfWork.PlanRepository.PlansGridGet(searchCriteria.PlanID, searchCriteria.ZIP, searchCriteria.Skip, searchCriteria.SortColumn, searchCriteria.SortDirection);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PlanList>();
            }
        }
        [HttpGet]
        [Route("api/plan/PlanDetailsGet")]
        public PlanDetails PlanDetailsGet(int providerId)
        {
            try
            {
                PlanDetails Result = unitOfWork.PlanRepository.PlanDetailsGet(providerId);
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new PlanDetails();
            }
        }

    }
}
