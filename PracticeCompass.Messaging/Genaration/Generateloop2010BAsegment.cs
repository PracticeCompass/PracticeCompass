using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Enums;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2010BAsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2010BAsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2010BA_NM1_segment()
        {
            var NM1 = new Segment { Name = "NM1", FieldSeparator = FieldSeparator };
            NM1[1] = "IL";
            NM1[2] = "1";
            NM1[3] = _claimMessageModel.LastName;
            NM1[4] = _claimMessageModel.FirstName;
            NM1[5] = _claimMessageModel.MiddleName;
            NM1[7] = _claimMessageModel.NameSuffix;
            NM1[8] = "MI";
            NM1[9] = _claimMessageModel.ClaimMemberID;
            return NM1;
        }
        public Segment GenerateLoop2010BA_N3_segment()
        {
            var N3 = new Segment { Name = "N3", FieldSeparator = FieldSeparator };
            N3[1] = _claimMessageModel.Line1;
            N3[2] = _claimMessageModel.Line2;
            return N3;
        }
        public Segment GenerateLoop2010BA_N4_segment()
        {
            var N4 = new Segment { Name = "N4", FieldSeparator = FieldSeparator };
            N4[1] = _claimMessageModel.City;
            N4[2] = _claimMessageModel.StateCode;
            N4[3] = _claimMessageModel.Zip;
            return N4;
        }
        public Segment GenerateLoop2010BA_DMG_segment()
        {
            var DMG = new Segment { Name = "DMG", FieldSeparator = FieldSeparator };
            DMG[1] = "D8";
            DMG[2] = _claimMessageModel.DOB;
            DMG[3] = _claimMessageModel.Sex;
            return DMG;
        }

    }
}
