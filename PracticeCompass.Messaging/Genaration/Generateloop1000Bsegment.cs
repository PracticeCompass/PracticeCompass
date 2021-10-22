using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop1000Bsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop1000Bsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop1000B_NM1_segment()
        {
            var Nm1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            Nm1[1] = "40"; 
            Nm1[2] = "2";  
            Nm1[3] = _unknownplaceholder;
            Nm1[8] = "46"; 
            Nm1[9] = _unknownplaceholder;
            return Nm1;
        }
        
    }
}
