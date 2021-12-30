using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2400segment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        int _index;
        public Generateloop2400segment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder,int index)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
            _index = index;
        }
        public Segment GenerateLoop2400_LX_segment()
        {
            var LX = new Segment { Name = "LX", FieldSeparator = FieldSeparator};
            LX[1] = _index.ToString();
            return LX;
        }
        public Segment GenerateLoop2400_SV1_segment()
        {
            var SV1 = new Segment { Name = "SV1", FieldSeparator = FieldSeparator };
            SV1[1] = string.Format("HC{0}{1}{2}{3}{4}",string.IsNullOrEmpty(_claimMessageModel.ProcedureCode)?"": ":"+ _claimMessageModel.ProcedureCode,
                          string.IsNullOrEmpty(_claimMessageModel.Mod1) ? "" : ":" +_claimMessageModel.Mod1,
                          string.IsNullOrEmpty(_claimMessageModel.Mod2) ? "" : ":" +_claimMessageModel.Mod2,
                          string.IsNullOrEmpty(_claimMessageModel.Mod3) ? "" : ":" +_claimMessageModel.Mod3,
                          string.IsNullOrEmpty(_claimMessageModel.Mod4) ? "" : ":" +_claimMessageModel.Mod4);
            SV1[2] = _claimMessageModel.ChargeAmount.ToString();
            SV1[3] = "UN";
            SV1[4] = _claimMessageModel.Units;
            SV1[5] = _claimMessageModel.POSCode;
            SV1[7] = string.Format("{0}{1}{2}{3}",
                          string.IsNullOrEmpty(_claimMessageModel.Order1) ? "" : _claimMessageModel.Order1,
                          string.IsNullOrEmpty(_claimMessageModel.Order2) ? "" : ":" + _claimMessageModel.Order2,
                          string.IsNullOrEmpty(_claimMessageModel.Order3) ? "" : ":" + _claimMessageModel.Order3,
                          string.IsNullOrEmpty(_claimMessageModel.Order4) ? "" : ":" + _claimMessageModel.Order4);
            //SV1[9] = _unknownplaceholder;
            //SV1[11] = _unknownplaceholder;
            //SV1[12] = _unknownplaceholder;
            //SV1[15] = _unknownplaceholder;
            return SV1;
        }

        public Segment GenerateLoop2400_DTP_segment()
        {
            var DTP = new Segment { Name = "DTP", FieldSeparator = FieldSeparator };
            DTP[1] = "472";
            DTP[2] = "D8";
            DTP[3] = _claimMessageModel.FromServiceDate;
            return DTP;
        }
        public Segment GenerateLoop2400_REF_segment()
        {
            var REF = new Segment { Name = "REF", FieldSeparator = FieldSeparator };
            REF[1] = "6R";
            REF[2] = _claimMessageModel.ChargeSID.ToString(); //send a unqiue number PK of ProcedureEvent 
            return REF;
        }

    }
}
