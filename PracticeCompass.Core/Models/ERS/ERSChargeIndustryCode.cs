﻿using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSChargeIndustryCode
    {

        public string prrowid { set; get; }
        public int? ERSChargeSID { set; get; }
        public string CodeListQualifierCode { set; get; }
        public string IndustryCode { set; get; }
        public string TimeStamp { set; get; }
        public int? LastUser { set; get; }
        public string CreateStamp { set; get; }
        public int? CreateUser { set; get; }
        public string Pro2SrcPDB { set; get; }
        public DateTime? pro2created { set; get; }
        public DateTime? pro2modified { set; get; }
    }
}
