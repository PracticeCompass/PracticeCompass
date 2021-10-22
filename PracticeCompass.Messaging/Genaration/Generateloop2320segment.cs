using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2320segment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2320segment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2320_SBR_segment()
        {
            var SBR = new Segment { Name = "SBR", FieldSeparator = FieldSeparator };
            SBR[1] = _unknownplaceholder;
            SBR[2] = "18";
            SBR[3] = _unknownplaceholder;
            SBR[4] = _unknownplaceholder;
            SBR[5] = _unknownplaceholder;
            SBR[9] = _unknownplaceholder;
            return SBR;
        }
        public Segment GenerateLoop2320_CAS_segment()
        {
            var PRV = new Segment { Name = "CAS", FieldSeparator = FieldSeparator };
            PRV[1] = _unknownplaceholder;
            PRV[2] = _unknownplaceholder;
            PRV[3] = _unknownplaceholder;
            PRV[4] = _unknownplaceholder;
            return PRV;
        } 
        public Segment GenerateLoop2320_AMT_segment()
        {
            var AMT = new Segment { Name = "AMT", FieldSeparator = FieldSeparator };
            AMT[1] = _unknownplaceholder;
            AMT[2] = "EAF";
            return AMT;
        }
        public Segment GenerateLoop2320_OI_segment()
        {
            var AMT = new Segment { Name = "OI", FieldSeparator = FieldSeparator };
            AMT[3] = "Y";
            AMT[6] = "Y";
            return AMT;
        } 
        public Segment GenerateLoop2320_MOA_segment()
        {
            var AMT = new Segment { Name = "MOA", FieldSeparator = FieldSeparator };
            AMT[1] = _unknownplaceholder;
            AMT[2] = _unknownplaceholder;
            AMT[3] = _unknownplaceholder;
            return AMT;
        }
    }
}
