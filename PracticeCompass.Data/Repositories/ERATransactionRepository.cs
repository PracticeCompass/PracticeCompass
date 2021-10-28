using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Transactions;
using Dapper;
using PracticeCompass.Common.Models;
using PracticeCompass.Core.Models.ERS;
using PracticeCompass.Core.Repositories;

namespace PracticeCompass.Data.Repositories
{
    public class ERATransactionRepository : IERATransaction
    {
        private IDbConnection db;
        public ERATransactionRepository(string connString)

        { this.db = new SqlConnection(connString); }

        public Task AddAsync(ERSClaimAdjustment entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<ERSClaimAdjustment> entities)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ERSClaimAdjustment>> FindAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<ERSClaimAdjustment> FirstOrDefaultAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ERSClaimAdjustment>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public void Remove(ERSClaimAdjustment entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<ERSClaimAdjustment> entities)
        {
            throw new NotImplementedException();
        }

        public bool SaveTransactions(List<ElectronicRemittanceAdvice> transactions)
        {
            var ClaimAdjustments = new List<ERSClaimAdjustment>();
            var ChargeServiceInfos = new List<ERSChargeServiceInfo>();
            var outpatientlist = new List<ERSMedicareOutpatAdj>();
            var ProviderAdjustments = new List<ERSPmtProvLevelAdj>();
            var ERSClaimDates = new List<ERSClaimDate>();
            var ERSPaymentParty = new List<ERSPaymentParty>();
            var ERSClaimContacts = new List<ERSClaimContact>();
            var ERSClaimContactNbrs = new List<ERSClaimContactNbr>();
            var ERSClaimNames = new List<ERSClaimName>();
            var ERSPaymentHeaders = new List<ERSPaymentHeader>();
            var ERSClaimData = new List<ERSClaimData>();
            var ERSClaimReferences = new List<ERSClaimReference>();
            var ERSClaimMonetaryAmts = new List<ERSClaimMonetaryAmt>();
            var ERSChargeIndustryCodes = new List<ERSChargeIndustryCode>();
            using var txScope = new TransactionScope();
            for (var era = 0; era < transactions.Count; era++)
            {
                var random = new Random();
                var ERSClaimSID = random.Next(1000, 999999);
                var ERSChargeSID = random.Next(1000, 999999);
                var ERSPaymentSID = random.Next(1000, 999999);
                var ERSRemittenceSID = random.Next(1000, 999999);
                string PaymentPartyMAXRowID = GetMAXRowID("ERSPaymentParty", ERSPaymentParty.Count != 0 ? ERSPaymentParty[ERSPaymentParty.Count - 1].prrowid : "0");
                string ERSPaymentHeaderMAXRowID = GetMAXRowID("ERSPaymentHeader", ERSPaymentHeaders.Count != 0 ? ERSPaymentHeaders[ERSPaymentHeaders.Count - 1].prrowid : "0");

                for (var p = 0; p < transactions[era].SupplementalAmounts.Count; p++)
                {

                    string ERSClaimMonetaryAmtMAXRowID = GetMAXRowID("ERSClaimMonetaryAmt", ERSClaimMonetaryAmts.Count != 0 ? ERSClaimMonetaryAmts[ERSClaimMonetaryAmts.Count - 1].prrowid : "0");
                    ERSClaimMonetaryAmts.Add(new ERSClaimMonetaryAmt
                    {
                        prrowid = ERSClaimMonetaryAmtMAXRowID,
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ERSClaimSID = ERSClaimSID,
                        AmtQualifierCode = transactions[era].SupplementalAmounts[p].Type,
                        ClaimSupplementalInfoAmt = transactions[era].SupplementalAmounts[p].Amount
                    });

                }
                for (var refe = 0; refe < transactions[era].ERAReferences.Count; refe++)
                {
                    string ERSClaimReferenceMAXRowID = GetMAXRowID("ERSClaimReference", ERSClaimReferences.Count != 0 ? ERSClaimReferences[ERSClaimReferences.Count - 1].prrowid : "0");
                    ERSClaimReferences.Add(new ERSClaimReference
                    {
                        prrowid = ERSClaimReferenceMAXRowID,
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ERSClaimSID = ERSClaimSID,
                        ReferenceID = transactions[era].ERAReferences[refe].ReferenceID,
                        ReferenceIDQualifier = transactions[era].ERAReferences[refe].ReferenceIDQualifier
                    });
                }

                ERSPaymentHeaders.Add(new ERSPaymentHeader
                {
                    prrowid = ERSPaymentHeaderMAXRowID,
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    ERSPaymentSID = ERSPaymentSID,
                    RemittanceSID = ERSRemittenceSID,
                    TransHandlingCode = transactions[era].financialInformation.HandlingMethod,
                    PaymentMethodCode = transactions[era].financialInformation.PaymentMethod,
                    TotalActualProviderPaymentAmt = transactions[era].financialInformation.TotalPaidAmount,
                    CreditOrDebitFlagCode = transactions[era].financialInformation.CreditDebit,
                    PaymentFormatCode = transactions[era].financialInformation.PaymentFormat,
                    SenderDFIIDNbrQualifier = transactions[era].financialInformation.AccountNumber,
                    SenderDFINbr = transactions[era].financialInformation.DfiNumber,
                    SenderAcctNbrQualifier = transactions[era].financialInformation.senderAccountNbrQualifier,
                    SenderBankAcctNbr = transactions[era].financialInformation.senderAccountNumber,
                    PayerSupplCode = transactions[era].financialInformation.OriginCompanySupplementalCode,
                    RemitPayerIdent = transactions[era].financialInformation.CompanyId,
                    ReceiverDFIIDNbrQualifier = transactions[era].financialInformation.RoutingNumber,
                    ReceiverAcctNbr = transactions[era].financialInformation.receiverDfiNumber,
                    ReceiverAcctNbrQualifier = transactions[era].financialInformation.receiverAcctNumberQualifier,
                    ReceiverBankIDNbr = transactions[era].financialInformation.receiverAccountNumber,
                    CheckIssueDate = transactions[era].financialInformation.PaymentEffectiveDate,
                    TraceTypeCode = transactions[era].financialInformation.TraceTypeCode,
                    TraceOrigCompanySupplCode = transactions[era].financialInformation.TraceOrigCompanySupplCode,
                    CheckTraceNbr = transactions[era].financialInformation.CheckTraceNbr,
                    TracePayerIdent = transactions[era].financialInformation.ReferenceIdentificationNumber,

                });
                ERSPaymentParty.Add(new ERSPaymentParty
                {
                    prrowid = PaymentPartyMAXRowID,
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    ERSPaymentSID = ERSPaymentSID,
                    EntityIDCode = "PR",
                    Name = transactions[era].Payer.Name,
                    AddressInfo01 = transactions[era].Payer.Address.Line1,
                    AddressInfo02 = transactions[era].Payer.Address.Line2,
                    PostalCode = transactions[era].Payer.Address.ZipCode,
                    StateCode = transactions[era].Payer.Address.State,
                    CityName = transactions[era].Payer.Address.City,
                    CountryCode = "",
                    LocationID = "",
                    LocationQualifier = "",
                    IDCode = transactions[era].Payer.IDCode,
                    IDCodeQualifier = ""

                });
                string ClaimContactMAXRowID = GetMAXRowID("ERSClaimContact", ERSClaimContacts.Count != 0 ? ERSClaimContacts[ERSClaimContacts.Count - 1].prrowid : "0");
                ERSClaimContacts.Add(new ERSClaimContact
                {
                    prrowid = PaymentPartyMAXRowID,
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    ERSClaimSID = ERSClaimSID,
                    ClaimContactName = transactions[era].Payer.ClaimContactName,
                    ContactFunctionCode = transactions[era].Payer.ContactFunctionCode

                });
                string ClaimContactNbrMAXRowID = GetMAXRowID("ERSClaimContactNbr", ERSClaimContactNbrs.Count != 0 ? ERSClaimContactNbrs[ERSClaimContactNbrs.Count - 1].prrowid : "0");
                ERSClaimContactNbrs.Add(new ERSClaimContactNbr
                {
                    prrowid = ClaimContactNbrMAXRowID,
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    ERSClaimSID = ERSClaimSID,
                    ClaimContactCommunicationsNbr = transactions[era].Payer.ClaimContactCommunicationsNbr,
                    CommunicationsNbrQualifier = transactions[era].Payer.CommunicationsNbrQualifier,
                    ContactFunctionCode = transactions[era].Payer.NbrFunctionCode,
                    ClaimContactCommunicationsExt = ""

                });
                PaymentPartyMAXRowID = GetMAXRowID("ERSPaymentParty", ERSPaymentParty.Count != 0 ? ERSPaymentParty[ERSPaymentParty.Count - 1].prrowid : "0");
                ERSPaymentParty.Add(new ERSPaymentParty
                {
                    prrowid = PaymentPartyMAXRowID,
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    ERSPaymentSID = ERSPaymentSID,
                    EntityIDCode = "PE",
                    Name = transactions[era].Payee.Name,
                    AddressInfo01 = transactions[era].Payee.Address.Line1,
                    AddressInfo02 = transactions[era].Payee.Address.Line2,
                    PostalCode = transactions[era].Payee.Address.ZipCode,
                    StateCode = transactions[era].Payee.Address.State,
                    CityName = transactions[era].Payee.Address.City,
                    CountryCode = "",
                    LocationID = "",
                    LocationQualifier = "",
                    IDCode = transactions[era].Payee.IDCode,
                    IDCodeQualifier = transactions[era].Payee.IDCodeQualifier
                });
                #region ProviderAdjustments PLB
                for (var provadj = 0; provadj < transactions[era].ProviderAdjustments.Count; provadj++)
                {
                    string ProviderAdjustmentMAXRowID = GetMAXRowID("ERSPmtProvLevelAdj", ProviderAdjustments.Count != 0 ? ProviderAdjustments[ProviderAdjustments.Count - 1].prrowid : "0");

                    ProviderAdjustments.Add(new ERSPmtProvLevelAdj
                    {
                        prrowid = ProviderAdjustmentMAXRowID,
                        RemitterProviderID = transactions[era].ProviderAdjustments[provadj].ProviderIdentifer,
                        AdjustmentReasonCode = transactions[era].ProviderAdjustments[provadj].AdjustmentReason,
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ERSPaymentSID = ERSPaymentSID,
                        FiscalPeriodDate = transactions[era].ProviderAdjustments[provadj].FiscalPeriodEndDate,
                        ProviderAdjustmentID = transactions[era].ProviderAdjustments[provadj].ReferenceIdentification,
                        ProviderAdjustmentAmt = transactions[era].ProviderAdjustments[provadj].Amount,
                        AdjCorrection = "N",
                        FinancialControlNumber = "",
                        HICNumber = "",
                        MedicareCode = "",
                        OrigAdjustmentCode = ""


                    });
                }
                #endregion
                for (var HG = 0; HG < transactions[era].ClaimHeaderGroups.Count; HG++)
                {


                    for (var HGItems = 0; HGItems < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems.Count; HGItems++)
                    {

                        string ERSClaimDataMAXRowID = GetMAXRowID("ERSClaimData", ERSClaimData.Count != 0 ? ERSClaimData[ERSClaimData.Count - 1].prrowid : "0");
                        ERSClaimData.Add(new ERSClaimData
                        {
                            prrowid = ERSClaimDataMAXRowID,
                            TimeStamp = DateTime.Now.ToString(),
                            LastUser = 88,
                            CreateStamp = DateTime.Now.ToString(),
                            CreateUser = 88,
                            Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                            pro2created = DateTime.Now,
                            pro2modified = DateTime.Now,
                            ERSClaimSID = ERSClaimSID,
                            ERSPaymentSID = ERSPaymentSID,
                            PatientControlNbr = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].PatientAccountNumber,
                            ClaimStatusCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Status,
                            TotalClaimChargeAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].BilledAmount,
                            ClaimPaymentAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].PaidAmount,
                            PatientResponsibilityAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].PatientResponsibilityAmount,
                            ClaimFilingIndicatorCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Type,
                            PayerClaimControlNumber = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].PayerControlId,
                            FacilityTypeCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].FacilityTypeCode,
                            ClaimFrequencyTypeCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ClaimFrequencyTypeCode,
                            DiagnosisRelatedGroupCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].DiagnosisRelatedGroupCode,
                            DiagnosisRelatedGroupWeight = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].DiagnosisRelatedGroupWeight,
                            DischargeFraction = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].DischargeFraction,
                            Posted = false,
                            SkipClaim = false,
                            ClaimDetail = ""

                        });
                    }
                    string ClaimNameMAXRowID = GetMAXRowID("ERSClaimName", ERSClaimNames.Count != 0 ? ERSClaimNames[ERSClaimNames.Count - 1].prrowid : "0");
                    ERSClaimNames.Add(new ERSClaimName  //NM1*QC
                    {
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ERSClaimSID = ERSClaimSID,
                        prrowid = ClaimNameMAXRowID,
                        EntityIDCode = "QC",
                        EntityTypeQualifier = "1",
                        IDCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.Identifier,
                        IDCodeQualifier = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.Qualifier,
                        NameFirst = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.FirstName,
                        NameMiddle = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.MiddleName,
                        NameSuffix = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.Suffix,
                        NameLastOrOrgName = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.LastName

                    });
                    ClaimNameMAXRowID = GetMAXRowID("ERSClaimName", ERSClaimNames.Count != 0 ? ERSClaimNames[ERSClaimNames.Count - 1].prrowid : "0");
                    ERSClaimNames.Add(new ERSClaimName  //NM1*82
                    {
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ERSClaimSID = ERSClaimSID,
                        prrowid = ClaimNameMAXRowID,
                        EntityIDCode = "82",
                        EntityTypeQualifier = "1",
                        IDCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Provider.NPI,
                        IDCodeQualifier = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Provider.IDCodeQualifier,
                        NameFirst = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Provider.FirstName,
                        NameMiddle = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Provider.MiddleName,
                        NameSuffix = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Provider.Suffix,
                        NameLastOrOrgName = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Provider.LastName

                    });
                    string ClaimDateMAXRowID = GetMAXRowID("ERSClaimDate", ERSClaimDates.Count != 0 ? ERSClaimDates[ERSClaimDates.Count - 1].prrowid : "0");
                    ERSClaimDates.Add(new ERSClaimDate  //050
                    {
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ClaimDate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ClaimReceivedDate,
                        DateTimeQualifier = "050",
                        ERSClaimSID = ERSClaimSID,
                        prrowid = ClaimDateMAXRowID
                    });
                    ClaimDateMAXRowID = GetMAXRowID("ERSClaimDate", ERSClaimDates.Count != 0 ? ERSClaimDates[ERSClaimDates.Count - 1].prrowid : "0");
                    ERSClaimDates.Add(new ERSClaimDate  //232
                    {
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ClaimDate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].StatementStartDate,
                        DateTimeQualifier = "232",
                        ERSClaimSID = ERSClaimSID,
                        prrowid = ClaimDateMAXRowID
                    });
                    ClaimDateMAXRowID = GetMAXRowID("ERSClaimDate", ERSClaimDates.Count != 0 ? ERSClaimDates[ERSClaimDates.Count - 1].prrowid : "0");
                    ERSClaimDates.Add(new ERSClaimDate  //233
                    {
                        TimeStamp = DateTime.Now.ToString(),
                        LastUser = 88,
                        CreateStamp = DateTime.Now.ToString(),
                        CreateUser = 88,
                        Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ClaimDate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].StatementEndDate,
                        DateTimeQualifier = "233",
                        ERSClaimSID = ERSClaimSID,
                        prrowid = ClaimDateMAXRowID
                    });
                    #region modifiers segment SVC
                    for (var mod = 0; mod < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems.Count; mod++)
                    {
                        string ChargeServiceInfoMAXRowID = GetMAXRowID("ERSChargeServiceInfo", ChargeServiceInfos.Count != 0 ? ChargeServiceInfos[ChargeServiceInfos.Count - 1].prrowid : "0");

                        string outpatientMAXRowID = GetMAXRowID("ERSMedicareOutpatAdj", outpatientlist.Count != 0 ? outpatientlist[outpatientlist.Count - 1].prrowid : "0");
                        if (!string.IsNullOrEmpty(transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems[mod].ChargeIndustryCodes.CodeListQualifierCode))
                        {
                            string ERSChargeIndustryCodeMAXRowID = GetMAXRowID("ERSChargeIndustryCode", ERSChargeIndustryCodes.Count != 0 ? ERSChargeIndustryCodes[ERSChargeIndustryCodes.Count - 1].prrowid : "0");
                            ERSChargeIndustryCodes.Add(new ERSChargeIndustryCode
                            {
                                prrowid= ERSChargeIndustryCodeMAXRowID,
                                ERSChargeSID= ERSChargeSID,
                                TimeStamp = DateTime.Now.ToString(),
                                LastUser = 88,
                                CreateStamp = DateTime.Now.ToString(),
                                CreateUser = 88,
                                Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                CodeListQualifierCode= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems[mod].ChargeIndustryCodes.CodeListQualifierCode,
                                IndustryCode= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems[mod].ChargeIndustryCodes.IndustryCode

                            });
                        }
                        var procedure = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems[mod].Procedure;
                        if (transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks.Count > 0)
                        {
                            outpatientlist.Add(new ERSMedicareOutpatAdj
                            {
                                prrowid = outpatientMAXRowID,
                                ERSClaimSID = ERSClaimSID,
                                ReimbursementRate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.MedicareMedicaidReimbursementRate,
                                ClaimHCPCSPayableAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.HcpcsMonetaryAmount,
                                ClaimPaymentRemarkCode01 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks.Count >= 1 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks[0].Code : null,
                                ClaimPaymentRemarkCode02 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks.Count >= 2 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks[1].Code : null,
                                ClaimPaymentRemarkCode03 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks.Count >= 3 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks[2].Code : null,
                                ClaimPaymentRemarkCode04 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks.Count >= 4 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks[3].Code : null,
                                ClaimPaymentRemarkCode05 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks.Count >= 5 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].OutPatientAdjudication.Remarks[4].Code : null,
                                ClaimESRDPaymentAmt = null,
                                NonpayableProfComponentAmt = null,
                                TimeStamp = DateTime.Now.ToString(),
                                LastUser = 88,
                                CreateStamp = DateTime.Now.ToString(),
                                CreateUser = 88,
                                Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                            });
                        }

                        ChargeServiceInfos.Add(new ERSChargeServiceInfo
                        {
                            prrowid = ChargeServiceInfoMAXRowID,
                            ERSChargeSID = ERSChargeSID,
                            ERSClaimSID = ERSClaimSID,
                            ProductServiceIDQualifier = procedure.Qualifier,
                            ProductServiceID = procedure.Code,
                            ProcedureModifier01 = procedure.Modifier1,
                            ProcedureModifier02 = procedure.Modifier2,
                            ProcedureModifier03 = procedure.Modifier3,
                            ProcedureModifier04 = procedure.Modifier4,
                            ProcedureCodeDescription = procedure.Description,
                            LineItemChargeAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems[mod].BilledMonetaryAmount,
                            LineItemProviderPaymentAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems[mod].PaidMonetaryAmount,
                            NUBCRevenueCode = procedure.RevenueCode,
                            UnitsOfServicePaidCount = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].ServiceLineItems[mod].Units,
                            OrigUnitsOfServiceCount = 0,
                            TimeStamp = DateTime.Now.ToString(),
                            LastUser = 88,
                            CreateStamp = DateTime.Now.ToString(),
                            CreateUser = 88,
                            Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                            pro2created = DateTime.Now,
                            pro2modified = DateTime.Now,
                        });
                    }
                    #endregion
                    for (var adj = 0; adj < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Adjustments.Count; adj++)
                    {

                        #region claim Adjustments "CAS Segment"
                        for (var adjmodel = 0; adjmodel < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Adjustments[adj].AdjustmentModel.Count; adjmodel++)
                        {
                            string ClaimAdjustmentMAXRowID = GetMAXRowID("ERSClaimAdjustment", ClaimAdjustments.Count != 0 ? ClaimAdjustments[ClaimAdjustments.Count - 1].prrowid : "0");

                            ClaimAdjustments.Add(new ERSClaimAdjustment
                            {
                                prrowid = ClaimAdjustmentMAXRowID,
                                ClaimAdjustmentGroupCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Adjustments[adj].Type.ToString(),
                                AdjustmentReasonCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Adjustments[adj].AdjustmentModel[adjmodel].Reason.IdentifyingCode,
                                AdjustmentAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Adjustments[adj].AdjustmentModel[adjmodel].MonetaryAmount,
                                AdjustmentQuantity = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Adjustments[adj].AdjustmentModel[adjmodel].Quantity,
                                TimeStamp = DateTime.Now.ToString(),
                                LastUser = 88,
                                CreateStamp = DateTime.Now.ToString(),
                                CreateUser = 88,
                                Pro2SrcPDB = DateTime.Now.ToString("MM-dd-yyy"),
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ERSClaimSID = ERSClaimSID
                            });
                        }
                        #endregion

                    }
                }
            }
            var claimadjSQL = "INSERT INTO [dbo].[ERSClaimAdjustment]  VALUES (@prrowid,@ERSClaimSID,@ClaimAdjustmentGroupCode,@AdjustmentReasonCode,@AdjustmentAmt,@AdjustmentQuantity,@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
            var claimadj = this.db.Execute(claimadjSQL, ClaimAdjustments);
            var ServiceInfoSQL = "INSERT INTO [dbo].[ERSChargeServiceInfo]  VALUES  (@prrowid" +
            ", @ERSChargeSID , @ERSClaimSID , @ProductServiceIDQualifier, @ProductServiceID , @ProcedureModifier01" +
            ", @ProcedureModifier02 , @ProcedureModifier03 , @ProcedureModifier04 , @ProcedureCodeDescription" +
            ", @LineItemChargeAmt , @LineItemProviderPaymentAmt , @NUBCRevenueCode , @UnitsOfServicePaidCount" +
            ", @OrigProductServiceIDQualifier , @OrigProductServiceID , @OrigProcedureModifier01 , @OrigProcedureModifier02" +
            ", @OrigProcedureModifier03 , @OrigProcedureModifier04 , @OrigProcedureCodeDescription , @OrigUnitsOfServiceCount" +
            ", @TimeStamp , @LastUser , @CreateStamp , @CreateUser , @Pro2SrcPDB , @pro2created ,@pro2modified)";
            var Serv = this.db.Execute(ServiceInfoSQL, ChargeServiceInfos);
            var outpatientSQL = "INSERT INTO [dbo].[ERSMedicareOutpatAdj]  VALUES  (@prrowid" +
                ",@ERSClaimSID,@ReimbursementRate,@ClaimHCPCSPayableAmt,@ClaimPaymentRemarkCode01," +
                "@ClaimPaymentRemarkCode02,@ClaimPaymentRemarkCode03,@ClaimPaymentRemarkCode04,@ClaimPaymentRemarkCode05," +
                "@ClaimESRDPaymentAmt,@NonpayableProfComponentAmt, @TimeStamp , @LastUser , @CreateStamp , @CreateUser , @Pro2SrcPDB , @pro2created ,@pro2modified)";
            var outpat = this.db.Execute(outpatientSQL, outpatientlist);
            var provideradjSQL = "INSERT INTO [dbo].[ERSPmtProvLevelAdj]  VALUES (@prrowid, @ERSPaymentSID,@RemitterProviderID" +
           ", @FiscalPeriodDate, @AdjustmentReasonCode, @ProviderAdjustmentID, @AdjCorrection," +
           "@ProviderAdjustmentAmt, @TimeStamp, @LastUser, @CreateStamp, @CreateUser," +
           "@OrigAdjustmentCode, @MedicareCode, @FinancialControlNumber, @HICNumber," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
            var provad = this.db.Execute(provideradjSQL, ProviderAdjustments);
            var claimDateSQL = "INSERT INTO [dbo].[ERSClaimDate] VALUES (@prrowid ,@ERSClaimSID, @DateTimeQualifier," +
           "@ClaimDate, @TimeStamp,@LastUser, @CreateStamp, @CreateUser," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
            var dates = this.db.Execute(claimDateSQL, ERSClaimDates);
            var PaymentPartySQL = "INSERT INTO [dbo].[ERSPaymentParty] VALUES (@prrowid, @ERSPaymentSID, @EntityIDCode," +
           "@Name, @IDCodeQualifier, @IDCode, @AddressInfo01, @AddressInfo02," +
           "@CityName, @StateCode, @PostalCode, @CountryCode, @LocationQualifier," +
           "@LocationID, @TimeStamp, @LastUser, @CreateStamp, @CreateUser," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
            var PayParty = this.db.Execute(PaymentPartySQL, ERSPaymentParty);
            var ERSClaimContactSQL = "INSERT INTO [dbo].[ERSClaimContact]VALUES (@prrowid,  @ERSClaimSID, @ContactFunctionCode," +
           "@ClaimContactName, @TimeStamp,@LastUser,  @CreateStamp," +
           "@CreateUser, @Pro2SrcPDB, @pro2created, @pro2modified)";
            var ClmContact = this.db.Execute(ERSClaimContactSQL, ERSClaimContacts);
            var ERSClaimContactNbrSQL = "INSERT INTO[dbo].[ERSClaimContactNbr]  VALUES(@prrowid, @ERSClaimSID, @CommunicationsNbrQualifier," +
          "@ContactFunctionCode, @ClaimContactCommunicationsNbr, @ClaimContactCommunicationsExt, @TimeStamp," +
          "@LastUser, @CreateStamp, @CreateUser, @Pro2SrcPDB, @pro2created, @pro2modified)";
            var ContactNbr = this.db.Execute(ERSClaimContactNbrSQL, ERSClaimContactNbrs);
            var ERSClaimNameSQL = "INSERT INTO [dbo].[ERSClaimName] VALUES (@prrowid,  @ERSClaimSID, @EntityIDCode, @IDCodeQualifier," +
           "@IDCode, @EntityTypeQualifier, @NameLastOrOrgName,  @NameFirst, @NameMiddle," +
           "@NameSuffix, @TimeStamp,  @LastUser,  @CreateStamp, @CreateUser," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
            var ClaimName = this.db.Execute(ERSClaimNameSQL, ERSClaimNames);
            var ERSPaymentHeaderSQL = "INSERT INTO [dbo].[ERSPaymentHeader] VALUES (@prrowid, @ERSPaymentSID,  @RemittanceSID, @RemittanceSourceCode, @ParameterGroupCode," +
           "@TransHandlingCode, @TotalActualProviderPaymentAmt,  @CreditOrDebitFlagCode, @PaymentMethodCode, @PaymentFormatCode," +
           "@SenderDFIIDNbrQualifier, @SenderDFINbr,  @SenderAcctNbrQualifier, @SenderBankAcctNbr, @RemitPayerIdent," +
           "@PayerSupplCode, @ReceiverDFIIDNbrQualifier, @ReceiverBankIDNbr, @ReceiverAcctNbrQualifier, @ReceiverAcctNbr, " +
           "@CheckIssueDate,  @TraceTypeCode, @CheckTraceNbr,  @TracePayerIdent, @TraceOrigCompanySupplCode, @TimeStamp," +
           "@LastUser, @CreateStamp, @CreateUser, @RuralHealth, @RecordStatus, @PayerNameText, @PaymentNotBalanced, " +
           "@PaymentSID, @DeletedAfterPost, @OriginalPaymentAmt, @CBOERAPaymentSID, @ReportStorageSID," +
           "@ReportStorageParams, @PracticeID, @DateReceived, @FileArchiveSID, @Pro2SrcPDB," +
           "@pro2created, @pro2modified)";
            var PaymentHeader = this.db.Execute(ERSPaymentHeaderSQL, ERSPaymentHeaders);
            var ERSClaimDataSQL = "INSERT INTO[dbo].[ERSClaimData] VALUES(@prrowid, @ERSClaimSID, @ERSPaymentSID, @PatientControlNbr, @ClaimStatusCode," +
             "@TotalClaimChargeAmt, @ClaimPaymentAmt, @PatientResponsibilityAmt, @ClaimFilingIndicatorCode," +
             "@PayerClaimControlNumber, @FacilityTypeCode, @ClaimFrequencyTypeCode, @DiagnosisRelatedGroupCode," +
             "@DiagnosisRelatedGroupWeight, @DischargeFraction, @TimeStamp, @LastUser, @CreateStamp," +
             "@CreateUser, @ClaimDetail, @SkipClaim, @Posted, @Pro2SrcPDB, @pro2created, @pro2modified)";
            var ClaimData = this.db.Execute(ERSClaimDataSQL, ERSClaimData);
            var ERSClaimReferenceSQL = "INSERT INTO [dbo].[ERSClaimReference]VALUES (@prrowid, @ERSClaimSID, @ReferenceIDQualifier," +
           "@ReferenceID, @TimeStamp,@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB," +
           "@pro2created,@pro2modified)";
            var ClaimReferenc = this.db.Execute(ERSClaimReferenceSQL, ERSClaimReferences);
            var ERSClaimMonetaryAmtSQL = "INSERT INTO [dbo].[ERSClaimMonetaryAmt] VALUES (@prrowid, @ERSClaimSID,@AmtQualifierCode,@ClaimSupplementalInfoAmt," +
           "@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
            var ClaimMonetaryAmt = this.db.Execute(ERSClaimMonetaryAmtSQL, ERSClaimMonetaryAmts);
            var ERSChargeIndustryCodeSQL = "INSERT INTO [dbo].[ERSChargeIndustryCode] VALUES (@prrowid, @ERSChargeSID,@CodeListQualifierCode, @IndustryCode, @TimeStamp," +
           "@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
            var ChargeIndustryCode = this.db.Execute(ERSChargeIndustryCodeSQL, ERSChargeIndustryCodes);
            txScope.Complete();
            return true;
        }
        private string GetMAXRowID(string tableName, string lastprrowid)
        {
            try
            {


                long intFromHex;
                if (lastprrowid != "0")
                {
                    intFromHex = Convert.ToInt64(lastprrowid, 16) + 1;
                }
                else
                {
                    string sql = string.Format("SELECT MAX(CONVERT(INT, CONVERT(VARBINARY, prrowid,1))) from [{0}]", tableName);
                    var prrowid = db.ExecuteScalar(sql);
                    intFromHex = 1;
                    if (prrowid != null)
                        intFromHex = (int)prrowid + 1;
                }
                string hexValue = intFromHex.ToString("x16");
                return string.Format("0x{0:X}", hexValue);
            }
            catch (Exception e)
            {
                var cc = e;
                return "";
            }
        }
        public Task<ERSClaimAdjustment> SingleOrDefaultAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
