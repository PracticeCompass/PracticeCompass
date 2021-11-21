using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class GridColumnsController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public GridColumnsController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/GridColumns/GridColumnsGet")]
        public GridColumn GridColumnsGet(string Name, int UserId)
        {
            try
            {
                var gridColumns = unitOfWork.GridColumnsRepository.GetGridColumns(Name,UserId);

                return gridColumns;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new GridColumn();
            }
        }
        [HttpGet]
        [Route("api/GridColumns/SaveGridColumns")]
        public GridColumn FilterUpdate(string Name, int UserId,string Columns)
        {
            try
            {
                var gridColumns = unitOfWork.GridColumnsRepository.SaveGridColumns(Name,Columns,UserId);

                return gridColumns;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new GridColumn();
            }
        }
        
    }
}
