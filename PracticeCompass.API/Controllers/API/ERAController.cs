using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class ERAController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public ERAController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/ERA/GetFiles")]
        public List<FileModel> GetFiles()
        {
            try
            {
                var filemodels = unitOfWork.ERATransactionRepository.GetFiles();

                return filemodels;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<FileModel>();
            }
        }

    }
}
