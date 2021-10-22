using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace PracticeCompass.API.Extensions
{
    public static class ControllerBaseExtensions
    {
        public static string GetUserName(this ControllerBase controller)
        {
            return controller.User.Identity.Name.Split(new[] { '\\' }).Last();
        }
    }
}
