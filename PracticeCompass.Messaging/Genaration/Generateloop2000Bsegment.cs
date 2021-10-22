﻿using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2000Bsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2000Bsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2000B_HL_segment()
        {
            var HL = new Segment { Name = "HL", FieldSeparator = FieldSeparator };
            HL[1] = "2";
            HL[2] = "1";
            HL[3] = "22";
            HL[4] = "0";
            return HL;
        }
        public Segment GenerateLoop2000B_SBR_segment()
        {
            var SBR = new Segment { Name = "SBR", FieldSeparator = FieldSeparator };
            SBR[1] = GetInsuranceLevelFromCoverageOrder(_claimMessageModel.CoverageOrder);
            SBR[2] = _claimMessageModel.RelationToSub == "S" ? "18" : "";
            SBR[9] = _claimMessageModel.FilingCode;
            return SBR;
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
