using PracticeCompass.Common.Models;
using PracticeCompass.Messaging.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class Generateloop2300segment
    {
        ClaimMessageModel _claimMessageModel;
        string FieldSeparator;
        string _unknownplaceholder;
        public Generateloop2300segment(ClaimMessageModel claimMessageModel, string fieldSeparator, string unknownplaceholder)
        {
            FieldSeparator = fieldSeparator;
            _unknownplaceholder = unknownplaceholder;
            _claimMessageModel = claimMessageModel;
        }
        public Segment GenerateLoop2300_CLM_segment()
        {
            var clm = new Segment { Name = "CLM", FieldSeparator = FieldSeparator };
            clm[1] = _claimMessageModel.ClaimNumber+ _claimMessageModel.PracticeCode;
            clm[2] = _claimMessageModel.ChargeTotalAmount.ToString();
            clm[5] = string.Format("{0}:B:{1}", 11, 1);
            clm[6] = "Y";
            clm[7] = "A";
            clm[8] = "Y";
            clm[9] = "Y";
            //clm[10] = "P";
            //clm[11] = _unknownplaceholder;
            //clm[20] = _unknownplaceholder;
            return clm;
        }
        public Segment GenerateLoop2300_PWK_segment()
        {
            var PWK = new Segment { Name = "PWK", FieldSeparator = FieldSeparator };
            PWK[1] = _unknownplaceholder;
            PWK[2] = _unknownplaceholder;
            PWK[5] = "AC";
            PWK[6] = _unknownplaceholder;
            return PWK;
        }
        public Segment GenerateLoop2300_AMT_segment()
        {
            var AMT = new Segment { Name = "AMT", FieldSeparator = FieldSeparator };
            AMT[1] = "F5";
            AMT[2] = _unknownplaceholder;
            return AMT;
        } 
        public Segment GenerateLoop2300_REF_segment()
        {
            var REF = new Segment { Name = "REF", FieldSeparator = FieldSeparator };
            REF[1] = "9F";
            REF[2] = _unknownplaceholder;
            return REF;
        } 
        public Segment GenerateLoop2300_NTE_segment()
        {
            var NTE = new Segment { Name = "NTE", FieldSeparator = FieldSeparator };
            NTE[1] = "ADD";
            NTE[2] = _unknownplaceholder;
            return NTE;
        }
        public Segment GenerateLoop2300_HI_segment()
        {
            var HI = new Segment { Name = "HI", FieldSeparator = FieldSeparator };
            if(!string.IsNullOrEmpty(_claimMessageModel.Diag1))
            HI[1] = string.Format("ABK:{0}", _claimMessageModel.Diag1.Replace(".",""));
            if(!string.IsNullOrEmpty(_claimMessageModel.Diag2))
            HI[2] = string.Format("ABF:{0}", _claimMessageModel.Diag2.Replace(".", ""));
            if(!string.IsNullOrEmpty(_claimMessageModel.Diag3))
            HI[3] = string.Format("ABF:{0}", _claimMessageModel.Diag3.Replace(".", ""));
            if(!string.IsNullOrEmpty(_claimMessageModel.Diag4))
            HI[4] = string.Format("ABF:{0}", _claimMessageModel.Diag4.Replace(".", ""));
            return HI;
        }
        public Segment GenerateLoop2300_HIProcedure_segment()
        {
            var HI = new Segment { Name = "HI", FieldSeparator = FieldSeparator };
            HI[1] = string.Format("BP:{0}", _unknownplaceholder);
            HI[2] = string.Format("BO:{0}", _unknownplaceholder);
            return HI;
        }

    }
}
