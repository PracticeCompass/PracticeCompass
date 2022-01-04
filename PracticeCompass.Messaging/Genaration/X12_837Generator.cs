using System;
using System.IO;
using PracticeCompass.Messaging.Enums;
using PracticeCompass.Messaging.Models;
using PracticeCompass.Common.Models;
using System.Linq;
using System.Collections.Generic;
using PracticeCompass.Logger;
using Microsoft.Extensions.Configuration;
using PracticeCompass.Data.Repositories;

namespace PracticeCompass.Messaging.Genaration
{
    public class X12_837Generator
    {
        public void Generate837PMessage(List<ClaimMessageModel> ClaimMessageModel, string segmentSeparator, string FieldSeparator, string unknownplaceholder, IConfiguration configuration)
        {

            Message message = new Message { };

            #region INTERCHANGE envelope
            Envelope interchangeEnvelope = new Envelope { EnvelopeType = EnvelopeType.INTERCHANGE, SegmentSeparator = segmentSeparator };
            message.Envelopes.Add(interchangeEnvelope);
            var GenerateISA = new GenerateISAsegment(ClaimMessageModel.FirstOrDefault(x => x.CoverageOrder == x.LowestRespCoverageOrder), FieldSeparator, unknownplaceholder);
            var isa = GenerateISA.GenerateISAHeader();
            var iea = GenerateISA.GenerateISATrailer();
            interchangeEnvelope.HeaderSegment = isa;
            interchangeEnvelope.TrailerSegment = iea;
            #endregion
            #region FunctionalGroup envelope
            Envelope FunctionalGroup = new Envelope { EnvelopeType = EnvelopeType.FunctionalGroup, SegmentSeparator = segmentSeparator };
            interchangeEnvelope.NestedEnvelopes.Add(FunctionalGroup);
            var Generatefunctional = new GenerateFunctionalGroupsegment(ClaimMessageModel[0], FieldSeparator, unknownplaceholder);
            var GS = Generatefunctional.GeneratefunctionalHeader();
            var GE = Generatefunctional.GeneratefunctionalTrailer();
            FunctionalGroup.HeaderSegment = GS;
            FunctionalGroup.TrailerSegment = GE;
            #endregion
            #region transaction envelope
            Envelope transactionEnvelope = new Envelope { EnvelopeType = EnvelopeType.Transaction, SegmentSeparator = segmentSeparator };
            var transaction = new Generatetransactionsegment(ClaimMessageModel[0], FieldSeparator, unknownplaceholder);
            var ST = transaction.GeneratetransactionHeader();
          
            var bht = transaction.GenerateBHTSegment();
            transactionEnvelope.Segments.Add(bht);
            transactionEnvelope.HeaderSegment = ST;

            FunctionalGroup.NestedEnvelopes.Add(transactionEnvelope);
            #endregion
            #region Loop: 1000A
            var loop1000A = new Generateloop1000Asegment(ClaimMessageModel[0], FieldSeparator, unknownplaceholder);
            var loop1000A_Nm1 = loop1000A.GenerateLoop1000A_NM1_segment();
            var PER = loop1000A.GenerateLoop1000A_PER_segment();
            transactionEnvelope.Segments.Add(loop1000A_Nm1);
            transactionEnvelope.Segments.Add(PER);
            #endregion
            #region Loop: 1000B
            var loop1000B = new Generateloop1000Bsegment(ClaimMessageModel[0], FieldSeparator, unknownplaceholder);
            var loop1000B_Nm1 = loop1000B.GenerateLoop1000B_NM1_segment();
            transactionEnvelope.Segments.Add(loop1000B_Nm1);
            #endregion
            var fillingcodes = ClaimMessageModel.Where(x => x.CoverageOrder == x.LowestRespCoverageOrder).Select(x => x.FilingCode).Distinct().ToList();
            var loopindex = 0;
            for (var f = 0; f < fillingcodes.Count; f++)
            {
                Log.LogError("fillingcodes : " + fillingcodes.Count, "", "");
                Log.LogError("amr ahmed : " + fillingcodes.Count, "", "");
                loopindex++;
                var parentlooindex = loopindex;
                var parentmodel = ClaimMessageModel.FirstOrDefault(x => x.FilingCode == fillingcodes[f]&&x.CoverageOrder==x.LowestRespCoverageOrder);
                //create 2000A segment
                #region Loop: 2000A
                var loop2000A = new Generateloop2000Asegment(parentmodel, FieldSeparator, unknownplaceholder, parentlooindex);
                var Loop2000A_HL = loop2000A.GenerateLoop2000A_HL_segment();
                //var Loop2000A_PRV = loop2000A.GenerateLoop2000A_PRV_segment();
                transactionEnvelope.Segments.Add(Loop2000A_HL);
                // transactionEnvelope.Segments.Add(Loop2000A_PRV);
                #endregion
                #region Loop: 2010AA
                var loop2010AA = new Generateloop2010AAsegment(parentmodel, FieldSeparator, unknownplaceholder);
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
                var loop2010AB = new Generateloop2010ABsegment(parentmodel, FieldSeparator, unknownplaceholder);
                var loop2010AB_NM1 = loop2010AB.GenerateLoop2010AB_NM1_segment();
                var loop2010AB_N3 = loop2010AB.GenerateLoop2010AB_N3_segment();
                var loop2010AB_N4 = loop2010AB.GenerateLoop2010AB_N4_segment();
                transactionEnvelope.Segments.Add(loop2010AB_NM1);
                transactionEnvelope.Segments.Add(loop2010AB_N3);
                transactionEnvelope.Segments.Add(loop2010AB_N4);
                #endregion
                var filteredbyfilling = ClaimMessageModel.FirstOrDefault(c => c.FilingCode == fillingcodes[f]);
                //for (var l=0;l<filteredbyfilling.Count;l++)
                //{
                //Log.LogError("filteredbyfilling : " + filteredbyfilling.Count,"","");
                var claimnumbers = ClaimMessageModel.Where(x => x.FilingCode == fillingcodes[f]).Select(x => x.ClaimNumber).Distinct().ToList();
                for (var c = 0; c < claimnumbers.Count; c++)
                {
                    Log.LogError("claimnumbers : " + claimnumbers.Count, "", "");
                    loopindex++;
                    var rowsbyclaimnumber = ClaimMessageModel.Where(x => x.ClaimNumber == claimnumbers[c])
                        .Select(x => new { claimnum = x.ClaimNumber, covorder = x.CoverageOrder,lowestOrder=x.LowestRespCoverageOrder }).Distinct().OrderBy(x => x.covorder).ToList();
                    //create 2000B HL segment 
                    var parenthl = ClaimMessageModel.FirstOrDefault(x => x.ClaimNumber == claimnumbers[c]);
                    var loop2000BHL = new Generateloop2000Bsegment(parenthl, FieldSeparator, unknownplaceholder, parentlooindex, loopindex);
                    var Loop2000B_HL = loop2000BHL.GenerateLoop2000B_HL_segment();
                    transactionEnvelope.Segments.Add(Loop2000B_HL);

                    for (var r = 0; r < rowsbyclaimnumber.Count; r++)
                    {
                        var childmodel = ClaimMessageModel.FirstOrDefault(x => x.ClaimNumber == rowsbyclaimnumber[r].claimnum && x.CoverageOrder == rowsbyclaimnumber[r].covorder);
                      
                        Log.LogError("rowsbyclaimnumber : " + rowsbyclaimnumber.Count, "", "");
                        //create 2000B SBR 
                        if (rowsbyclaimnumber[r].covorder == rowsbyclaimnumber[r].lowestOrder)
                        {
                            var loop2000Bsbr = new Generateloop2000Bsegment(childmodel, FieldSeparator, unknownplaceholder, 0, 0);
                            var Loop2000B_SBR = loop2000Bsbr.GenerateLoop2000B_SBR_segment();
                            transactionEnvelope.Segments.Add(Loop2000B_SBR);
                        }
                        else
                        {
                            var loop2320 = new Generateloop2320segment(childmodel, FieldSeparator, unknownplaceholder);
                            var loop2320_SBR = loop2320.GenerateLoop2320_SBR_segment();
                            var loop2320_payerAMT = loop2320.GenerateLoop2320_payerAMT_segment();
                            var loop2320_patientAMT = loop2320.GenerateLoop2320_patientAMT_segment();
                            var loop2320_OI = loop2320.GenerateLoop2320_OI_segment();
                            transactionEnvelope.Segments.Add(loop2320_SBR);
                            transactionEnvelope.Segments.Add(loop2320_payerAMT);
                            transactionEnvelope.Segments.Add(loop2320_patientAMT);
                            transactionEnvelope.Segments.Add(loop2320_OI);
                        }
                        // create 2010BA
                        //create 2010BB
                        #region Loop: 2010BA
                        var Loop2010BA = new Generateloop2010BAsegment(childmodel, FieldSeparator, unknownplaceholder);
                        var Loop2010BA_NM1 = Loop2010BA.GenerateLoop2010BA_NM1_segment();
                        var Loop2010BA_N3 = Loop2010BA.GenerateLoop2010BA_N3_segment();
                        var Loop2010BA_N4 = Loop2010BA.GenerateLoop2010BA_N4_segment();
                        var Loop2010BA_DMG = Loop2010BA.GenerateLoop2010BA_DMG_segment();
                        transactionEnvelope.Segments.Add(Loop2010BA_NM1);
                        transactionEnvelope.Segments.Add(Loop2010BA_N3);
                        transactionEnvelope.Segments.Add(Loop2010BA_N4);
                        if (rowsbyclaimnumber[r].covorder == 1)  transactionEnvelope.Segments.Add(Loop2010BA_DMG);
                        #endregion
                        #region Loop: 2010BB
                        var Loop2010BB = new Generateloop2010BBsegment(childmodel, FieldSeparator, unknownplaceholder);
                        var Loop2010BB_NM1 = Loop2010BB.GenerateLoop2010BB_NM1_segment();
                        var Loop2010BB_N3 = Loop2010BB.GenerateLoop2010BB_N3_segment();
                        var Loop2010BB_N4 = Loop2010BB.GenerateLoop2010BB_N4_segment();
                        transactionEnvelope.Segments.Add(Loop2010BB_NM1);
                        transactionEnvelope.Segments.Add(Loop2010BB_N3);
                        transactionEnvelope.Segments.Add(Loop2010BB_N4);
                        #endregion
                        if (rowsbyclaimnumber[r].covorder == rowsbyclaimnumber[r].lowestOrder)
                        {
                           var totalamount = ClaimMessageModel.Where(x => x.ClaimNumber == rowsbyclaimnumber[r].claimnum && x.CoverageOrder == rowsbyclaimnumber[r].covorder).Sum(x=>x.ChargeAmount);
                            childmodel.ChargeTotalAmount = totalamount; 
                            //create 2300 
                            #region Loop: 2300
                            var loop2300 = new Generateloop2300segment(childmodel, FieldSeparator, unknownplaceholder);
                            var Loop2300_CLM = loop2300.GenerateLoop2300_CLM_segment();
                            //var Loop2300_PWK = loop2300.GenerateLoop2300_PWK_segment();
                            // var Loop2300_AMT = loop2300.GenerateLoop2300_AMT_segment();
                            // var Loop2300_REF = loop2300.GenerateLoop2300_REF_segment();
                            // var Loop2300_NTE = loop2300.GenerateLoop2300_NTE_segment();
                            var Loop2300_HI = loop2300.GenerateLoop2300_HI_segment();
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
                            var loop2310A = new Generateloop2310Asegment(childmodel, FieldSeparator, unknownplaceholder);
                            if (!string.IsNullOrEmpty(childmodel.RefLastName))
                            {
                                var loop2310A_NM1 = loop2310A.GenerateLoop2310A_NM1_segment();
                                transactionEnvelope.Segments.Add(loop2310A_NM1);
                            }

                            #endregion
                            #region Loop: 2310B
                            var loop2310B = new Generateloop2310Bsegment(childmodel, FieldSeparator, unknownplaceholder);
                            if (childmodel.BillingNPI != childmodel.renderingNPI)
                            {
                                var loop2310B_NM1 = loop2310B.GenerateLoop2310B_NM1_segment();
                                transactionEnvelope.Segments.Add(loop2310B_NM1);
                            }
                            var loop2310B_PRV = loop2310B.GenerateLoop2310B_PRV_segment();
                            transactionEnvelope.Segments.Add(loop2310B_PRV);
                            #endregion
                            #region Loop: 2310C
                            if (string.IsNullOrEmpty(childmodel.RefLastName))
                            {
                                
                                var loop2310C = new Generateloop2310csegment(childmodel, FieldSeparator);
                                var loop2310C_nm1 = loop2310C.GenerateLoop2310C_NM1_segment();
                                var loop2310C_n3 = loop2310C.GenerateLoop2310C_N3_segment();
                                var loop2310C_n4 = loop2310C.GenerateLoop2310C_N4_segment();
                                transactionEnvelope.Segments.Add(loop2310C_nm1);
                                transactionEnvelope.Segments.Add(loop2310C_n3);
                                transactionEnvelope.Segments.Add(loop2310C_n4);
                            }
                            #endregion
                        }

                    }
                    var charges = ClaimMessageModel.Where(x => x.ClaimNumber == claimnumbers[c]).Select(x => x.ChargeSID).Distinct().ToList();
                    for (var ch = 0; ch < charges.Count; ch++)
                    {
                        Log.LogError("charges : " + charges.Count, "", "");
                        var chargemodel = ClaimMessageModel.FirstOrDefault(t => t.ChargeSID == charges[ch]);
                        if (chargemodel != null)
                        {
                            // create 2400
                            #region Loop: 2400 
                            var loop2400 = new Generateloop2400segment(chargemodel, FieldSeparator, unknownplaceholder, ch + 1);
                            var loop2400_LX = loop2400.GenerateLoop2400_LX_segment();
                            var loop2400_SV1 = loop2400.GenerateLoop2400_SV1_segment();
                            var loop2400_DTP = loop2400.GenerateLoop2400_DTP_segment();
                            var loop2400_REF = loop2400.GenerateLoop2400_REF_segment();
                            transactionEnvelope.Segments.Add(loop2400_LX);
                            transactionEnvelope.Segments.Add(loop2400_SV1);
                            transactionEnvelope.Segments.Add(loop2400_DTP);
                            transactionEnvelope.Segments.Add(loop2400_REF);
                            #endregion
                            var casmodel = ClaimMessageModel.FirstOrDefault(x => x.CoverageOrder == 1 && x.ClaimNumber == claimnumbers[c] && x.ChargeSID == charges[ch]);
                            if (casmodel != null&& casmodel.LowestRespCoverageOrder!=1)// loop 2430 should be added in case not billing primary insurance
                            {
                                var claimrepository = new ClaimListRepository(configuration.GetConnectionString("PracticeCompass"));
                                var chargeadjustments = claimrepository.GetLineAdjustments(casmodel.ChargeSID,casmodel.PlanID,casmodel.ClaimSID, casmodel.PolicyNumber);
                                #region Loop: 2430 
                                var loop2430 = new Generateloop2430segment(casmodel, FieldSeparator);
                                var loop2430_svd = loop2430.GenerateLoop2430_SVD_segment();
                                transactionEnvelope.Segments.Add(loop2430_svd);
                                for (var chadj=0; chadj< chargeadjustments.Count; chadj++)
                                {
                                    if (chadj > 18) break;//maximum adjustments in standard = 19
                                    var loop2430_cas = loop2430.GenerateLoop2430_CAS_segment(chargeadjustments[chadj]);
                                    transactionEnvelope.Segments.Add(loop2430_cas);
                                }
                                var loop2430_Dtp = loop2430.GenerateLoop2430_DTP_segment();
                                transactionEnvelope.Segments.Add(loop2430_Dtp);
                                #endregion
                            }

                        }
                    }
                    

                }

                // }

            }
            #region Loop: 2320

            //var loop2320_CAS = loop2320.GenerateLoop2320_CAS_segment();
            

            //var loop2320_MOA = loop2320.GenerateLoop2320_MOA_segment();

            //transactionEnvelope.Segments.Add(loop2320_CAS);

            //transactionEnvelope.Segments.Add(loop2320_MOA);
            #endregion
            var SE = transaction.GeneratetransactionTrailer(transactionEnvelope.Segments.Count);
            transactionEnvelope.TrailerSegment = SE;
            var returnme = message.GenerateMessage();
            if (!Directory.Exists(@"C:\PracticeCompas\Outbound\"))
            {
                Directory.CreateDirectory(@"C:\PracticeCompas\Outbound\");
            }
            var path = @"C:\PracticeCompas\Outbound\" + Guid.NewGuid() + ".X12";
            File.WriteAllText(path, returnme);
        }
    }
}
