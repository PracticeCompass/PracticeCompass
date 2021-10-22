using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class InsuranceController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public InsuranceController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/Insurance/GetInsuranceRecord")]
        public InsuranceRecord GetInsuranceRecord(int PlanId)
        {
            try
            {
                var insuranceRecord = unitOfWork.InsuranceRecordRepository.GetInsuranceRecord(PlanId);

                return insuranceRecord;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new InsuranceRecord();
            }
        }

    }
}
