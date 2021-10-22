using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class FiltersController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public FiltersController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/Filters/FilterDelete")]
        public bool FilterDelete(int filterId)
        {
            try
            {
                return unitOfWork.FilterRepository.FilterDelete(filterId);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/Filters/FilterInsert")]
        public Filters FilterInsert(string DisplayName, string Body, string Entity, int Order, int userid)
        {
            try
            {
                var filter = new Filters();
                var saved = false;
                var isexist = true;
                if (!unitOfWork.FilterRepository.FilterExist(DisplayName, Entity))
                {
                    saved = unitOfWork.FilterRepository.FilterInsert(DisplayName, Body, Entity, Order, userid);
                    isexist = false;
                }
                filter.saved = saved;
                filter.isExist = isexist;
                return filter;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new Filters();
            }
        }
        [HttpGet]
        [Route("api/Filters/FilterUpdate")]
        public bool FilterUpdate(int filterId, string DisplayName, string Body, string Entity, int Order, int userid)
        {
            try
            {
                return unitOfWork.FilterRepository.FilterUpdate(filterId, DisplayName, Body, Entity, Order, userid);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/Filters/FiltersGet")]
        public List<Filters> FiltersGet(string Entity, string DisplayName)
        {
            try
            {
                return unitOfWork.FilterRepository.FiltersGet(Entity, DisplayName);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Filters>();
            }
        }
    }
}
