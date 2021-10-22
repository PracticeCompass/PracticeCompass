using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class ProviderSecIdentifier
    {
        public ProviderSecIdentifierType Type { set; get; }
        public string Identifier { set; get; }

        public ProviderSecIdentifier()
        {
            this.Type = ProviderSecIdentifierType.None;
            this.Identifier = string.Empty;
        }
    }
}
