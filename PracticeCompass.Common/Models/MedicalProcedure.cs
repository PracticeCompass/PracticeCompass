using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class MedicalProcedure
    {
        //public MedicalProcedureCodeType Qualifier { set; get; }
        public string Qualifier { set; get; }
        public string Code { set; get; }
        public string Description { set; get; }
        public string Modifier1 { set; get; }
        public string Modifier2 { set; get; }
        public string Modifier3 { set; get; }
        public string Modifier4 { set; get; }
        public string RevenueCode { get; set; }

        public MedicalProcedure()
        {
            //this.Qualifier = MedicalProcedureCodeType.None;
            this.Qualifier = string.Empty;
            this.Code = string.Empty;
            this.Modifier1 = string.Empty;
            this.Modifier2 = string.Empty;
            this.Modifier3 = string.Empty;
            this.Modifier4 = string.Empty;
            this.RevenueCode = string.Empty;
        }
    }
}
