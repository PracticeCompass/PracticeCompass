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
            SBR[1] = GetInsuranceLevelFromCoverageOrder(_claimMessageModel.CoverageOrder);
            SBR[2] = _claimMessageModel.RelationToSub == "S" ? "18" : "";
            SBR[9] = _claimMessageModel.FilingCode;
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
        public Segment GenerateLoop2320_payerAMT_segment()
        {
            var AMT = new Segment { Name = "AMT", FieldSeparator = FieldSeparator };
            AMT[1] = "D";
            AMT[2] = _claimMessageModel.InsuranceReceipts.ToString();
            return AMT;
        }
        public Segment GenerateLoop2320_patientAMT_segment()
        {
            var AMT = new Segment { Name = "AMT", FieldSeparator = FieldSeparator };
            AMT[1] = "EAF";
            AMT[2] = (_claimMessageModel.ApprovedAmount-_claimMessageModel.InsuranceReceipts).ToString();
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

        private string GetInsuranceLevelFromCoverageOrder(int CoverageOrder)
        {
            switch (CoverageOrder)
            {
                case 1:
                    return "P";
                case 2:
                    return "S";
                case 3:
                    return "T";
                case 4:
                    return "A";
                case 5:
                    return "B";
                case 6:
                    return "C";
                case 7:
                    return "D";
                case 8:
                    return "E";
                case 9:
                    return "F";
                case 10:
                    return "G";
                case 11:
                    return "H";
                default:
                    return "P";
            }
        }
    }
}
