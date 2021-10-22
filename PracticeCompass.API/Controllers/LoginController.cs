using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PracticeCompass.API.EncryptDecrypt;
using PracticeCompass.Core.Common;

namespace PracticeCompass.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ITechnoMedicUnitOfWork _technoMedicUOW;
        private readonly IMapper _mapper;
        public LoginController(IMapper mapper, ITechnoMedicUnitOfWork technoMedicUOW)
        {
            this._technoMedicUOW = technoMedicUOW;
            this._mapper = mapper;
        }
        [HttpGet]
        public async Task<UserData> Login(string username,string password)

        {
            // var _user= await this._technoMedicUOW.UserRepository.SingleOrDefaultAsync(x => x.UserName == username);
            var userPassword = "Techno$Medic1";
            UserData user = new UserData();
            user.userId = 1;
            user.username = "PracticeCompass";
            user.shortstring = "PracticeCompass";
            if (user != null)
            {
                var encryptedpass = EncryptDecryptEngine.Encrypt(userPassword, "AAECAwQFBgcICQoLDA0ODw==");
                var decryptedpass = EncryptDecryptEngine.Decrypt(encryptedpass, "AAECAwQFBgcICQoLDA0ODw==");
                if (decryptedpass== password)
                {
                    //var _userDefaults = await this._pacsUOW.UserDefaultRepository.FirstOrDefaultAsync(a => a.userId == user.Id);
                    //var UserDefaults = _mapper.Map<UserDefault, UserDefaultDTO>(_userDefaults);
                    //var IsAdmin = UserDefaults.IsAdmin??false;
                    return new UserData { token= GenerateHash (password),userId= user.userId,username= username, shortstring=user.shortstring };                 
                }
            }
            return new UserData {};
        }
        public static string GenerateHash(string sensitiveInfo)
        {
            string hash = "";
            // Convert plain text into a byte array.
            byte[] TextInBytes = Encoding.UTF8.GetBytes(sensitiveInfo);
            SHA256 sha = SHA256Managed.Create();
            TextInBytes = sha.ComputeHash(TextInBytes);
            hash = BitConverter.ToString(TextInBytes);
            return hash;
        }
    }
    public class UserData
    {
        public string username { get; set; }
        public string shortstring { get; set; }
        public int userId { get; set; }
        public string token { get; set; }
    }
}
