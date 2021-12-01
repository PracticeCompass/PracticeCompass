using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class TransferTo
    {
        public string Name { set; get; }
        public string Qualifier { set; get; }
        public string Identifier { set; get; }
        public TransferTo()
        {
            this.Name = string.Empty;
            this.Qualifier = string.Empty;
            this.Identifier = string.Empty;
        }
    }
}
