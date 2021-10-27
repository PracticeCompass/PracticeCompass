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

namespace PracticeCompass.Messaging.Parsing
{
    public class ERAParser
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        private readonly IConfiguration _configuration;
        public ERAParser(ITechnoMedicUnitOfWork unitOfWork, IConfiguration configuration)

        {
            this.unitOfWork = unitOfWork;
            this._configuration = configuration;
        }
        public List<ElectronicRemittanceAdvice> Process835EraMessage(string messageContent, string segmentSeparator, string FieldSeparator, string InternalSeparator)
        {
            try
            {


                var eRaList = new List<ElectronicRemittanceAdvice>();
                //Replace \r\n with Empty string
                messageContent = messageContent.Replace("\r\n", "");
                var segments = new List<Segment>();
                string[] Lines = messageContent.Split(new string[] { segmentSeparator }, StringSplitOptions.RemoveEmptyEntries);
                for (int i = 0; i < Lines.Length; i++)
                {
                    var segment = new Segment { FieldSeparator = FieldSeparator };
                    if (segment.GenerateSegment(Lines[i]))
                    {
                        segments.Add(segment);
                    }
                }
                if (segments.Count < 6)//validate count of segments must be more than or equal 6
                {
                    throw new ValidationEXceptions.InvalidSegnmentsCountException(string.Format(
                   "Message Segnments Count '{0}' is less than minimum which is equal to 6", segments.Count));
                }
                var ISAHeaders = (from s in segments where s.Name == "ISA" select s).ToList();
                if (ISAHeaders == null || ISAHeaders.Count == 0)//validate if message contains at least one ISA segment
                {
                    throw new ValidationEXceptions.NoISASegnmentFoundException("No ISA segment found");
                }
                var IEATrailers = (from s in segments where s.Name == "IEA" select s).ToList();
                if (IEATrailers == null || IEATrailers.Count != IEATrailers.Count)//validate each ISA have IEA trailer or not 
                {
                    throw new ValidationEXceptions.IEATrailersNotMatchHeadersException("IEA count not match ISA Count");
                }
                for (int i = 0; i < ISAHeaders.Count; i++)
                {
                    var messageEnvelopeSegments = segments.GetRange(segments.IndexOf(ISAHeaders[i]) + 1,
                            segments.IndexOf(IEATrailers[i]) - segments.IndexOf(ISAHeaders[i]) - 1);
                    var functionalGroupHeaders = (from s in messageEnvelopeSegments where s.Name == "GS" select s).ToList();
                    if (functionalGroupHeaders == null || functionalGroupHeaders.Count == 0)
                    {
                        throw new ValidationEXceptions.MessageHeaderTrailersNotMatchedException("No GS segment found");
                    }
                    var functionalGroupTrailers = (from s in messageEnvelopeSegments where s.Name == "GE" select s).ToList();
                    if (functionalGroupTrailers == null || functionalGroupTrailers.Count != functionalGroupHeaders.Count)
                    {
                        throw new ValidationEXceptions.MessageHeaderTrailersNotMatchedException("No GE segment found or GS count not match GE count");
                    }
                    for (int j = 0; j < functionalGroupHeaders.Count; j++)
                    {
                        var functionalGroupEnvelopeSegments = messageEnvelopeSegments.GetRange(messageEnvelopeSegments.IndexOf(functionalGroupHeaders[j]) + 1,
                       messageEnvelopeSegments.IndexOf(functionalGroupTrailers[j]) - messageEnvelopeSegments.IndexOf(functionalGroupHeaders[j]) - 1);
                        var transactionHeaders = (from s in functionalGroupEnvelopeSegments where s.Name == "ST" select s).ToList();
                        if (transactionHeaders == null || transactionHeaders.Count == 0)
                        {
                            throw new ValidationEXceptions.MessageTransactionHeaderTrailersNotMatchedException("No ST segment found");
                        }
                        var transactionTrailers = (from s in functionalGroupEnvelopeSegments where s.Name == "SE" select s).ToList();
                        if (transactionTrailers == null || transactionTrailers.Count != transactionHeaders.Count)
                        {
                            throw new ValidationEXceptions.MessageTransactionHeaderTrailersNotMatchedException("No SE segment found or SE count not match ST count");
                        }
                        var interchangedata = new InterchangeData();
                        interchangedata.InterchangeControlId = ISAHeaders[i][13];
                        interchangedata.GroupControlId = functionalGroupHeaders[j][6];
                        interchangedata.ReceiverApplicationCode = functionalGroupHeaders[j][3];
                        interchangedata.SenderApplicationCode = functionalGroupHeaders[j][2];
                        interchangedata.ReceiverIdentifier = ISAHeaders[i][8];
                        interchangedata.SenderIdentifier = ISAHeaders[i][6];
                        for (int k = 0; k < transactionHeaders.Count; k++)
                        {
                            var transactionEnvelope = new Envelope { EnvelopeType = EnvelopeType.Transaction, SegmentSeparator = segmentSeparator };
                            transactionEnvelope.HeaderSegment = transactionHeaders[k];
                            transactionEnvelope.TrailerSegment = transactionTrailers[k];
                            transactionEnvelope.Segments = functionalGroupEnvelopeSegments.GetRange(functionalGroupEnvelopeSegments.IndexOf(transactionHeaders[k]) + 1,
                                functionalGroupEnvelopeSegments.IndexOf(transactionTrailers[k]) - functionalGroupEnvelopeSegments.IndexOf(transactionHeaders[k]) - 1);
                            var era = GetERAInformation(transactionEnvelope, InternalSeparator);
                            if (era != null)
                            {
                                var referencequalifiers= new List<string> { "0B", "1B", "1D", "1H", "1L", "1W", "28", "6P", "9A", "9C", "BB", "CCR", "CE", "EA", "F8", "G1", "G2", "IG", "SY" };
                                var messagereferences = (from s in segments where s.Name == "REF" && referencequalifiers.Contains(s[1]) select s).ToList();
                                for (int f = 0; f < messagereferences.Count; f++)
                                {
                                    era.ERAReferences.Add(new ERAReference
                                    {
                                        ReferenceID= messagereferences[f][2],
                                        ReferenceIDQualifier= messagereferences[f][1]
                                    });
                                }
                                era.Interchangedata = interchangedata;
                                eRaList.Add(era);
                            }
                        }
                    }
                }

                this.unitOfWork.ERATransactionRepository.SaveTransactions(eRaList);
                return eRaList;
            }
            catch (Exception ex)
            {
                return new List<ElectronicRemittanceAdvice>();
            }
        }
        public ElectronicRemittanceAdvice GetERAInformation(Envelope transactionEnvelope, string separator)
        {
            var eRa = new ElectronicRemittanceAdvice();

            #region FinancialInformation
            var financialInformationSegment = (from s in transactionEnvelope.Segments where s.Name == "BPR" select s).FirstOrDefault();
            if (financialInformationSegment == null)
            {
                throw new Exception("no financial information segment (BPR) found.");
            }
            eRa.financialInformation.HandlingMethod = financialInformationSegment[1];
            if (!string.IsNullOrEmpty(financialInformationSegment[2]) && decimal.TryParse(financialInformationSegment[2], out decimal financialAmount))
            {
                eRa.financialInformation.TotalPaidAmount = financialAmount;
            }
            eRa.financialInformation.CreditDebit = financialInformationSegment[3];
            if (!string.IsNullOrEmpty(financialInformationSegment[4]))
            {
                eRa.financialInformation.PaymentMethod = financialInformationSegment[4];
            }
            if (!string.IsNullOrEmpty(financialInformationSegment[5]))
            {
                eRa.financialInformation.PaymentFormat = financialInformationSegment[5];
            }
            if (!string.IsNullOrEmpty(financialInformationSegment[6]))
            {
                eRa.financialInformation.AccountNumber = financialInformationSegment[6];
            }
            eRa.financialInformation.senderAccountNbrQualifier = financialInformationSegment[8];
            eRa.financialInformation.DfiNumber = financialInformationSegment[7];
            eRa.financialInformation.senderAccountNumber = financialInformationSegment[9];
            eRa.financialInformation.CompanyId = financialInformationSegment[10];
            eRa.financialInformation.OriginCompanySupplementalCode = financialInformationSegment[11];
            eRa.financialInformation.RoutingNumber = financialInformationSegment[12];
            eRa.financialInformation.receiverDfiNumber = financialInformationSegment[13];
            eRa.financialInformation.receiverAcctNumberQualifier = financialInformationSegment[14];
            eRa.financialInformation.receiverAccountNumber = financialInformationSegment[15];
            if (string.IsNullOrEmpty(financialInformationSegment[16]))
            {
                throw new Exception("Payment Effective date is missing.");
            }
            eRa.financialInformation.PaymentEffectiveDate = new DateTime(int.Parse(financialInformationSegment[16].Substring(0, 4)),
                   int.Parse(financialInformationSegment[16].Substring(4, 2)), int.Parse(financialInformationSegment[16].Substring(6, 2)));
            var reAssociationTrace = (from s in transactionEnvelope.Segments where s.Name == "TRN" select s).FirstOrDefault();
            if (reAssociationTrace == null)
            {
                throw new Exception(" reAssociationTraceNumber segment (TRN) not found.");
            }
            if (string.IsNullOrEmpty(reAssociationTrace[2]))
            {
                throw new Exception("TraceNumber (TRN[2]) not found.");
            }
            eRa.financialInformation.TraceTypeCode = reAssociationTrace[1];
            eRa.financialInformation.ReferenceIdentificationNumber = reAssociationTrace[2];
            eRa.financialInformation.TraceOrigCompanySupplCode = reAssociationTrace[3];
            eRa.financialInformation.CheckTraceNbr = reAssociationTrace[4];
            var productionDateSegment = (from s in transactionEnvelope.Segments where s.Name == "DTM" && s[1] == "405" select s).FirstOrDefault();
            if (productionDateSegment != null && !string.IsNullOrEmpty(productionDateSegment[2]))
            {
                eRa.ProductionDate = new DateTime(int.Parse(productionDateSegment[2].Substring(0, 4)),
                   int.Parse(productionDateSegment[2].Substring(4, 2)), int.Parse(productionDateSegment[2].Substring(6, 2)));
            }
            #endregion
            #region Payer/Payee
            var payerIdentification = (from s in transactionEnvelope.Segments where s.Name == "N1" && s[1] == "PR" select s).FirstOrDefault();
            if (payerIdentification == null)
            {
                throw new Exception("Payer Identification Segment  (N1) not found");
            }
            eRa.Payer.Name = payerIdentification[2];
            if (payerIdentification.Fields.Count >= 4)
                eRa.Payer.IDCode = payerIdentification[4];
            var payerAddress = transactionEnvelope.Segments[transactionEnvelope.Segments.IndexOf(payerIdentification) + 1];
            if (payerAddress == null)
            {
                throw new Exception("Payer address Segment  (N3) not found");
            }
            eRa.Payer.Address.Line1 = payerAddress[1];
            eRa.Payer.Address.Line2 = string.IsNullOrEmpty(payerAddress[2]) ?
                   "" : payerAddress[2];
            var payerCity = transactionEnvelope.Segments[transactionEnvelope.Segments.IndexOf(payerAddress) + 1];
            if (payerAddress == null)
            {
                throw new Exception("Payer City Segment  (N4) not found");
            }
            eRa.Payer.Address.City = payerCity[1];
            eRa.Payer.Address.State = payerCity[2];
            eRa.Payer.Address.ZipCode = payerCity[3];
            var payercontactinfo = transactionEnvelope.Segments[transactionEnvelope.Segments.IndexOf(payerCity) + 1];
            if (payercontactinfo == null)
            {
                throw new Exception("Payer Contact Info Segment  (PER) not found");
            }
            eRa.Payer.ContactFunctionCode = payercontactinfo[1];
            eRa.Payer.ClaimContactName = payercontactinfo[2];

            var payeeIdentifier = (from s in transactionEnvelope.Segments where s.Name == "N1" && s[1] == "PE" select s).FirstOrDefault();
            if (payeeIdentifier == null)
            {
                throw new Exception("Payee identifier segment (N1)  not found");
            }
            eRa.Payee.Name = payeeIdentifier[2];
            eRa.Payee.IDCodeQualifier = payeeIdentifier[3];
            eRa.Payee.IDCode = payeeIdentifier[4];
            var payeeAddress = transactionEnvelope.Segments[transactionEnvelope.Segments.IndexOf(payeeIdentifier) + 1];
            if (payerAddress == null)
            {
                throw new Exception("Payee address Segment (N3) not found");
            }
            eRa.Payee.Address.Line1 = payeeAddress[1];
            eRa.Payee.Address.Line2 = string.IsNullOrEmpty(payeeAddress[2]) ?
                "" : payeeAddress[2];
            var payeeCity = transactionEnvelope.Segments[transactionEnvelope.Segments.IndexOf(payeeAddress) + 1];
            if (payerAddress == null)
            {
                throw new Exception("Payee City, State, Zip Segment  (N4) not found");
            }
            eRa.Payee.Address.City = payeeCity[1];
            eRa.Payee.Address.State = payeeCity[2];
            eRa.Payee.Address.ZipCode = payeeCity[3];
            #endregion
            #region Claim Details
            var claimHeaders = (from s in transactionEnvelope.Segments where s.Name == "LX" select s).ToList();
            if (claimHeaders == null || claimHeaders.Count == 0)
            {
                throw new Exception(" Claim information  (LX) not found");
            }
            for (int i = 0; i < claimHeaders.Count; i++)
            {
                var cliamgroup = new ClaimHeaderGroup();
                var childSegments = transactionEnvelope.Segments.GetRange(transactionEnvelope.Segments.IndexOf(claimHeaders[i]),
                        i == (claimHeaders.Count - 1) ? transactionEnvelope.Segments.Count - transactionEnvelope.Segments.IndexOf(claimHeaders[i])
                            : transactionEnvelope.Segments.IndexOf(claimHeaders[i + 1]) - transactionEnvelope.Segments.IndexOf(claimHeaders[i]));
                if (childSegments == null || childSegments.Count == 0)
                {
                    throw new Exception(string.Format("claim {0} No child found", i + 1));
                }
                cliamgroup.HeaderNumber = claimHeaders[i][1];
                var providerdetail = (from s
                        in childSegments
                                      where s.Name == "TS3"
                                      select s).FirstOrDefault();
                if (providerdetail != null)
                {
                    cliamgroup.ProviderIdentifier = providerdetail[1];
                    cliamgroup.FacilityCode = providerdetail[2];
                    if (!string.IsNullOrEmpty(providerdetail[3]))
                    {
                        cliamgroup.ProviderFiscalYearEndsOn = new DateTime(int.Parse(providerdetail[3].Substring(0, 4)),
                            int.Parse(providerdetail[3].Substring(4, 2)),
                            int.Parse(providerdetail[3].Substring(6, 2)));
                    }
                    if (!string.IsNullOrEmpty(providerdetail[4]))
                    {
                        cliamgroup.ClaimsCount = int.Parse(providerdetail[4]);
                    }
                    if (!string.IsNullOrEmpty(providerdetail[5]))
                    {
                        cliamgroup.TotalClaimMonetaryValue = decimal.Parse(providerdetail[5]);
                    }
                }
                var claimDetailedLoops = (from s in childSegments where s.Name == "CLP" select s).ToList();
                if (claimDetailedLoops == null || claimDetailedLoops.Count == 0)
                {
                    throw new Exception("claim detailed loops  (CLP) not found");
                }
                var claimDetail = new ClaimDetails();
                for (int j = 0; j < claimDetailedLoops.Count; j++)
                {

                    List<Segment> claimChildSegments = childSegments.GetRange(childSegments.IndexOf(claimDetailedLoops[j]),
                        j == (claimDetailedLoops.Count - 1) ? childSegments.Count - childSegments.IndexOf(claimDetailedLoops[j])
                            : childSegments.IndexOf(claimDetailedLoops[j + 1]) - childSegments.IndexOf(claimDetailedLoops[j]));
                    if (claimChildSegments == null || claimChildSegments.Count == 0)
                    {
                        throw new Exception("No child segments found for claim loop");
                    }
                    claimDetail.PatientAccountNumber = claimDetailedLoops[j][1];
                    claimDetail.Status = claimDetailedLoops[j][2];
                    if (!string.IsNullOrEmpty(claimDetailedLoops[j][3])
                        && decimal.TryParse(claimDetailedLoops[j][3], out decimal claimBilled))
                    {
                        claimDetail.BilledAmount = claimBilled;
                    }
                    if (!string.IsNullOrEmpty(claimDetailedLoops[j][4])
                        && decimal.TryParse(claimDetailedLoops[j][4], out decimal claimPaid))
                    {
                        claimDetail.PaidAmount = claimPaid;
                    }
                    decimal patientResponsibility = 0;
                    if (!string.IsNullOrEmpty(claimDetailedLoops[j][5])
                        && decimal.TryParse(claimDetailedLoops[j][5], out patientResponsibility))
                    {
                        claimDetail.PatientResponsibilityAmount = patientResponsibility;
                    }
                    if (!string.IsNullOrEmpty(claimDetailedLoops[j][6]))
                    {
                        claimDetail.Type = claimDetailedLoops[j][6];
                    }
                    if (string.IsNullOrEmpty(claimDetailedLoops[j][7]))
                    {
                        throw new Exception("Payer identifier (CLP[7]) mandatory");
                    }
                    claimDetail.FacilityTypeCode = claimDetailedLoops[j].Fields.Count >= 8 ? claimDetailedLoops[j][8] : "";
                    claimDetail.FacilityTypeCode = claimDetailedLoops[j].Fields.Count >= 9 ? claimDetailedLoops[j][9] : "";
                    claimDetail.DiagnosisRelatedGroupCode = claimDetailedLoops[j].Fields.Count >= 11 ? claimDetailedLoops[j][11] : "";
                    claimDetail.DiagnosisRelatedGroupWeight = (claimDetailedLoops[j].Fields.Count >= 12 && !string.IsNullOrEmpty(claimDetailedLoops[j][12])) ? decimal.Parse(claimDetailedLoops[j][12]) : 0;
                    claimDetail.DischargeFraction = (claimDetailedLoops[j].Fields.Count >= 13 && !string.IsNullOrEmpty(claimDetailedLoops[j][13])) ? decimal.Parse(claimDetailedLoops[j][13]) : 0;
                    var patientSegment = (from s in claimChildSegments where s.Name == "NM1" && s[1] == "QC" && s[2] == "1" select s).FirstOrDefault();
                    if (patientSegment == null)
                    {
                        throw new Exception(string.Format("Patient information for Claim {0} not found", j));
                    }
                    claimDetail.Patient.LastName = patientSegment[3];
                    claimDetail.Patient.FirstName = patientSegment[4];
                    claimDetail.Patient.MiddleName = patientSegment[5];
                    claimDetail.Patient.Suffix = patientSegment[7];
                    if (!string.IsNullOrEmpty(patientSegment[8]))
                    {
                        // claimDetail.Patient.Qualifier = GetPatientIdentifierFromCode(patientSegment[8]);
                        claimDetail.Patient.Qualifier = patientSegment[8];
                        claimDetail.Patient.Identifier = patientSegment[9];
                    }
                    var subscriberSegment = (from s in claimChildSegments where s.Name == "NM1" && s[1] == "IL" && s[2] == "1" select s).FirstOrDefault();
                    if (subscriberSegment != null)
                    {
                        claimDetail.Subscriber.LastName = subscriberSegment[3];
                        claimDetail.Subscriber.FirstName = subscriberSegment[4];
                        claimDetail.Subscriber.MiddleName = subscriberSegment[5];
                        if (!string.IsNullOrEmpty(subscriberSegment[8]))
                        {
                            claimDetail.Subscriber.Qualifier = GetPatientIdentifierFromCode(subscriberSegment[8]);
                            claimDetail.Subscriber.Identifier = subscriberSegment[9];
                        }
                    }
                    var providerSegment = (from s in claimChildSegments where s.Name == "NM1" && s[1] == "82" && s[2] == "1" select s).FirstOrDefault();
                    if (providerSegment != null)
                    {
                        claimDetail.Provider.LastName = providerSegment[3];
                        claimDetail.Provider.FirstName = providerSegment[4];
                        claimDetail.Provider.MiddleName = providerSegment[5];
                        claimDetail.Provider.Suffix = providerSegment[7];
                        claimDetail.Provider.IDCodeQualifier = providerSegment[8];
                        if (!string.IsNullOrEmpty(providerSegment[8]) && providerSegment[8] == "XX")
                        {
                            claimDetail.Provider.NPI = providerSegment[9];
                        }
                    }
                    var transferToSegment = (from s in claimChildSegments where s.Name == "NM1" && s[1] == "TT" && s[2] == "2" select s).FirstOrDefault();
                    if (transferToSegment != null)
                    {
                        claimDetail.Carrier.Name = transferToSegment[3];
                        if (!string.IsNullOrEmpty(transferToSegment[8]))
                        {
                            claimDetail.Carrier.Qualifier = GetCarrierTypefromCode(transferToSegment[8]);
                            claimDetail.Carrier.Identifier = transferToSegment[9];
                            if (claimDetail.Carrier.Qualifier == PayerIdentifierType.FederalTaxPayerId)//EDI identifier if NM1[8] : FI
                            {
                                claimDetail.Carrier.EdiIdentifier = claimDetail.Carrier.Identifier;
                            }
                        }
                    }
                    var claimReceivedDateSegment = (from s in claimChildSegments where s.Name == "DTM" && s[1] == "050" select s).FirstOrDefault();
                    if (claimReceivedDateSegment != null && claimReceivedDateSegment.Fields.Count > 1 && !string.IsNullOrEmpty(claimReceivedDateSegment[2]))
                    {
                        claimDetail.ClaimReceivedDate = new DateTime(int.Parse(claimReceivedDateSegment[2].Substring(0, 4)),
                            int.Parse(claimReceivedDateSegment[2].Substring(4, 2)), int.Parse(claimReceivedDateSegment[2].Substring(6, 2)));
                    }
                    var payercommunication = (from s in claimChildSegments where s.Name == "PER" && s[1] == "CX" select s).FirstOrDefault();
                    if (payercommunication != null)
                    {
                        eRa.Payer.CommunicationsNbrQualifier = payercommunication[3];
                        eRa.Payer.NbrFunctionCode = payercommunication[1];
                        eRa.Payer.ClaimContactCommunicationsNbr = payercommunication[4];
                    }
                    var statementFromDateSegment = (from s in claimChildSegments where s.Name == "DTM" && s[1] == "232" select s).FirstOrDefault();
                    if (statementFromDateSegment != null && !string.IsNullOrEmpty(statementFromDateSegment[2]))
                    {
                        claimDetail.StatementStartDate = new DateTime(int.Parse(statementFromDateSegment[2].Substring(0, 4)),
                            int.Parse(statementFromDateSegment[2].Substring(4, 2)), int.Parse(statementFromDateSegment[2].Substring(6, 2)));
                    }
                    var statementToDateSegment = (from s in claimChildSegments where s.Name == "DTM" && s[1] == "233" select s).FirstOrDefault();
                    if (statementToDateSegment != null && !string.IsNullOrEmpty(statementToDateSegment[2]))
                    {
                        claimDetail.StatementEndDate = new DateTime(int.Parse(statementToDateSegment[2].Substring(0, 4)),
                            int.Parse(statementToDateSegment[2].Substring(4, 2)), int.Parse(statementToDateSegment[2].Substring(6, 2)));
                    }
                    var outpatientAdjudicationSegment = (from s in claimChildSegments where s.Name == "MOA" select s).FirstOrDefault();
                    if (outpatientAdjudicationSegment != null)
                    {
                        if (!string.IsNullOrEmpty(outpatientAdjudicationSegment[1]))
                        {
                            claimDetail.OutPatientAdjudication.MedicareMedicaidReimbursementRate = decimal.Parse(outpatientAdjudicationSegment[1]);
                        }
                        if (!string.IsNullOrEmpty(outpatientAdjudicationSegment[2]))
                        {
                            claimDetail.OutPatientAdjudication.HcpcsMonetaryAmount = decimal.Parse(outpatientAdjudicationSegment[2]);
                        }
                        // Remarks (5 remark codes per MOA segment, starting of 3rd element)
                        for (int remarks = 0; remarks < 5; remarks++)
                        {
                            if (!string.IsNullOrEmpty(outpatientAdjudicationSegment[i + 3]))
                            {
                                claimDetail.OutPatientAdjudication.Remarks.Add(GetRemarkFromCode(outpatientAdjudicationSegment[i + 3]));
                            }
                        }
                    }
                    var claimInfo = new List<Segment>();
                    var serviceLineHeaders = (from s in claimChildSegments where s.Name == "SVC" select s).ToList();
                    if (serviceLineHeaders != null && serviceLineHeaders.Count > 0)
                    {
                        claimInfo = claimChildSegments.GetRange(0, claimChildSegments.IndexOf(serviceLineHeaders[0]));
                        for (int serviceLine = 0; serviceLine < serviceLineHeaders.Count; serviceLine++)
                        {
                            List<Segment> serviceLineChildSegments = claimChildSegments.GetRange(claimChildSegments.IndexOf(serviceLineHeaders[serviceLine]),
                                serviceLine == (serviceLineHeaders.Count - 1) ?
                                    claimChildSegments.Count - claimChildSegments.IndexOf(serviceLineHeaders[serviceLine]) :
                                    claimChildSegments.IndexOf(serviceLineHeaders[serviceLine + 1]) - claimChildSegments.IndexOf(serviceLineHeaders[serviceLine]));
                            claimDetail.ServiceLineItems.Add(GetServiceLineFromSegments(serviceLineChildSegments, separator));
                        }
                    }
                    else
                    {
                        claimInfo = claimChildSegments;
                    }
                    var claimLevelAdjustmetSegments = (from s in claimInfo where s.Name == "CAS" select s).ToList();
                    if (claimLevelAdjustmetSegments != null && claimLevelAdjustmetSegments.Count > 0)
                    {
                        for (int claimAdjCtr = 0; claimAdjCtr < claimLevelAdjustmetSegments.Count; claimAdjCtr++)
                        {
                            ClaimAdjustment adjustment = GetClaimAdjustment(claimLevelAdjustmetSegments[claimAdjCtr]);
                            claimDetail.Adjustments.Add(adjustment);
                        }
                    }
                    cliamgroup.ClaimRemittanceAdviceItems.Add(claimDetail);
                }
                eRa.ClaimHeaderGroups.Add(cliamgroup);
            }
            #endregion
            #region Provider Adjustment
            var providerAdjustmentSegments = (from s in transactionEnvelope.Segments where s.Name == "PLB" select s).ToList();
            if (providerAdjustmentSegments != null && providerAdjustmentSegments.Count > 0)
            {
                for (int providerAdjustment = 0; providerAdjustment < providerAdjustmentSegments.Count; providerAdjustment++)
                {
                    var adjustmentSegment = providerAdjustmentSegments[providerAdjustment];
                    string providerIdentifier = string.Empty;
                    DateTime fiscalPeriod = new DateTime(1900, 1, 1);
                    if (!string.IsNullOrEmpty(adjustmentSegment[1]))
                    {
                        providerIdentifier = adjustmentSegment[1];
                    }
                    if (!string.IsNullOrEmpty(adjustmentSegment[2]))
                    {
                        fiscalPeriod = new DateTime(int.Parse(adjustmentSegment[2].Substring(0, 4)),
                            int.Parse(adjustmentSegment[2].Substring(4, 2)),
                            int.Parse(adjustmentSegment[2].Substring(6, 2)));
                    }
                    for (int interAdjCtr = 0; interAdjCtr < 6; interAdjCtr++)
                    {
                        if (adjustmentSegment.Fields.Count < (2 * interAdjCtr + 3))
                        {
                            break;
                        }
                        var adjustment = new ProviderAdjustment();
                        adjustment.ProviderIdentifer = providerIdentifier;
                        adjustment.FiscalPeriodEndDate = fiscalPeriod;
                        string[] adjIdentifierComponents = adjustmentSegment[2 * interAdjCtr + 3].Split(separator);
                        adjustment.AdjustmentReason = adjIdentifierComponents[0];
                        if (adjIdentifierComponents.Length > 1)
                        {
                            adjustment.ReferenceIdentification = adjIdentifierComponents[1];
                        }
                        if (string.IsNullOrEmpty(adjustmentSegment[2 * interAdjCtr + 4])
                            && decimal.TryParse(adjustmentSegment[2 * interAdjCtr + 4], out decimal amount))
                        {
                            throw new Exception("Adjustment Monetary amount is missing PLB04.");
                        }
                        amount = decimal.Parse(adjustmentSegment[2 * interAdjCtr + 4]);
                        adjustment.Amount = amount;
                        eRa.ProviderAdjustments.Add(adjustment);
                    }
                }
            }
            #endregion
            return eRa;
        }
        private static TransactionHandlingMethod GetHandlingMethodFromCode(string code)
        {
            var method = TransactionHandlingMethod.None;
            switch (code)
            {
                case "C":
                    method = TransactionHandlingMethod.PaymentWithTransaction;
                    break;
                case "D":
                    method = TransactionHandlingMethod.MakePaymentOnly;
                    break;
                case "H":
                    method = TransactionHandlingMethod.NotificationOnly;
                    break;
                case "I":
                    method = TransactionHandlingMethod.RemittanceInformationOnly;
                    break;
                case "P":
                    method = TransactionHandlingMethod.Prenotification;
                    break;
                case "U":
                    method = TransactionHandlingMethod.Split;
                    break;
                case "X":
                    method = TransactionHandlingMethod.SplitOrTogether;
                    break;
            }
            return method;
        }
        private static CreditDebit GetCreditDebitFromCode(string code)
        {
            var CreditDebitcode = CreditDebit.None;
            switch (code)
            {
                case "C":
                    CreditDebitcode = CreditDebit.Credit;
                    break;
                case "D":
                    CreditDebitcode = CreditDebit.Debit;
                    break;
                default:
                    CreditDebitcode = CreditDebit.None;
                    break;
            }
            return CreditDebitcode;
        }
        private static PaymentMethod GetPaymentMethodFromCode(string code)
        {
            var method = PaymentMethod.None;
            switch (code)
            {
                case "ACH":
                    method = PaymentMethod.AutomatedClearingHouse;
                    break;
                case "BOP":
                    method = PaymentMethod.FinancialInstitutionOption;
                    break;
                case "CHK":
                    method = PaymentMethod.Check;
                    break;
                case "FWT":
                    method = PaymentMethod.FederalReserveFundsOrWireTransfer;
                    break;
            }
            return method;
        }
        private static PaymentFormat GetPaymentFormatFromCode(string code)
        {
            var qual = PaymentFormat.None;
            switch (code)
            {
                case "CCP":
                    qual = PaymentFormat.CashConcentrationPlusAddenda;
                    break;
                case "CTX":
                    qual = PaymentFormat.CorporateTradeExchange;
                    break;
            }
            return qual;
        }
        private static DepositoryFinancialInstitutionType GetDfiDestinationQualifierFromCode(string code)
        {
            DepositoryFinancialInstitutionType qual = DepositoryFinancialInstitutionType.None;
            switch (code)
            {
                case "01":
                    qual = DepositoryFinancialInstitutionType.RoutingNumber;
                    break;
                case "04":
                    qual = DepositoryFinancialInstitutionType.CanadianBankNumber;
                    break;
            }
            return qual;
        }
        private static ClaimStatus GetClaimStatusFromCode(string code)
        {
            ClaimStatus cc = ClaimStatus.None;
            switch (code)
            {
                case "1":
                    cc = ClaimStatus.ProcessedAsPrimary;
                    break;
                case "2":
                    cc = ClaimStatus.ProcessedAsSecondary;
                    break;
                case "3":
                    cc = ClaimStatus.ProcessedAsTertiary;
                    break;
                case "4":
                    cc = ClaimStatus.Denied;
                    break;
                case "19":
                    cc = ClaimStatus.ProcessedAsPrimaryAndForwarededToAdditionalPayers;
                    break;
                case "20":
                    cc = ClaimStatus.ProcessedAsSecondaryAndForwarededToAdditionalPayers;
                    break;
                case "21":
                    cc = ClaimStatus.ProcessedAsTertiaryAndForwarededToAdditionalPayers;
                    break;
                case "22":
                    cc = ClaimStatus.ReversalOfPreviousPayment;
                    break;
                case "23":
                    cc = ClaimStatus.NotOurClaimForwardedToAdditionalPayers;
                    break;
                case "24":
                    cc = ClaimStatus.PredeterminationPricingOnlyAndNoPayment;
                    break;
            }
            return cc;
        }
        private static ClaimFilingType GetClaimTypeFromCode(string code)
        {
            ClaimFilingType q = ClaimFilingType.None;
            switch (code)
            {
                case "12":
                    q = ClaimFilingType.PreferredProviderOrganization;
                    break;
                case "13":
                    q = ClaimFilingType.PointOfService;
                    break;
                case "14":
                    q = ClaimFilingType.ExclusiveProviderOrganization;
                    break;
                case "15":
                    q = ClaimFilingType.IndemnityInsurance;
                    break;
                case "16":
                    q = ClaimFilingType.HealthMaintenanceOrgranizationMedicareRisk;
                    break;
                case "17":
                    q = ClaimFilingType.DentalMaintenanceOrganization;
                    break;
                case "AM":
                    q = ClaimFilingType.AutomobileMedical;
                    break;
                case "CH":
                    q = ClaimFilingType.Champus;
                    break;
                case "CI":
                    q = ClaimFilingType.CommercialInsurance;
                    break;
                case "Disability":
                    q = ClaimFilingType.Disability;
                    break;
                case "HM":
                    q = ClaimFilingType.HealthMaintenanceOrganization;
                    break;
                case "LM":
                    q = ClaimFilingType.LiabilityMedical;
                    break;
                case "MA":
                    q = ClaimFilingType.MedicarePartA;
                    break;
                case "MB":
                    q = ClaimFilingType.MedicarePartB;
                    break;
                case "MC":
                    q = ClaimFilingType.Medicaid;
                    break;
                case "OF":
                    q = ClaimFilingType.OtherFederalProgram;
                    break;
                case "TV":
                    q = ClaimFilingType.TitleV;
                    break;
                case "VA":
                    q = ClaimFilingType.VeteransAffairsPlan;
                    break;
                case "WC":
                    q = ClaimFilingType.WorkersCompensationHealthClaim;
                    break;
                case "ZZ":
                    q = ClaimFilingType.MutuallyDefined;
                    break;
            }
            return q;
        }
        private static PatientIdentification GetPatientIdentifierFromCode(string idQualifierCode)
        {
            var id = PatientIdentification.None;
            switch (idQualifierCode)
            {
                case "34":
                    id = PatientIdentification.SocialSecurityNumber;
                    break;
                case "HN":
                    id = PatientIdentification.HealthInsuranceClaimNumber;
                    break;
                case "II":
                    id = PatientIdentification.UniqueHealthIdentifier;
                    break;
                case "MI":
                    id = PatientIdentification.MemberIdentificationNumber;
                    break;
                case "MR":
                    id = PatientIdentification.MedicaidRecipientId;
                    break;
                case "FI":
                    id = PatientIdentification.FederalTaxPayer;
                    break;
            }
            return id;
        }
        private static PayerIdentifierType GetCarrierTypefromCode(string code)
        {
            var q = PayerIdentifierType.None;
            switch (code)
            {
                case "AD":
                    q = PayerIdentifierType.BlueCrossBlueShieldPlanCode;
                    break;
                case "FI":
                    q = PayerIdentifierType.FederalTaxPayerId;
                    break;
                case "NI":
                    q = PayerIdentifierType.NaicId;
                    break;
                case "PI":
                    q = PayerIdentifierType.PayerIdentification;
                    break;
                case "PP":
                    q = PayerIdentifierType.PharmacyProcessorNumber;
                    break;
                case "XV":
                    q = PayerIdentifierType.MedicareMedicaidPlanId;
                    break;
            }
            return q;
        }
        public ERARemark GetRemarkFromCode(string code)
        {
            var remark = new ERARemark();
            remark.Code = code;
            switch (code)
            {
                case "MA01":
                    remark.Description = "you may appeal our decision";
                    break;
                case "MA07":
                    remark.Description = "The claim information has also been forwarded to Medicaid for review.";
                    break;
            }
            return remark;
        }
        private static ServiceLine GetServiceLineFromSegments(List<Segment> serviceLineChildSegments, string separator)
        {
            var serviceLine = new ServiceLine();
            var serviceInfo = (from s in serviceLineChildSegments where s.Name == "SVC" select s).FirstOrDefault();
            if (serviceInfo == null)
            {
                return null;
            }
            serviceLine.Procedure = GetMedicalProcedure(serviceInfo[1], separator);
            if (!string.IsNullOrEmpty(serviceInfo[2]) && decimal.TryParse(serviceInfo[2], out decimal billed))
            {
                serviceLine.BilledMonetaryAmount = billed;
            }
            else
            {
                throw new Exception("(SVC[2]) not found");
            }
            if (!string.IsNullOrEmpty(serviceInfo[3]) && decimal.TryParse(serviceInfo[3], out decimal paid))
            {
                serviceLine.PaidMonetaryAmount = paid;
                int units = 1;
                if (!string.IsNullOrEmpty(serviceInfo[5]) && int.TryParse(serviceInfo[5], out units))
                {
                    units = int.Parse(serviceInfo[5]);
                    serviceLine.Units = units;
                }
            }
            else
            {
                throw new Exception("(SVC[3]) not found");
            }
            var dateOfService = (from s in serviceLineChildSegments where s.Name == "DTM" && s[1] == "472" select s).FirstOrDefault();
            if (dateOfService != null && !string.IsNullOrEmpty(dateOfService[2]))
            {
                serviceLine.DateOfService = new DateTime(int.Parse(dateOfService[2].Substring(0, 4)),
                int.Parse(dateOfService[2].Substring(4, 2)), int.Parse(dateOfService[2].Substring(6, 2)));
            }
            var controlNumberSegment = (from s in serviceLineChildSegments where s.Name == "REF" && s[1] == "6R" select s).FirstOrDefault();
            if (controlNumberSegment != null && !string.IsNullOrEmpty(controlNumberSegment[2]))
            {
                serviceLine.ControlNumber = controlNumberSegment[2];
            }
            var renderingProviderIds = new List<string> { "0B", "1A", "1B", "1C", "1D", "1G", "1H", "1J", "D3", "G2", "LU", "HPI", "SY", "TJ" };
            var renderingProviderSegment = (from s
                                                in serviceLineChildSegments
                                            where s.Name == "REF" && renderingProviderIds.Contains(s[1])
                                            select s).FirstOrDefault();
            if (renderingProviderSegment != null)
            {

                var type = GetSecondaryProviderType(renderingProviderSegment[1]);
                if (type == ProviderSecIdentifierType.NPI)
                {
                    serviceLine.RenderingProvider.NPI = renderingProviderSegment[2];
                }
                else
                {
                    var id = new ProviderSecIdentifier { Type = type, Identifier = renderingProviderSegment[2] };
                    serviceLine.RenderingProvider.SecondaryIdentifiers.Add(id);
                }
            }
            var supplementalAmountSegments = (from s in serviceLineChildSegments where s.Name == "AMT" select s).ToList();
            if (supplementalAmountSegments != null && supplementalAmountSegments.Count > 0)
            {
                for (int i = 0; i < supplementalAmountSegments.Count; i++)
                {
                    var supplementalAmnt = new ServiceLineSupplementalAmount();
                    if (!string.IsNullOrEmpty(supplementalAmountSegments[i][1]))
                    {
                        supplementalAmnt.Type = GetServiceLineSupplementalAmount(supplementalAmountSegments[i][1]);
                        decimal amount = -1;
                        if (!string.IsNullOrEmpty(supplementalAmountSegments[i][2]) && decimal.TryParse(supplementalAmountSegments[i][2], out amount))
                        {
                            supplementalAmnt.Amount = amount;
                        }
                    }
                    serviceLine.SupplementalAmounts.Add(supplementalAmnt);
                }
            }
            var adjustmentSegments = (from s in serviceLineChildSegments where s.Name == "CAS" select s).ToList();
            for (int i = 0; i < adjustmentSegments.Count; i++)
            {
                var adj = GetClaimAdjustment(adjustmentSegments[i]);
                serviceLine.Adjustments.Add(adj);
            }

            return serviceLine;
        }
        private static ClaimAdjustment GetClaimAdjustment(Segment segment)
        {
            var adjustment = new ClaimAdjustment();
            if (!string.IsNullOrEmpty(segment[1]))
            {
                // adjustment.Type = GetClaimAdjustmentType(segment[1]);
                adjustment.Type = segment[1];
            }
            // Up to 6 adjustment  each one 3 elements per segment
            for (int i = 0; i < 6; i++)
            {
                if (segment.Fields.Count >= (3 * i + 3) && !string.IsNullOrEmpty(segment[3 * i + 2])
                    && !string.IsNullOrEmpty(segment[3 * i + 3]))
                {
                    var model = new AdjustmentModel();
                    model.Reason.IdentifyingCode = segment[3 * i + 2];
                    if (decimal.TryParse(segment[3 * i + 3], out decimal amount))
                    {
                        model.MonetaryAmount = amount;
                        if (segment.Fields.Count >= (3 * i + 4) && int.TryParse(segment[3 * i + 4], out int quantity))
                        {
                            model.Quantity = quantity;
                        }
                    }
                    adjustment.AdjustmentModel.Add(model);
                }
                else
                {
                    break;
                }
            }
            return adjustment;
        }
        private static MedicalProcedure GetMedicalProcedure(string content, string separator)
        {
            var procedure = new MedicalProcedure();
            string[] components = content.Split(separator.ToCharArray());
            if (components.Length > 0)
            {
                procedure.Qualifier = components[0];
            }
            if (components.Length > 1)
            {
                procedure.Code = components[1];
            }
            if (components.Length > 2)
            {
                procedure.Modifier1 = components[2];
            }
            if (components.Length > 3)
            {
                procedure.Modifier2 = components[3];
            }
            if (components.Length > 4)
            {
                procedure.Modifier3 = components[4];
            }
            if (components.Length > 5)
            {
                procedure.Modifier4 = components[5];
            }
            return procedure;
        }
        private static MedicalProcedureCodeType GetProcedureQualifier(string code)
        {
            MedicalProcedureCodeType qualifier = MedicalProcedureCodeType.None;
            switch (code)
            {
                case "AD":
                    qualifier = MedicalProcedureCodeType.AmericanDentalAssociationCode;
                    break;
                case "ER":
                    qualifier = MedicalProcedureCodeType.JurisdictionSepcificProdecureSupplyCode;
                    break;
                case "HC":
                    qualifier = MedicalProcedureCodeType.CptCode;
                    break;
                case "HP":
                    qualifier = MedicalProcedureCodeType.HippsRateCode;
                    break;
                case "IV":
                    qualifier = MedicalProcedureCodeType.HiecServiceCode;
                    break;
                case "N4":
                    qualifier = MedicalProcedureCodeType.National542DrugCode;
                    break;
                case "N6":
                    qualifier = MedicalProcedureCodeType.National46HealthRelatedItemCode;
                    break;
                case "NU":
                    qualifier = MedicalProcedureCodeType.NationalUniformBillingCommitte;
                    break;
                case "UI":
                    qualifier = MedicalProcedureCodeType.UpcConsumerPackageCode;
                    break;
                case "WK":
                    qualifier = MedicalProcedureCodeType.AdvancedBillingConceptsCode;
                    break;
            }
            return qualifier;
        }
        private static ProviderSecIdentifierType GetSecondaryProviderType(string code)
        {
            switch (code)
            {
                case "0B":
                    return ProviderSecIdentifierType.StateLicenseNumber;
                case "1A":
                    return ProviderSecIdentifierType.BlueCrossProviderNumber;
                case "1B":
                    return ProviderSecIdentifierType.BlueShieldProviderNumber;
                case "1C":
                    return ProviderSecIdentifierType.MedicareProviderNumber;
                case "1D":
                    return ProviderSecIdentifierType.MedicaidProviderNumber;
                case "1G":
                    return ProviderSecIdentifierType.ProviderUpin;
                case "1H":
                    return ProviderSecIdentifierType.ChampusIdNumber;
                case "1J":
                    return ProviderSecIdentifierType.FacilityIdNumber;
                case "D3":
                    return ProviderSecIdentifierType.PharmacyNumber;
                case "G2":
                    return ProviderSecIdentifierType.ProviderCommercialNumber;
                case "LU":
                    return ProviderSecIdentifierType.LocationNumber;
                case "HPI":
                    return ProviderSecIdentifierType.NPI;
                case "SY":
                    return ProviderSecIdentifierType.SSN;
                case "TJ":
                    return ProviderSecIdentifierType.TIN;
                default:
                    return ProviderSecIdentifierType.None;
            }
        }
        private static ServiceSuplementalAmountType GetServiceLineSupplementalAmount(string code)
        {
            ServiceSuplementalAmountType qualifier = ServiceSuplementalAmountType.None;
            switch (code)
            {
                case "B6":
                    qualifier = ServiceSuplementalAmountType.Allowed;
                    break;
                case "KH":
                    qualifier = ServiceSuplementalAmountType.Deduction;
                    break;
                case "T":
                    qualifier = ServiceSuplementalAmountType.Tax;
                    break;
                case "T2":
                    qualifier = ServiceSuplementalAmountType.TotalClaimBeforeTaxes;
                    break;
                case "ZK":
                    qualifier = ServiceSuplementalAmountType.FederalPaymentCategory1;
                    break;
                case "ZL":
                    qualifier = ServiceSuplementalAmountType.FederalPaymentCategory2;
                    break;
                case "ZM":
                    qualifier = ServiceSuplementalAmountType.FederalPaymentCategory3;
                    break;
                case "ZN":
                    qualifier = ServiceSuplementalAmountType.FederalPaymentCategory4;
                    break;
                case "ZO":
                    qualifier = ServiceSuplementalAmountType.FedernalPaymentCategory5;
                    break;
                case "AU":
                    qualifier = ServiceSuplementalAmountType.AU;
                    break;
                case "DY":
                    qualifier = ServiceSuplementalAmountType.DY;
                    break;
                case "F5":
                    qualifier = ServiceSuplementalAmountType.F5;
                    break;
                case "I":
                    qualifier = ServiceSuplementalAmountType.I;
                    break;
                case "NL":
                    qualifier = ServiceSuplementalAmountType.NL;
                    break;
            }
            return qualifier;
        }
        private static AdjustmentType GetClaimAdjustmentType(string code)
        {
            AdjustmentType type = AdjustmentType.None;
            switch (code)
            {
                case "PR":
                    type = AdjustmentType.PatientResponsibility;
                    break;
                case "CO":
                    type = AdjustmentType.ContractualObligation;
                    break;
                case "PI":
                    type = AdjustmentType.PayerInitiated;
                    break;
                case "OA":
                    type = AdjustmentType.OtherAdjustment;
                    break;
                case "CR":
                    type = AdjustmentType.CorrectionsAndReversals;
                    break;
            }
            return type;
        }
        private static ProviderAdjustmentReason GetProviderAdjustmentReason(string code)
        {
            ProviderAdjustmentReason qualifier = ProviderAdjustmentReason.None;
            switch (code)
            {
                case "50":
                    qualifier = ProviderAdjustmentReason.LateFiling;
                    break;
                case "51":
                    qualifier = ProviderAdjustmentReason.InterestPenalty;
                    break;
                case "72":
                    qualifier = ProviderAdjustmentReason.AuthorizedReturn;
                    break;
                case "90":
                    qualifier = ProviderAdjustmentReason.EarlyPaymentAllowance;
                    break;
                case "AH":
                    qualifier = ProviderAdjustmentReason.OriginationFee;
                    break;
                case "AM":
                    qualifier = ProviderAdjustmentReason.ApliedToBorrowerAccount;
                    break;
                case "AP":
                    qualifier = ProviderAdjustmentReason.AccelerationOfBenefits;
                    break;
                case "B2":
                    qualifier = ProviderAdjustmentReason.Rebate;
                    break;
                case "B3":
                    qualifier = ProviderAdjustmentReason.RecoveryAllowance;
                    break;
                case "BD":
                    qualifier = ProviderAdjustmentReason.BadDebtAdjustment;
                    break;
                case "BN":
                    qualifier = ProviderAdjustmentReason.Bonus;
                    break;
                case "C5":
                    qualifier = ProviderAdjustmentReason.TemporaryAllowance;
                    break;
                case "CR":
                    qualifier = ProviderAdjustmentReason.CapitationInterest;
                    break;
                case "CS":
                    qualifier = ProviderAdjustmentReason.Adjustment;
                    break;
                case "CT":
                    qualifier = ProviderAdjustmentReason.CapitationPayment;
                    break;
                case "CV":
                    qualifier = ProviderAdjustmentReason.CapitationPassthru;
                    break;
                case "CW":
                    qualifier = ProviderAdjustmentReason.CertifiedNurseAnestheticPassthru;
                    break;
                case "DM":
                    qualifier = ProviderAdjustmentReason.DirectMedicalEducationPassthru;
                    break;
                case "E3":
                    qualifier = ProviderAdjustmentReason.Withholding;
                    break;
                case "FB":
                    qualifier = ProviderAdjustmentReason.ForwardingBalance;
                    break;
                case "FC":
                    qualifier = ProviderAdjustmentReason.FundAllocation;
                    break;
                case "GO":
                    qualifier = ProviderAdjustmentReason.GraduateMedicalEducationPassthru;
                    break;
                case "HM":
                    qualifier = ProviderAdjustmentReason.HemophiliaClotingFactorSupplement;
                    break;
                case "IP":
                    qualifier = ProviderAdjustmentReason.IncentivePremiumPayment;
                    break;
                case "IR":
                    qualifier = ProviderAdjustmentReason.InternalRevenueServiceWithholding;
                    break;
                case "IS":
                    qualifier = ProviderAdjustmentReason.InterimSettlement;
                    break;
                case "J1":
                    qualifier = ProviderAdjustmentReason.Nonreimbursable;
                    break;
                case "L3":
                    qualifier = ProviderAdjustmentReason.Penalty;
                    break;
                case "L6":
                    qualifier = ProviderAdjustmentReason.InterestOwed;
                    break;
                case "LE":
                    qualifier = ProviderAdjustmentReason.Levy;
                    break;
                case "LS":
                    qualifier = ProviderAdjustmentReason.LumpSum;
                    break;
                case "OA":
                    qualifier = ProviderAdjustmentReason.OrganAcquisitionPassthru;
                    break;
                case "OB":
                    qualifier = ProviderAdjustmentReason.OffsetForAffiliatedProviders;
                    break;
                case "PI":
                    qualifier = ProviderAdjustmentReason.PeriodicInterimPayment;
                    break;
                case "PL":
                    qualifier = ProviderAdjustmentReason.PaymentFinal;
                    break;
                case "RA":
                    qualifier = ProviderAdjustmentReason.RetroActivityAdjustment;
                    break;
                case "RE":
                    qualifier = ProviderAdjustmentReason.ReturnOnEquity;
                    break;
                case "SL":
                    qualifier = ProviderAdjustmentReason.StudentLoadRepayment;
                    break;
                case "TL":
                    qualifier = ProviderAdjustmentReason.ThirdPartyLiability;
                    break;
                case "WO":
                    qualifier = ProviderAdjustmentReason.OverpaymentRecovery;
                    break;
                case "WU":
                    qualifier = ProviderAdjustmentReason.UnspecifiedRecovery;
                    break;
            }
            return qualifier;
        }
    }
}
