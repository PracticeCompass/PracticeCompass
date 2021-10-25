using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
   public class Provider
    {

        public string LastName { set; get; }
        public string FirstName { set; get; }
        public string MiddleName { set; get; }
        public string Suffix { set; get; }
        public string NPI { set; get; }
        public string IDCodeQualifier { set; get; }
        public List<ProviderSecIdentifier> SecondaryIdentifiers { set; get; }
        public Provider()
        {
            this.LastName = string.Empty;
            this.FirstName = string.Empty;
            this.MiddleName = string.Empty;
            this.Suffix = string.Empty;
            this.NPI = string.Empty;
            this.SecondaryIdentifiers = new List<ProviderSecIdentifier>();
        }
    }
}
