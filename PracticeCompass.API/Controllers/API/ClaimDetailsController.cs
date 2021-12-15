using Microsoft.AspNetCore.Mvc;
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
                    if (charge.OutStandingBalance > 0)
                    {
                        switch (charge.RespCoverageOrder)
                        {
                            case 1:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "BILLED";
                                break;
                            case 2:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "DENIED";
                                if (charge.Plan2 != null && charge.Plan2 != 0)
                                    charge.SeC = "PAID";
                                else if (charge.Plan2 == null || charge.Plan2 == 0)
                                    charge.SeC = "BILLED";
                                break;
                            case 99:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "DENIED";
                                if (charge.Plan2 != null && charge.Plan2 != 0)
                                    charge.SeC = "PAID";
                                else if (charge.Plan2 == null || charge.Plan2 == 0)
                                    charge.SeC = "DENIED";
                                if (charge.PatientPaid != null && charge.PatientPaid != 0)
                                    charge.Patient = "PAID";
                                else if (charge.PatientPaid == null || charge.PatientPaid == 0)
                                    charge.Patient = "BILLED";
                                break;
                            default:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "DENIED";
                                if (charge.Plan2 != null && charge.Plan2 != 0)
                                    charge.SeC = "PAID";
                                else if (charge.Plan2 == null || charge.Plan2 == 0)
                                    charge.SeC = "DENIED";
                                if (charge.PatientPaid != null && charge.PatientPaid != 0)
                                    charge.Patient = "PAID";
                                else if (charge.PatientPaid == null || charge.PatientPaid == 0)
                                    charge.Patient = "";
                                break;
                        }
                    }
                    else
                    {
                        switch (charge.RespCoverageOrder)
                        {
                            case 1:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "DENIED";
                                break;
                            case 2:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "DENIED";
                                if (charge.Plan2 != null && charge.Plan2 != 0)
                                    charge.SeC = "PAID";
                                else if (charge.Plan2 == null || charge.Plan2 == 0)
                                    charge.SeC = "DENIED";
                                break;
                            case 99:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "DENIED";
                                if (charge.Plan2 != null && charge.Plan2 != 0)
                                    charge.SeC = "PAID";
                                else if (charge.Plan2 == null || charge.Plan2 == 0)
                                    charge.SeC = "DENIED";
                                if (charge.PatientPaid != null && charge.PatientPaid != 0)
                                    charge.Patient = "PAID";
                                else if (charge.PatientPaid == null || charge.PatientPaid == 0)
                                    charge.Patient = "";
                                break;

                            default:
                                if (charge.Plan1 != null && charge.Plan1 != 0)
                                    charge.Prim = "PAID";
                                else if (charge.Plan1 == null || charge.Plan1 == 0)
                                    charge.Prim = "DENIED";
                                if (charge.Plan2 != null && charge.Plan2 != 0)
                                    charge.SeC = "PAID";
                                else if (charge.Plan2 == null || charge.Plan2 == 0)
                                    charge.SeC = "DENIED";
                                if (charge.PatientPaid != null && charge.PatientPaid != 0)
                                    charge.Patient = "PAID";
                                else if (charge.PatientPaid == null || charge.PatientPaid == 0)
                                    charge.Patient = "";
                                break;
                        }
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
