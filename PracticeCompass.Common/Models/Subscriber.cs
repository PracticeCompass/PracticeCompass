using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class Subscriber
    {

        public string LastName { set; get; }
        public string FirstName { set; get; }
        public string MiddleName { set; get; }
        public Enums.PatientIdentification Qualifier { set; get; }
        public string Identifier { set; get; }
        public Subscriber()
        {
            this.LastName = string.Empty;
            this.FirstName = string.Empty;
            this.MiddleName = string.Empty;
            this.Qualifier = Enums.PatientIdentification.None;
            this.Identifier = string.Empty;
        }
    }
}
