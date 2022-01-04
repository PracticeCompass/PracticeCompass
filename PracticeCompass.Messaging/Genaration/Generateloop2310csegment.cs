using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2310csegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        public Generateloop2310csegment(ClaimMessageModel claimMessageModel, string fieldSeparator)
        {
            FieldSeparator = fieldSeparator;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2310C_NM1_segment()
        {
            var NM1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            NM1[1] = "77";
            NM1[2] = "2";
            NM1[3] = _claimMessageModel.ServiceCenterName;
            NM1[8] = "XX";
            NM1[9] = _claimMessageModel.ServiceCenterNPI;
            return NM1;
        }
        public Segment GenerateLoop2310C_N3_segment()
        {
            var N3 = new Segment { Name = "N3", FieldSeparator = FieldSeparator };
            N3[1] =  _claimMessageModel.ServiceCenterLine1;
            N3[2] =  _claimMessageModel.ServiceCenterLine2;
            return N3;
        }
        public Segment GenerateLoop2310C_N4_segment()
        {
            var N4 = new Segment { Name = "N4", FieldSeparator = FieldSeparator };
            N4[1] = _claimMessageModel.ServiceCenterCity;
            N4[2] =  _claimMessageModel.ServiceCenterState;
            N4[3] = _claimMessageModel.ServiceCenterZip;
            return N4;
        }

    }
}
