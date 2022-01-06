using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2010AAsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2010AAsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2010AA_NM1_segment()
        {
            var NM1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            NM1[1] = "85";
            NM1[2] = _claimMessageModel.BillingProviderType == "I" ? "1" : "2";
            NM1[3] = _claimMessageModel.BillingProviderName;
            NM1[4] = _claimMessageModel.BillingFirstName;
            NM1[8] = "XX";
            NM1[9] = _claimMessageModel.BillingNPI;
            return NM1;
        }
        public Segment GenerateLoop2010AA_N3_segment()
        {
            var N3 = new Segment { Name = "N3", FieldSeparator = FieldSeparator };
            N3[1] = _claimMessageModel.BillingProviderType == "I" ? _claimMessageModel.BillingLine1: _claimMessageModel.ServiceCenterLine1;
            N3[2] = _claimMessageModel.BillingProviderType == "I" ? _claimMessageModel.BillingLine2 : _claimMessageModel.ServiceCenterLine2;
            return N3;
        }
        public Segment GenerateLoop2010AA_N4_segment()
        {
            var N4 = new Segment { Name = "N4", FieldSeparator = FieldSeparator };
            N4[1] = _claimMessageModel.BillingProviderType == "I" ? _claimMessageModel.BillingCity : _claimMessageModel.ServiceCenterCity;
            N4[2] = _claimMessageModel.BillingProviderType == "I" ? _claimMessageModel.BillingState : _claimMessageModel.ServiceCenterState;
            N4[3] = _claimMessageModel.BillingProviderType == "I" ? _claimMessageModel.BillingZip : _claimMessageModel.ServiceCenterZip;
            return N4;
        }
        public Segment GenerateLoop2010AA_REF_segment()
        {
            var REF = new Segment { Name = "REF", FieldSeparator = FieldSeparator };
            REF[1] = "EI";
            REF[2] = _claimMessageModel.BillingTaxID;
            return REF;
        }

    }
}
