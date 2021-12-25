﻿using System;
using System.IO;
using PracticeCompass.Messaging.Enums;
using PracticeCompass.Messaging.Models;
using PracticeCompass.Common.Models;

namespace PracticeCompass.Messaging.Genaration
{
    public class X12_837Generator
    {
        public void Generate837PMessage(ClaimMessageModel ClaimMessageModel, string segmentSeparator, string FieldSeparator, string unknownplaceholder)
        {

            Message message = new Message { };
            #region INTERCHANGE envelope
            Envelope interchangeEnvelope = new Envelope { EnvelopeType = EnvelopeType.INTERCHANGE, SegmentSeparator = segmentSeparator };
            message.Envelopes.Add(interchangeEnvelope);
            var GenerateISA = new GenerateISAsegment(ClaimMessageModel,FieldSeparator, unknownplaceholder);
            var isa = GenerateISA.GenerateISAHeader();
            var iea = GenerateISA.GenerateISATrailer();
            interchangeEnvelope.HeaderSegment = isa;
            interchangeEnvelope.TrailerSegment = iea;
            #endregion
            #region FunctionalGroup envelope
            Envelope FunctionalGroup = new Envelope { EnvelopeType = EnvelopeType.FunctionalGroup, SegmentSeparator = segmentSeparator };
            interchangeEnvelope.NestedEnvelopes.Add(FunctionalGroup);
            var Generatefunctional = new GenerateFunctionalGroupsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var GS = Generatefunctional.GeneratefunctionalHeader();
            var GE = Generatefunctional.GeneratefunctionalTrailer();
            FunctionalGroup.HeaderSegment = GS;
            FunctionalGroup.TrailerSegment = GE;
            #endregion
            #region transaction envelope
            Envelope transactionEnvelope = new Envelope { EnvelopeType = EnvelopeType.Transaction, SegmentSeparator = segmentSeparator };
            var transaction = new Generatetransactionsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var ST = transaction.GeneratetransactionHeader();
            var SE = transaction.GeneratetransactionTrailer();
            var bht = transaction.GenerateBHTSegment();
            transactionEnvelope.Segments.Add(bht);
            transactionEnvelope.HeaderSegment = ST;
            transactionEnvelope.TrailerSegment = SE;
            FunctionalGroup.NestedEnvelopes.Add(transactionEnvelope);
            #endregion
            #region Loop: 1000A
            var loop1000A = new Generateloop1000Asegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var loop1000A_Nm1 = loop1000A.GenerateLoop1000A_NM1_segment();
            var PER = loop1000A.GenerateLoop1000A_PER_segment();
            transactionEnvelope.Segments.Add(loop1000A_Nm1);
            transactionEnvelope.Segments.Add(PER);
            #endregion
            #region Loop: 1000B
            var loop1000B = new Generateloop1000Bsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var loop1000B_Nm1 = loop1000B.GenerateLoop1000B_NM1_segment();
            transactionEnvelope.Segments.Add(loop1000B_Nm1);
            #endregion
            #region Loop: 2000A
            var loop2000A = new Generateloop2000Asegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var Loop2000A_HL = loop2000A.GenerateLoop2000A_HL_segment();
            var Loop2000A_PRV = loop2000A.GenerateLoop2000A_PRV_segment();
            transactionEnvelope.Segments.Add(Loop2000A_HL);
            transactionEnvelope.Segments.Add(Loop2000A_PRV);
            #endregion
            #region Loop: 2010AA
            var loop2010AA = new Generateloop2010AAsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var loop2010AA_NM1 = loop2010AA.GenerateLoop2010AA_NM1_segment();
            var loop2010AA_N3 = loop2010AA.GenerateLoop2010AA_N3_segment();
            var loop2010AA_N4 = loop2010AA.GenerateLoop2010AA_N4_segment();
            var loop2010AA_REF = loop2010AA.GenerateLoop2010AA_REF_segment();
            transactionEnvelope.Segments.Add(loop2010AA_NM1);
            transactionEnvelope.Segments.Add(loop2010AA_N3);
            transactionEnvelope.Segments.Add(loop2010AA_N4);
            transactionEnvelope.Segments.Add(loop2010AA_REF);
            #endregion
            #region Loop: 2010AB
            var loop2010AB = new Generateloop2010ABsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var loop2010AB_NM1 = loop2010AB.GenerateLoop2010AB_NM1_segment();
            var loop2010AB_N3 = loop2010AB.GenerateLoop2010AB_N3_segment();
            var loop2010AB_N4 = loop2010AB.GenerateLoop2010AB_N4_segment();
            transactionEnvelope.Segments.Add(loop2010AB_NM1);
            transactionEnvelope.Segments.Add(loop2010AB_N3);
            transactionEnvelope.Segments.Add(loop2010AB_N4);
            #endregion
            #region Loop: 2000B
            var loop2000B = new Generateloop2000Bsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var Loop2000B_HL = loop2000B.GenerateLoop2000B_HL_segment();
            var Loop2000B_SBR = loop2000B.GenerateLoop2000B_SBR_segment();
            transactionEnvelope.Segments.Add(Loop2000B_HL);
            transactionEnvelope.Segments.Add(Loop2000B_SBR);
            #endregion
            #region Loop: 2010BA
            var Loop2010BA      = new Generateloop2010BAsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var Loop2010BA_NM1  = Loop2010BA.GenerateLoop2010BA_NM1_segment();
            var Loop2010BA_N3   = Loop2010BA.GenerateLoop2010BA_N3_segment();
            var Loop2010BA_N4   = Loop2010BA.GenerateLoop2010BA_N4_segment();
            var Loop2010BA_DMG  = Loop2010BA.GenerateLoop2010BA_DMG_segment();
            transactionEnvelope.Segments.Add(Loop2010BA_NM1);
            transactionEnvelope.Segments.Add(Loop2010BA_N3);
            transactionEnvelope.Segments.Add(Loop2010BA_N4);
            transactionEnvelope.Segments.Add(Loop2010BA_DMG);
            #endregion
            #region Loop: 2010BB
            var Loop2010BB     = new Generateloop2010BBsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var Loop2010BB_NM1 = Loop2010BB.GenerateLoop2010BB_NM1_segment();
            var Loop2010BB_N3  = Loop2010BB.GenerateLoop2010BB_N3_segment();
            var Loop2010BB_N4  = Loop2010BB.GenerateLoop2010BB_N4_segment();
            transactionEnvelope.Segments.Add(Loop2010BB_NM1);
            transactionEnvelope.Segments.Add(Loop2010BB_N3);
            transactionEnvelope.Segments.Add(Loop2010BB_N4);
            #endregion
            #region Loop: 2300
            var loop2300 = new Generateloop2300segment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var Loop2300_CLM = loop2300.GenerateLoop2300_CLM_segment();
            //var Loop2300_PWK = loop2300.GenerateLoop2300_PWK_segment();
           // var Loop2300_AMT = loop2300.GenerateLoop2300_AMT_segment();
           // var Loop2300_REF = loop2300.GenerateLoop2300_REF_segment();
           // var Loop2300_NTE = loop2300.GenerateLoop2300_NTE_segment();
            var Loop2300_HI  = loop2300.GenerateLoop2300_HI_segment();
           // var Loop2300_HIProcedure = loop2300.GenerateLoop2300_HIProcedure_segment();
            transactionEnvelope.Segments.Add(Loop2300_CLM);
            //transactionEnvelope.Segments.Add(Loop2300_PWK);
            //transactionEnvelope.Segments.Add(Loop2300_AMT);
            //transactionEnvelope.Segments.Add(Loop2300_REF);
            //transactionEnvelope.Segments.Add(Loop2300_NTE);
            transactionEnvelope.Segments.Add(Loop2300_HI);
            //transactionEnvelope.Segments.Add(Loop2300_HIProcedure);
            #endregion
            #region Loop: 2310A
            var loop2310A = new Generateloop2310Asegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var loop2310A_NM1 = loop2310A.GenerateLoop2310A_NM1_segment();
            transactionEnvelope.Segments.Add(loop2310A_NM1);
            #endregion
            #region Loop: 2310B
            var loop2310B = new Generateloop2310Bsegment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var loop2310B_NM1 = loop2310B.GenerateLoop2310B_NM1_segment();
            var loop2310B_PRV = loop2310B.GenerateLoop2310B_PRV_segment();
            transactionEnvelope.Segments.Add(loop2310B_NM1);
            transactionEnvelope.Segments.Add(loop2310B_PRV);
            #endregion
            #region Loop: 2320
            //var loop2320     = new Generateloop2320segment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            //var loop2320_SBR = loop2320.GenerateLoop2320_SBR_segment();
            //var loop2320_CAS = loop2320.GenerateLoop2320_CAS_segment();
            //var loop2320_AMT = loop2320.GenerateLoop2320_AMT_segment();
            //var loop2320_OI  = loop2320.GenerateLoop2320_OI_segment();
            //var loop2320_MOA = loop2320.GenerateLoop2320_MOA_segment();
            //transactionEnvelope.Segments.Add(loop2320_SBR);
            //transactionEnvelope.Segments.Add(loop2320_CAS);
            //transactionEnvelope.Segments.Add(loop2320_AMT);
            //transactionEnvelope.Segments.Add(loop2320_OI);
            //transactionEnvelope.Segments.Add(loop2320_MOA);
            #endregion
            #region Loop: 2400 
            var loop2400     = new Generateloop2400segment(ClaimMessageModel, FieldSeparator, unknownplaceholder);
            var loop2400_LX  = loop2400.GenerateLoop2400_LX_segment();
            var loop2400_SV1 = loop2400.GenerateLoop2400_SV1_segment();
            var loop2400_DTP = loop2400.GenerateLoop2400_DTP_segment();
            var loop2400_REF = loop2400.GenerateLoop2400_REF_segment();
            transactionEnvelope.Segments.Add(loop2400_LX);
            transactionEnvelope.Segments.Add(loop2400_SV1);
            transactionEnvelope.Segments.Add(loop2400_DTP);
            transactionEnvelope.Segments.Add(loop2400_REF);
            #endregion
            var returnme = message.GenerateMessage();
            if (!Directory.Exists(@"C:\PracticeCompas\Outbound\"))
            {
                Directory.CreateDirectory(@"C:\PracticeCompas\Outbound\");
            }
            var path= @"C:\PracticeCompas\Outbound\"+ Guid.NewGuid()+ ".X12";
            File.WriteAllText(path, returnme);
        }
    }
}
