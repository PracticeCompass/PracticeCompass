using System;

namespace PracticeCompass.Core.Models.ERS
{
    public class ERSPaymentParty
    {
		public string prrowid { set; get; }
		public int? ERSPaymentSID { set; get; }
		public string EntityIDCode { set; get; }
		public string Name { set; get; }
		public string IDCodeQualifier { set; get; }
		public string IDCode { set; get; }
		public string AddressInfo01 { set; get; }
		public string AddressInfo02 { set; get; }
		public string CityName { set; get; }
		public string StateCode { set; get; }
		public string PostalCode { set; get; }
		public string CountryCode { set; get; }
		public string LocationQualifier { set; get; }
		public string LocationID { set; get; }
		public string TimeStamp { set; get; }
		public int? LastUser { set; get; }
		public string CreateStamp { set; get; }
		public int? CreateUser { set; get; }
		public string Pro2SrcPDB { set; get; }
		public DateTime? pro2created{ set; get; }
		public DateTime? pro2modified { set; get; }
	}
}
