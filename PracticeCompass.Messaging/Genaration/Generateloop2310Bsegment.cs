using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2310Bsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2310Bsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2310B_NM1_segment()
        {
            var Nm1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            Nm1[1] = "82";
            Nm1[2] = "1";
            Nm1[3] = _claimMessageModel.renderingLastName;
            Nm1[4] = _claimMessageModel.renderingFirstName;
            Nm1[5] = _claimMessageModel.renderingMiddleName;
            Nm1[7] = _claimMessageModel.renderingSuffix;
            Nm1[8] = "XX";  
            Nm1[9] = _claimMessageModel.renderingNPI;
            return Nm1;
        }
        public Segment GenerateLoop2310B_PRV_segment()
        {
            var PRV = new Segment { Name = "PRV", FieldSeparator = FieldSeparator };
            PRV[1] = "PE";
            PRV[2] = "PXC";
            PRV[3] = _claimMessageModel.renderingTaxonomy;
            return PRV;
        }
    }
}
