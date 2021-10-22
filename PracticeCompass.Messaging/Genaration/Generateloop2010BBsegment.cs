using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2010BBsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2010BBsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2010BB_NM1_segment()
        {
            var NM1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            NM1[1] = "PR";
            NM1[2] = "2";
            NM1[3] = _claimMessageModel.PlanName;
            NM1[8] = "PI";
            NM1[9] = _unknownplaceholder;
            return NM1;
        }
        public Segment GenerateLoop2010BB_N3_segment()
        {
            var N3 = new Segment { Name = "N3", FieldSeparator = FieldSeparator };
            N3[1] = _claimMessageModel.PlanLine1;
            N3[2] = _claimMessageModel.PlanLine2;
            return N3;
        }
        public Segment GenerateLoop2010BB_N4_segment()
        {
            var N4 = new Segment { Name = "N4", FieldSeparator = FieldSeparator };
            N4[1] = _claimMessageModel.PlanCity;
            N4[2] = _claimMessageModel.PlanState;
            N4[3] = _claimMessageModel.PlanZip;
            return N4;
        }

    }
}
