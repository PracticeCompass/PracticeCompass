
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PracticeCompass.API.Models;

namespace PracticeCompass.API.Controllers.API
{
    [Produces("application/json")]
    [Route("api/operator")]
    [Authorize]
    public class OperatorController : Controller
    {
        private readonly AccessRulesModel _accessRules;

        public OperatorController()
        {
        }

        [AllowAnonymous]
        [HttpGet, Route("getAccesses")]
        public IActionResult GetAccesses()
        {
            return this.Json(new { Data = this._accessRules });
        }
    }
}
