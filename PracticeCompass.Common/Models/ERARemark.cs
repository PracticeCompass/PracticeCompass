namespace PracticeCompass.Common.Models
{
    public class ERARemark
    {
        public string Code { set; get; }
        public string Description { set; get; }
        public ERARemark()
        {
            this.Code = string.Empty;
            this.Description = string.Empty;
        }
    }
}
