using System.Collections.Generic;

namespace PracticeCompass.Messaging.Models
{
    public class Message
    {
        public List<Envelope> Envelopes { set; get; }
        public char SegmentTerminator { get; set; }
        public char ElementSeparator { get; set; }
        public char RepetitionSeparator { get; set; }
        public List<Segment> Segments { get; set; }

        public Message()
        {
            this.Envelopes = new List<Envelope>();
            this.Segments = new List<Segment>();
            this.RepetitionSeparator = ':';
        }
        public string GenerateMessage()
        {
            string val = string.Empty;
            if (this.Envelopes != null && this.Envelopes.Count > 0)
            {
                for (int i = 0; i < this.Envelopes.Count; i++)
                {
                    val += this.Envelopes[i].GenerateMessage();
                }
                val += this.Envelopes[this.Envelopes.Count - 1].SegmentSeparator;
            }
            return val;
        }
    }
}
