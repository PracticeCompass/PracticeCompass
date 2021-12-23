using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generatetransactionsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generatetransactionsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GeneratetransactionHeader()
        {
            Segment st = new Segment { Name = "ST", FieldSeparator = FieldSeparator };
            st[1] = "837";
            st[2] = "0001";
            st[3] = "005010X222A1";
            return st;
        }
        public Segment GeneratetransactionTrailer()
        {
            Segment se = new Segment { Name = "SE", FieldSeparator = FieldSeparator };
            
            se[1] = _unknownplaceholder;
            se[2] = "0001";
            return se;
        } 
        public Segment GenerateBHTSegment()
        {
            Segment bht = new Segment { Name = "BHT", FieldSeparator = FieldSeparator };
            bht[1] = "0019";  
            bht[2] =  "00";
            bht[3] = _unknownplaceholder;
            bht[4] = DateTime.Now.ToString("yyyyMMdd");
            bht[5] = DateTime.Now.ToString("HHMM");
            bht[6] = "CH";
            return bht;
        }
    }
}
