using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2000Asegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        int _parentindex;
        public Generateloop2000Asegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder,int parentindex)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
            _parentindex = parentindex;
        }
        public Segment GenerateLoop2000A_HL_segment()
        {
            var HL = new Segment { Name = "HL", FieldSeparator = FieldSeparator };
            HL[1] = _parentindex.ToString(); 
            HL[3] = "20";
            HL[4] = "1"; 
            return HL;
        }  
        public Segment GenerateLoop2000A_PRV_segment()
        {
            var PRV = new Segment { Name = "PRV", FieldSeparator = FieldSeparator };
            PRV[1] = "BI"; 
            PRV[2] = "PXC"; 
            PRV[3] = _claimMessageModel.TaxonomyCode;
            return PRV;
        }
        
    }
}
