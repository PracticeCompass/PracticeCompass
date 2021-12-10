using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class FileManagerController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public FileManagerController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/FileManager/filesGet")]
        public List<ERAFileManager> filesGet(string fileName, string Notes,bool? isprocessed,DateTime? fileDate)
        {
            try
            {
                return unitOfWork.ERAFileManagerRepository.filesGet(fileName, Notes, isprocessed, fileDate);
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ERAFileManager>();
            }
        }
        [HttpGet]
        [Route("api/FileManager/ProcessFile")]
        public bool ProcessFile(string fileName, bool isprocessed)
        {
            try
            {
                unitOfWork.ERAFileManagerRepository.ProcessFile(fileName, isprocessed);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/FileManager/AddFileNotes")]
        public bool AddFileNotes(string fileName, string notes)
        {
            try
            {
                unitOfWork.ERAFileManagerRepository.AddFileNotes(fileName, notes);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/FileManager/GetFileContent")]
        public string GetFileContent(string path)
        {
            try
            {
                var fileName = unitOfWork.ERAFileManagerRepository.GetFileContent(path);
                return fileName;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return "";
            }
        }

    }
}
