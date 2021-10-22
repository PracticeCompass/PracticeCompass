using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2010ABsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2010ABsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            _claimMessageModel = claimMessageModel;
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
        }
        public Segment GenerateLoop2010AB_NM1_segment()
        {
            var NM1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            NM1[1] = "87";
            NM1[2] = _claimMessageModel.ProviderType == "I" ? "1" : "2";
            return NM1;
        }
        public Segment GenerateLoop2010AB_N3_segment()
        {
            var N3 = new Segment { Name = "N3", FieldSeparator = FieldSeparator };
            N3[1] = _claimMessageModel.ProviderLine1;
            N3[2] = _claimMessageModel.ProviderLine2;
            return N3;
        }
        public Segment GenerateLoop2010AB_N4_segment()
        {
            var N4 = new Segment { Name = "N4", FieldSeparator = FieldSeparator };
            N4[1] = _claimMessageModel.ProviderCity;
            N4[2] = _claimMessageModel.ProviderState;
            N4[3] = _claimMessageModel.ProviderZip;
            return N4;
        }

    }
}
