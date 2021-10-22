using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class TrendsController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public TrendsController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/Trends/TrendsGet")]
        public List<Trend> TrendsGet(int UserId, string EntityName)
        {
            try
            {
                return unitOfWork.TrendRepository.TrendsGet(UserId, EntityName);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Trend>();
            }
        }
        [HttpGet]
        [Route("api/Trends/TrendsSave")]
        public List<Trend> TrendsSave(string EntityName, int UserID, string EntityValueID)
        {
            try
            {
                return unitOfWork.TrendRepository.TrendsSave(EntityName, UserID, EntityValueID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Trend>();
            }
        }
    }
}
