using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop1000Asegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop1000Asegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop1000A_NM1_segment()
        {
            var Nm1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            Nm1[1] = "41";
            Nm1[2] = "2"; 
            Nm1[3] = _claimMessageModel.PracticeName;
            Nm1[4] = DateTime.Now.ToString("yyyyMMdd");
            Nm1[5] = DateTime.Now.ToString("HHmm");
            Nm1[8] = "46";  
            Nm1[9] = _claimMessageModel.SenderID;
            return Nm1;
        }
        public Segment GenerateLoop1000A_PER_segment()
        {
            var Per = new Segment { Name = "PER", FieldSeparator = FieldSeparator };
            Per[1] = "IC";
            Per[2] = _claimMessageModel.PracticeContact;
            Per[3] = "TE";  
            Per[4] = _claimMessageModel.PracticePhone;
            //Per[5] = "EX";  
            //Per[6] = _unknownplaceholder;
            //Per[7] = "EM";
            //Per[8] = _unknownplaceholder;
            return Per;
        }
    }
}
