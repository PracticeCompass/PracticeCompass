﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class ClaimDetailsController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public ClaimDetailsController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/ClaimDetails/ClaimDetailsGet")]
        public List<ClaimDetails> ClaimDetailsGet(int ClaimSID, int PracticeID)
        {
            try
            {
                return unitOfWork.ClaimDetailsRepository.ClaimDetailsGet(ClaimSID, PracticeID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ClaimDetails>();
            }
        }
        [HttpGet]
        [Route("api/ClaimDetails/ClaimNotesGet")]
        public List<ClaimNote> ClaimNotesGet(int ClaimSID)
        {
            try
            {
                return unitOfWork.ClaimDetailsRepository.ClaimNotesGet(ClaimSID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ClaimNote>();
            }
        }
        [HttpGet]
        [Route("api/ClaimDetails/ChargeGridGet")]
        public List<ChargeDTO> ChargeGridGet(int ClaimSID)
        {
            try
            {
                List<ChargeDTO> Charges = new List<ChargeDTO>();
                Charges = unitOfWork.ClaimDetailsRepository.ChargeGridGet(ClaimSID);
                foreach (var charge in Charges)
                {
                    if (charge.SeC == "Active")
                    {
                        charge.Prim = "Done";
                    }
                }
                return Charges;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ChargeDTO>();
            }
        }
        [HttpGet]
        [Route("api/ClaimDetails/ClaimSubmissionHistoryGet")]
        public List<SubmissionHistory> ClaimSubmissionHistoryGet(int ClaimSID)
        {
            try
            {
                return unitOfWork.ClaimDetailsRepository.ClaimSubmissionHistoryGet(ClaimSID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<SubmissionHistory>();
            }
        }
        public bool ClaimDetailsUpdate(ClaimDetails claimDetails, string ClaimSID)
        {
            try
            {
                return unitOfWork.ClaimDetailsRepository.ClaimDetailsUpdate(claimDetails, ClaimSID);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
    }
}
