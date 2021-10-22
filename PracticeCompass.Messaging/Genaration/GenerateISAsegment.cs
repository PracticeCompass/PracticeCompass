using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class GenerateISAsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public GenerateISAsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateISAHeader()
        {
            Segment isa = new Segment { Name = "ISA", FieldSeparator = FieldSeparator };
            isa[1] = "00";
            isa[2] = "          ";
            isa[3] = "00";
            isa[4] = "          ";
            isa[5] = "ZZ";
            isa[6] = _unknownplaceholder;
            isa[7] = "ZZ";
            isa[8] = _unknownplaceholder;
            isa[9] = DateTime.Now.ToString("yyMMdd");
            isa[10] = DateTime.Now.ToString("HHMM");
            isa[11] = "^";
            isa[12] = "00501";
            isa[13] = _unknownplaceholder;
            isa[14] = "0";
            isa[15] = "T";
            isa[16] = ":";
            return isa;
        }
        public Segment GenerateISATrailer()
        {
            Segment iea = new Segment { Name = "IEA", FieldSeparator = FieldSeparator };
            iea[1] = "1";  
            iea[2] = _unknownplaceholder;//isa[13]
            return iea;            
        }
    }
}
