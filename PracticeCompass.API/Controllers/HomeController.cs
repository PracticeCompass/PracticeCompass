using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using PracticeCompass.API.Models;

namespace PracticeCompass.API.Controllers
{
    public class HomeController : Controller
    {
        private readonly IOptions<ClientConfig> _clientConfig;

        public HomeController(IOptions<ClientConfig> clientConfig)
        {
            _clientConfig = clientConfig;
        }
        
        public IActionResult Index()
        {
            return File("~/index.html", "text/html");
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Config()
        {
            var settings = new
            {
            };

            return Ok($"window.config = {Newtonsoft.Json.JsonConvert.SerializeObject(settings)}");
        }
    }
}
