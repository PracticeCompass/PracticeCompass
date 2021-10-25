using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
   public class Patient
    {
        public string LastName { set; get; }
        public string FirstName { set; get; }
        public string MiddleName { set; get; }
        public string Suffix { set; get; }
        //public Enums.PatientIdentification Qualifier { set; get; }
        public string Qualifier { set; get; }
        public string Identifier { set; get; }
        public Patient()
        {
            this.LastName= string.Empty;
            this.FirstName = string.Empty;
            this.MiddleName = string.Empty;
            this.Suffix = string.Empty;
            // this.Qualifier = Enums.PatientIdentification.None;
            this.Qualifier = string.Empty;
            this.Identifier = string.Empty;
        }
    }
}
