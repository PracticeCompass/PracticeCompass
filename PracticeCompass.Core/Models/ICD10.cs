using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ICD10
    {
        public string DiagnosisCode { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public int totalCount { get; set; }
    }
}
