using System;

namespace PracticeCompass.Core.Models.ERS
{
    public  class ERSClaimName
    {
		public string prrowid { set; get; }
		public int? ERSClaimSID { set; get; }
		public string EntityIDCode { set; get; }
		public string IDCodeQualifier { set; get; }
		public string IDCode { set; get; }
		public string EntityTypeQualifier { set; get; }
		public string NameLastOrOrgName { set; get; }
		public string NameFirst { set; get; }
		public string NameMiddle { set; get; }
		public string NameSuffix { set; get; }
		public string TimeStamp { set; get; }
		public int? LastUser { set; get; }
		public string CreateStamp { set; get; }
		public int? CreateUser { set; get; }
		public string Pro2SrcPDB { set; get; }
		public DateTime? pro2created { set; get; }
		public DateTime? pro2modified { set; get; }

	}
}
