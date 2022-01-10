using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using PracticeCompass.Messaging.Enums;
using PracticeCompass.Messaging.Models;
using PracticeCompass.Messaging.Utilities;
using PracticeCompass.Core.Common;
using Microsoft.Extensions.Configuration;
using PracticeCompass.Common.Models;
using PracticeCompass.Common.Enums;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Messaging.Parsing
{
    public class ClaimReportsParser
    {
        public ClaimReportsParser()

        {
        }
        public ClaimReportModel ProcessClaimReport(string messageContent, string segmentSeparator, string FieldSeparator)
        {
            try
            {
                var claimreports = new ClaimReportModel();
                messageContent = messageContent.Replace("\r\n", "");
                var segments = new List<Segment>();
                string[] Lines = messageContent.Split(new string[] { segmentSeparator }, StringSplitOptions.RemoveEmptyEntries);
                for (int i = 0; i < Lines.Length - 1; i++)//-1 here to remove MT segments from the end of report
                {
                    var segment = new Segment { FieldSeparator = FieldSeparator };
                    if (segment.GenerateSegment(Lines[i]))
                    {
                        segments.Add(segment);
                    }
                }
                if (segments.Count > 0)
                {
                    var ignoringList = new List<string> { "CI", "DM", "FI", "MH", "SI", "MT" };
                    claimreports.reportType = segments[0].Fields[(segments[0].Fields.Count - 1)];
                    var CIsegments = segments.Where(s => s.Name == "CI").ToList();
                    var othersegments = segments.Where(s => !ignoringList.Contains(s.Name)).ToList();
                    for (var c = 0; c < CIsegments.Count; c++)
                    {
                        var claimitem = new ClaimReportItem
                        {
                            ClearingHouseFileref = CIsegments[c].Fields[3],
                            ClearingHouseClaimref = CIsegments[c].Fields[4],
                            ClaimNumber = CIsegments[c].Fields[5],
                            PayerPlanID = CIsegments[c].Fields[12],
                            PracticeTaxCode = CIsegments[c].Fields[17],
                            ClaimMemberID = CIsegments[c].Fields[18]
                        };
                        var CI_otherSegments = othersegments.Where(e => e.Fields[4] == CIsegments[c].Fields[4]).ToList();
                        if (claimreports.reportType == "10")
                        {
                            CI_otherSegments = othersegments.Where(e => e.Fields[3] == CIsegments[c].Fields[4]).ToList();
                        }
                        for (var ci = 0; ci < CI_otherSegments.Count; ci++)
                        {
                            if (CI_otherSegments[ci].Name == "CE")//BATCH & CLAIM LEVEL REJECTION REPORT | 05
                            {

                                claimitem.ErrorFieldData = CI_otherSegments[ci].Fields[5];
                                claimitem.ErrorField = CI_otherSegments[ci].Fields[6];
                                claimitem.Message = CI_otherSegments[ci].Fields[8];
                                claimitem.ErrorRejectReason = CI_otherSegments[ci].Fields[9];
                                claimitem.ErrorLevel = CI_otherSegments[ci].Fields[10];
                                claimitem.ClaimNumber = CIsegments[c].Fields[6];
                            }
                            else if (CI_otherSegments[ci].Name == "PS")//PROVIDER CLAIM STATUS REPORT | 10
                            {
                                claimitem.PayerClaimID = CI_otherSegments[ci].Fields[7];
                                claimitem.SatatusSource = CI_otherSegments[ci].Fields[8];
                                claimitem.Message = CI_otherSegments[ci].Fields[11];
                                claimitem.SatatusCategory = CI_otherSegments[ci].Fields[17];
                                claimitem.ClaimStatus = CI_otherSegments[ci].Fields[18];

                            }
                            else if (CI_otherSegments[ci].Name == "WS")//FILE DETAIL SUMMARY REPORT | 04
                            {
                                claimitem.ClaimStatus = CI_otherSegments[ci].Fields[5];
                            }
                            claimreports.ClaimReportItems.Add(claimitem);
                        }
                    }

                }
                else
                {
                    Logger.Log.LogError("Claim Reports Parser segments = 0", "", "");
                }

                return claimreports;
            }
            catch (Exception ex)
            {
                Logger.Log.LogError("Claim Reports Parser " + ex.ToString(), "", "");
                return new ClaimReportModel();
            }
        }

    }
}
