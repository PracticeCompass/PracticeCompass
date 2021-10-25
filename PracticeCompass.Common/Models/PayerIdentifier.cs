namespace PracticeCompass.Common.Models
{
    public class PayerIdentifier
    {
        public string Name { set; get; }
        public string IDCode { set; get; }
        public string ContactFunctionCode { set; get; }
        public string ClaimContactName { set; get; }
        public string CommunicationsNbrQualifier { set; get; }
        public string NbrFunctionCode { set; get; }
        public string ClaimContactCommunicationsNbr { set; get; }
        public Address Address { set; get; }
        public PayerIdentifier()
        {
            this.Name = string.Empty;
            this.Address = new Address();
        }

    }
}
