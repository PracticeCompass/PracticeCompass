using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class Address
    {
        public string Line1 { set; get; }
        public string Line2 { set; get; }
        public string City { set; get; }
        public string State { set; get; }
        public string ZipCode { set; get; }

        public Address()
        {
            this.Line1 = string.Empty;
            this.Line2 = string.Empty;
            this.City = string.Empty;
            this.State = string.Empty;
            this.ZipCode = string.Empty;
        }
    }
}
