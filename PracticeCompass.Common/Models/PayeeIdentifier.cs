using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
   public class PayeeIdentifier
    {

        public string Name { set; get; }
        public Address Address { set; get; }
        public PayeeIdentifier()
        {
            this.Name = string.Empty;
            this.Address = new Address();
        }
    }
}
