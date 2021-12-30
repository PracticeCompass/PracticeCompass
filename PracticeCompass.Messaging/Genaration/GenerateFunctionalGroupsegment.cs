using System;
using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class GenerateFunctionalGroupsegment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public GenerateFunctionalGroupsegment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GeneratefunctionalHeader()
        {
            Segment gs = new Segment { Name = "GS", FieldSeparator = FieldSeparator };
            gs[1] = "HC";
            gs[2] = _claimMessageModel.ParcticeTaxonomy;
            gs[3] = _claimMessageModel.ReceiverID;
            gs[4] = DateTime.Now.ToString("yyyyMMdd");
            gs[5] = DateTime.Now.ToString("HHmm");
            gs[6] = "1";
            gs[7] = "X";
            gs[8] = "005010X222A1";//837p
            return gs;
        }
        public Segment GeneratefunctionalTrailer()
        {
            Segment ge = new Segment { Name = "GE", FieldSeparator = FieldSeparator };
            ge[1] = "1"; 
            ge[2] = "1";
            return ge;            
        }
    }
}
