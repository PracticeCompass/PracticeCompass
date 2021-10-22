namespace PracticeCompass.Common.Models
{
    public class PayerIdentifier
    {
        public string Name { set; get; }
        public Address Address { set; get; }
        public PayerIdentifier()
        {
            this.Name = string.Empty;
            this.Address = new Address();
        }

    }
}
