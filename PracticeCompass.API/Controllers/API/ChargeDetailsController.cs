using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class ChargeDetailsController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public ChargeDetailsController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/ChargeDetails/ChargeActivityGet")]
        public List<ChargeActivityDTO> ChargeActivityGet(int ChargeSID)
        {
            try
            {
                var chargeActivity = unitOfWork.ChargeDetailsRepository.ChargeActivityGet(ChargeSID);
                if (chargeActivity.Count > 0)
                {
                    decimal updatedChargeAmount = chargeActivity.ToList().FirstOrDefault().ChargeAmount;
                    foreach (var charge in chargeActivity)
                    {
                        updatedChargeAmount = updatedChargeAmount + charge.Amount;
                        charge.ChargeAmount = updatedChargeAmount;
                        charge.AmountValue = "$ " + charge.Amount;
                        charge.ChargeAmountValue = "$ " + charge.ChargeAmount;

                    }
                }
                return chargeActivity;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ChargeActivityDTO>();
            }
        }
        [HttpGet]
        [Route("api/ChargeDetails/ChargeDetailsGet")]
        public ChargeDetails ChargeDetailsGet(int ChargeSID)
        {
            try
            {
                return unitOfWork.ChargeDetailsRepository.ChargeDetailsGet(ChargeSID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new ChargeDetails();
            }
        }
        [HttpGet]
        [Route("api/ChargeDetails/ICD10PopupGet")]
        public List<ICD10> ICD10PopupGet(string filter, int skip)
        {
            try
            {
                return unitOfWork.ChargeDetailsRepository.ICD10PopupGet(filter, skip);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ICD10>();
            }
        }
        [HttpGet]
        [Route("api/ChargeDetails/ModifierGet")]
        public List<Modifier> ModifierGet()
        {
            try
            {
                return unitOfWork.ChargeDetailsRepository.ModifierGet();
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Modifier>();
            }
        }
        
        [HttpGet]
        [Route("api/ChargeDetails/CptCodesGet")]
        public List<CPTCode> CptCodesGet(string cptCode)
        {
            try
            {
                return unitOfWork.ChargeDetailsRepository.CptCodesGet(cptCode);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<CPTCode>();
            }
        }
    }
}
