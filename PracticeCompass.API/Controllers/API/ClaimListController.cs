using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using PracticeCompass.API.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Enum;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;
using PracticeCompass.Messaging.Genaration;
using PracticeCompass.Messaging.Parsing;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace PracticeCompass.API.Controllers.API
{
    public class ClaimListController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        private readonly IConfiguration _configuration;
        public ClaimListController(ITechnoMedicUnitOfWork unitOfWork, IConfiguration configuration)
        {
            this.unitOfWork = unitOfWork;
            this._configuration = configuration;
        }
        [HttpGet]
        [Route("api/ClaimList/PatientTypesGet")]
        public List<LookupCodes> PatientTypesGet(string description)
        {
            try
            {
                return unitOfWork.ClaimListRepository.PatientTypesGet(description);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<LookupCodes>();
            }
        }
        [HttpGet]
        [Route("api/ClaimList/PhysicianGet")]
        public List<Insurance> PhysicianGet(string sortName, int skip)
        {
            try
            {
                return unitOfWork.ClaimListRepository.PhysicianGet(sortName, skip);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Insurance>();
            }
        }
        [HttpGet]
        [Route("api/ClaimList/GuarantorGet")]
        public List<Entity> GuarantorGet(string entity, int skip)
        {
            try
            {
                return unitOfWork.ClaimListRepository.GuarantorGet(entity, skip);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Entity>();
            }
        }
        [HttpGet]
        [Route("api/ClaimList/ClaimGridGet")]
        public List<ClaimDTO> ClaimGridGet(ClaimGrid searchCriteria)
        {
            try
            {
                if (searchCriteria.DOSvalue == null)
                    searchCriteria.DOSvalue = "";
                if (searchCriteria.ToDOSvalue == null)
                    searchCriteria.ToDOSvalue = "";
                if (searchCriteria.PatientClass == null)
                    searchCriteria.PatientClass = "";
                if (searchCriteria.BillNumber == null)
                    searchCriteria.BillNumber = "";
                if (searchCriteria.InsuranceStatus == null)
                    searchCriteria.InsuranceStatus = "";
                if (searchCriteria.CoverageOrder == null)
                    searchCriteria.CoverageOrder = "";
                if (searchCriteria.Batch == null)
                    searchCriteria.Batch = "";
                if (searchCriteria.SortColumn == null)
                    searchCriteria.SortColumn = "";
                if (searchCriteria.SortDirection == null)
                    searchCriteria.SortDirection = "";

                List<ClaimDTO> Result = unitOfWork.ClaimListRepository.ClaimGridGet(searchCriteria.PatientID, searchCriteria.PracticeID,
                    searchCriteria.PhysicianID, searchCriteria.DOSType, searchCriteria.DOSvalue, searchCriteria.ToDOSvalue searchCriteria.PatientClass, searchCriteria.InsuranceType, searchCriteria.InsuranceID,
                    searchCriteria.BillNumber, searchCriteria.ClaimIcnNumber, searchCriteria.Age, searchCriteria.ClaimValue, searchCriteria.CoverageOrder, searchCriteria.InsuranceStatus,
                    searchCriteria.Batch, searchCriteria.GuarantorID, searchCriteria.IncludeCompletedClaims, searchCriteria.IncludeCashClaims, searchCriteria.IncludeVoidedClaims,
                    searchCriteria.Rejections, searchCriteria.PastDue, searchCriteria.Denials, searchCriteria.Skip, searchCriteria.SortColumn, searchCriteria.SortDirection);
                foreach(var claim in Result)
                {
                    if (claim.PrimaryClaimStatus != null)
                    {
                        claim.PrimaryStatus = claim.PrimaryClaimStatus.Split("$$")[0];
                        claim.PrimaryStatus_ = claim.PrimaryClaimStatus.Split("$$")[1];
                    }
                    if (claim.SecondaryClaimStatus != null)
                    {
                        claim.SeconadryStatus = claim.SecondaryClaimStatus.Split("$$")[0];
                        claim.SeconadryStatus_ = claim.SecondaryClaimStatus.Split("$$")[1];
                    }
                    if (claim.TertiaryClaimStatus != null)
                    {
                        claim.TertiaryStatus = claim.TertiaryClaimStatus.Split("$$")[0];
                        claim.TertiaryStatus_ = claim.TertiaryClaimStatus.Split("$$")[1];
                    }
                }
                return Result;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ClaimDTO>();
            }
        }
        [HttpGet]
        [Route("api/ClaimList/SubmitClaims")]
        public bool SubmitClaims(string ClaimSID)
        {
            try
            {
                //List<string> Claims = ClaimSID.Replace("\"", "").Split(",").ToList();
                //Claims.RemoveRange(Claims.Count - 1, 1);
                var X12_837Gen = new X12_837Generator();
                //foreach (var Claim in Claims)
                //{
                    var ClaimMessageModel = unitOfWork.ClaimSubmitRepository.ClaimMessageModelGet(ClaimSID);
                    if (ClaimMessageModel != null)
                    {
                        X12_837Gen.Generate837PMessage(ClaimMessageModel, "~", "*", "XXXX");
                        unitOfWork.AuditLogRepository.AuditLogInsert("", "", 0, 0, "", "Test user", AuditType.New, "Billing", AuditModule.ClaimList, "", string.Format("Claim {0} Submitted", ClaimSID));
                    }

                //}

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
            return true;
        }
        [HttpGet]
        [Route("api/ClaimList/ParseERAMessages")]
        public bool ParseERAMessages()
        {
            try
            {
                unitOfWork.ERAFileManagerRepository.AddFiles();
                var ERAParser = new ERAParser(unitOfWork, this._configuration);
                if (!Directory.Exists(@"C:\PracticeCompas\ParsedERA"))
                {
                    Directory.CreateDirectory(@"C:\PracticeCompas\ParsedERA");
                }
                if (!Directory.Exists(@"C:\PracticeCompas\DebuggingERA"))
                {
                    Directory.CreateDirectory(@"C:\PracticeCompas\DebuggingERA");
                }
                string[] files =
                Directory.GetFiles(@"C:\PracticeCompas\Inbound", "*.ERA", SearchOption.AllDirectories);
                for (var f = 0; f < files.Length; f++)
                {
                    var filename = Path.GetFileName(files[f]);
                    var fileText = System.IO.File.ReadAllText(files[f]);
                    var parseddata = ERAParser.Process835EraMessage(fileText, "~", "*", "<");
                    var parseddatajson = JsonConvert.SerializeObject(parseddata, Formatting.Indented);
                    var debuggerpath = Path.Combine(@"C:\PracticeCompas\DebuggingERA", filename + ".debugging.txt");
                    if (System.IO.File.Exists(debuggerpath))
                    {
                        System.IO.File.Delete(debuggerpath);
                    }
                    System.IO.File.WriteAllText(debuggerpath, parseddatajson);
                    if (System.IO.File.Exists(Path.Combine(@"C:\PracticeCompas\ParsedERA", filename)))
                    {
                        System.IO.File.Delete(Path.Combine(@"C:\PracticeCompas\ParsedERA", filename));
                    }
                    System.IO.File.Move(files[f], Path.Combine(@"C:\PracticeCompas\ParsedERA", filename));
                }
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
            return true;
        }

    }
}
