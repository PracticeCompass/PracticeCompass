using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class Carrier
    {
        public string Name { set; get; }
        public string EdiIdentifier { set; get; }
        public Enums.PayerIdentifierType Qualifier { set; get; }
        public string Identifier { set; get; }
        public Carrier()
        {
            this.Name = string.Empty;
            this.EdiIdentifier = string.Empty;
            this.Qualifier = Enums.PayerIdentifierType.None;
            this.Identifier = string.Empty;
        }
    }
}
