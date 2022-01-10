using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;
using System.IO;
using Microsoft.Extensions.Configuration;
using PracticeCompass.Messaging.Parsing;
namespace PracticeCompass.API.Controllers.API
{
    public class ERAController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        private readonly IConfiguration _configuration;
        public ERAController(ITechnoMedicUnitOfWork unitOfWork, IConfiguration configuration)
        {
            this.unitOfWork = unitOfWork;
            this._configuration = configuration;
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
        [HttpGet]
        [Route("api/ERA/ParseClaimReports")]
        public bool ParseClaimReports()
        {
            try
            {
                if (!Directory.Exists(@"C:\PracticeCompas\ParsedClaimReports"))
                {
                    Directory.CreateDirectory(@"C:\PracticeCompas\ParsedClaimReports");
                }
                var reportParser = new ClaimReportsParser();
                string[] files =
                Directory.GetFiles(@"C:\PracticeCompas\Inbound\ClaimReports", "*.txt", SearchOption.AllDirectories);
                for (var f = 0; f < files.Length; f++)
                {
                    var filename = Path.GetFileName(files[f]);
                    var fileText = System.IO.File.ReadAllText(files[f]);
                    var reportData = reportParser.ProcessClaimReport(fileText, "~", "|");
                    unitOfWork.ClaimReportsRepository.ParseClaimReport(reportData);
                    System.IO.File.Move(files[f], Path.Combine(@"C:\PracticeCompas\ParsedClaimReports", filename));
                }
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }

    }
}
