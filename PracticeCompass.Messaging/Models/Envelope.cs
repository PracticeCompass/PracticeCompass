using System.Collections.Generic;
using PracticeCompass.Messaging.Enums;

namespace PracticeCompass.Messaging.Models
{
    public class Envelope
    {
        public EnvelopeType EnvelopeType { set; get; }

        public Segment TrailerSegment { set; get; }
        public Segment HeaderSegment { set; get; }
        public string SegmentSeparator { set; get; }
        public List<Segment> Segments { set; get; }
        public List<Envelope> NestedEnvelopes { set; get; }

        public Envelope()
        {
            this.HeaderSegment = new Segment();
            this.TrailerSegment = new Segment();
            this.Segments = new List<Segment>();
            this.NestedEnvelopes = new List<Envelope>();
            this.SegmentSeparator = "~";
        }
        public string GenerateMessage()
        {
            string val = string.Empty;
            if (this.HeaderSegment != null)
            {
                val += this.HeaderSegment.GenerateMessage();
            }
            if (this.Segments != null && this.Segments.Count > 0)
            {
                for (int i = 0; i < this.Segments.Count; i++)
                {
                    val += string.Format("{0}{1}", val == string.Empty ? "" : this.SegmentSeparator, this.Segments[i].GenerateMessage());
                }
            }
            if (this.NestedEnvelopes != null && this.NestedEnvelopes.Count > 0)
            {
                for (int i = 0; i < this.NestedEnvelopes.Count; i++)
                {
                    val += string.Format("{0}{1}", val == string.Empty ? "" : this.SegmentSeparator, this.NestedEnvelopes[i].GenerateMessage());
                }
            }
            if (this.TrailerSegment != null)
            {
                val += string.Format("{0}{1}", val == string.Empty ? "" : this.SegmentSeparator, this.TrailerSegment.GenerateMessage());
            }
            return val;
        }
    }
}
