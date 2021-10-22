using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2310Asegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2310Asegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2310A_NM1_segment()
        {
            var Nm1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            Nm1[1] = "DN";
            Nm1[2] = "1"; 
            Nm1[3] = _claimMessageModel.RefLastName;
            Nm1[4] = _claimMessageModel.RefFirstName;
            Nm1[5] = _claimMessageModel.MiddleName;
            Nm1[8] = "XX";  
            Nm1[9] = _claimMessageModel.RefNPI;
            return Nm1;
        }
    }
}
