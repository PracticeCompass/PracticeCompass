using System;

namespace PracticeCompass.Common.Models
{
    public class InterchangeData
    {
        public string SenderIdentifier { set; get; }
        public string ReceiverIdentifier { set; get; }
        public string InterchangeControlId { set; get; }
        public string SenderApplicationCode { set; get; }
        public string ReceiverApplicationCode { set; get; }
        public string GroupControlId { set; get; }

        public InterchangeData()
        {
            this.SenderIdentifier = string.Empty;
            this.ReceiverIdentifier = string.Empty;
            this.InterchangeControlId = string.Empty;
            this.SenderApplicationCode = string.Empty;
            this.ReceiverApplicationCode = string.Empty;
            this.GroupControlId = string.Empty;
        }
    }
}
