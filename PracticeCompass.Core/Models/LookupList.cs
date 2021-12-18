using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class LookupList
    {
        public LookupList()
        {
        }
        #region Generated Properties
        public string LookupType { get; set; }
        public string LookupCode { get; set; }
        public int order { get; set; }
        public string description { get; set; }
        public string RecordStatus { get; set; }
        public bool IsAdd { get; set; }
        public string gridId { get; set; }

        #endregion
    }
}
