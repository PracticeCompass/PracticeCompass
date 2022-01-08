using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2430segment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        public Generateloop2430segment(ClaimMessageModel claimMessageModel, string fieldSeparator)
        {
            FieldSeparator = fieldSeparator;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2430_SVD_segment()
        {
            var SVD = new Segment { Name = "SVD", FieldSeparator = FieldSeparator };
            SVD[1] = _claimMessageModel.EnvoyPayerID;
            SVD[2] = _claimMessageModel.InsuranceReceipts.ToString();
            SVD[3] = string.Format("HC{0}{1}{2}{3}{4}", string.IsNullOrEmpty(_claimMessageModel.ProcedureCode) ? "" : ":" + _claimMessageModel.ProcedureCode,
                          string.IsNullOrEmpty(_claimMessageModel.Mod1) ? "" : ":" + _claimMessageModel.Mod1,
                          string.IsNullOrEmpty(_claimMessageModel.Mod2) ? "" : ":" + _claimMessageModel.Mod2,
                          string.IsNullOrEmpty(_claimMessageModel.Mod3) ? "" : ":" + _claimMessageModel.Mod3,
                          string.IsNullOrEmpty(_claimMessageModel.Mod4) ? "" : ":" + _claimMessageModel.Mod4);
            SVD[4] = "";
            SVD[5] = "1";
            return SVD;
        }  
        public Segment GenerateLoop2430_CAS_segment(LineAdjustments adjmodel)
        {
            var CAS = new Segment { Name = "CAS", FieldSeparator = FieldSeparator };
            CAS[1] = adjmodel.GroupCode;
            CAS[2] = adjmodel.ReasonCode;
            CAS[3] = adjmodel.Amount.ToString();
            return CAS;
        }
        public Segment GenerateLoop2430_DTP_segment()
        {
            var DTP = new Segment { Name = "DTP", FieldSeparator = FieldSeparator };
            DTP[1] = "573";
            DTP[2] = "D8";
            DTP[3] = _claimMessageModel.PostDate.Value.Date.ToString("yyyyMMdd");
            return DTP;
        }

        }
}
