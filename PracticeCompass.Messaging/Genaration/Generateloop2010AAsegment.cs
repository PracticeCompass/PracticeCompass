﻿using PracticeCompass.Common.Models;
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
            NM1[2] = _claimMessageModel.ProviderType == "I" ? "1" : "2";
            NM1[3] = _claimMessageModel.ProviderName;
            NM1[4] = _claimMessageModel.ProviderFristName;
            NM1[8] = "XX";
            NM1[9] = _claimMessageModel.NPI;
            return NM1;
        }
        public Segment GenerateLoop2010AA_N3_segment()
        {
            var N3 = new Segment { Name = "N3", FieldSeparator = FieldSeparator };
            N3[1] = _claimMessageModel.ProviderType == "I" ? _claimMessageModel.ProviderLine1: _claimMessageModel.PracticeLine1;
            N3[2] = _claimMessageModel.ProviderType == "I" ? _claimMessageModel.ProviderLine2 : _claimMessageModel.PracticeLine2;
            return N3;
        }
        public Segment GenerateLoop2010AA_N4_segment()
        {
            var N4 = new Segment { Name = "N4", FieldSeparator = FieldSeparator };
            N4[1] = _claimMessageModel.ProviderType == "I" ? _claimMessageModel.City : _claimMessageModel.PracticeCity;
            N4[2] = _claimMessageModel.ProviderType == "I" ? _claimMessageModel.ProviderState : _claimMessageModel.PracticeState;
            N4[3] = _claimMessageModel.ProviderType == "I" ? _claimMessageModel.ProviderZip : _claimMessageModel.PracticeZip;
            return N4;
        }
        public Segment GenerateLoop2010AA_REF_segment()
        {
            var REF = new Segment { Name = "REF", FieldSeparator = FieldSeparator };
            REF[1] = "EI";
            REF[2] = _claimMessageModel.ProviderTaxID;
            return REF;
        }

    }
}
