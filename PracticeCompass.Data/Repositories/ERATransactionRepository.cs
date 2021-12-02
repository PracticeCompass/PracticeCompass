using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Transactions;
using Dapper;
using PracticeCompass.Common.Models;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Models.ERS;
using PracticeCompass.Core.Repositories;
using System.Linq;

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
            var ERSChargeDates = new List<ERSChargeDate>();
            var ERSPaymentParty = new List<ERSPaymentParty>();
            var ERSClaimContacts = new List<ERSClaimContact>();
            var ERSClaimContactNbrs = new List<ERSClaimContactNbr>();
            var ERSClaimNames = new List<ERSClaimName>();
            var ERSPaymentHeaders = new List<ERSPaymentHeader>();
            var ERSClaimData = new List<ERSClaimData>();
            var ERSClaimReferences = new List<ERSClaimReference>();
            var ERSClaimMonetaryAmts = new List<ERSClaimMonetaryAmt>();
            var ERSChargeMonetaryAmts = new List<ERSChargeMonetaryAmt>();
            var ERSChargeIndustryCodes = new List<ERSChargeIndustryCode>();
            var ERSRemittanceFileInstance = new List<ERSRemittanceFileInstance>();
            var ERSPmtPartyContacts = new List<ERSPmtPartyContact>();
            var ERSPmtPartyContactNbrs = new List<ERSPmtPartyContactNbr>();
            var ERSRemittanceDates = new List<ERSRemittanceDate>();
            using var txScope = new TransactionScope();
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var ERSClaimSID = 0;
            var ERSPaymentSID = 0;
            var ERSChargeSID = 0;
            var ERSRemittenceSID = 0;
            for (var era = 0; era < transactions.Count; era++)
            {
                
                var random = new Random();
                
                var maxpaymentSid = 0;
                var maxremittenceSid = 0;
                if (era != 0) {
                    maxpaymentSid = ERSPaymentSID;
                    maxremittenceSid = ERSRemittenceSID;
                }
                ERSPaymentSID = practiceCompassHelper.GetMAXColumnid("ERSPaymentHeader", "ERSPaymentSID", maxpaymentSid);
                ERSRemittenceSID = practiceCompassHelper.GetMAXColumnid("ERSRemittanceFileInstance", "RemittanceSID", maxremittenceSid);
                string PaymentPartyMAXRowID = GetMAXRowID("ERSPaymentParty", ERSPaymentParty.Count != 0 ? ERSPaymentParty[ERSPaymentParty.Count - 1].prrowid : "0");
                string RemittenceSIDMAXRowID = GetMAXRowID("ERSRemittanceFileInstance", ERSRemittanceFileInstance.Count != 0 ? ERSRemittanceFileInstance[ERSRemittanceFileInstance.Count - 1].prrowid : "0");
                string ERSPaymentHeaderMAXRowID = GetMAXRowID("ERSPaymentHeader", ERSPaymentHeaders.Count != 0 ? ERSPaymentHeaders[ERSPaymentHeaders.Count - 1].prrowid : "0");
                var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);

                var ref6R = transactions[era].ClaimHeaderGroups[0].ClaimRemittanceAdviceItems[0].ServiceLineItems[0].ControlNumber;
                var Charges = new List<Charge>();
                string sql = "SELECT * FROM Charge WHERE chargeSID = @ids";
                var Chargesresults = this.db.QueryMultiple(sql, new { ids = ref6R });
                Charges = Chargesresults.Read<Charge>().ToList();
                var practiceID = Charges[0].PracticeID;
                #region ERSRemittanceDate
                string ERSRemittanceDateMAXRowID = GetMAXRowID("ERSRemittanceDate", ERSRemittanceDates.Count != 0 ? ERSRemittanceDates[ERSRemittanceDates.Count - 1].prrowid : "0");
                ERSRemittanceDates.Add(new ERSRemittanceDate
                {
                    CreateStamp=timestamp,
                    TimeStamp=timestamp,
                    CreateUser=88,
                    LastUser=88,
                    Date= transactions[era].ProductionDate,
                    DateTimeQualifier="405",
                    pro2created=DateTime.Now,
                    pro2modified=DateTime.Now,
                    Pro2SrcPDB="medman",
                    prrowid= ERSRemittanceDateMAXRowID,
                    RemittanceSID= ERSRemittenceSID
                });
                #endregion
                for (var pyr=0; pyr < transactions[era].Payer.Count; pyr++)
                {
                    #region ERSPmtPartyContact
                    string ERSPmtPartyContactMAXRowID = GetMAXRowID("ERSPmtPartyContact", ERSPmtPartyContacts.Count != 0 ? ERSPmtPartyContacts[ERSPmtPartyContacts.Count - 1].prrowid : "0");

                    ERSPmtPartyContacts.Add(new ERSPmtPartyContact
                    {
                        CreateStamp = timestamp,
                        CreateUser = 88,
                        EntityIDCode = "PR",
                        LastUser = 88,
                        Name = transactions[era].Payer[pyr].ClaimContactName,
                        ERSPaymentSID = ERSPaymentSID,
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        Pro2SrcPDB = "medman",
                        prrowid = ERSPmtPartyContactMAXRowID,
                        ContactFunctionCode = transactions[era].Payer[pyr].ContactFunctionCode,
                        TimeStamp = timestamp

                    });
                    #endregion
                    #region ERSPmtPartyContactNbr
                    string ERSPmtPartyContactNbrMAXRowID = GetMAXRowID("ERSPmtPartyContactNbr", ERSPmtPartyContactNbrs.Count != 0 ? ERSPmtPartyContactNbrs[ERSPmtPartyContactNbrs.Count - 1].prrowid : "0");

                    ERSPmtPartyContactNbrs.Add(new ERSPmtPartyContactNbr
                    {
                        TimeStamp = timestamp,
                        CreateStamp = timestamp,
                        LastUser = 88,
                        CreateUser = 88,
                        pro2modified = DateTime.Now,
                        pro2created = DateTime.Now,
                        Pro2SrcPDB = "medman",
                        ERSPaymentSID = ERSPaymentSID,
                        prrowid = ERSPmtPartyContactNbrMAXRowID,
                        CommunicationsExt = "",
                        CommunicationsNbr = transactions[era].Payer[pyr].ClaimContactCommunicationsNbr,
                        CommunicationsNbrQualifier = transactions[era].Payer[pyr].NbrFunctionCode,
                        ContactFunctionCode = transactions[era].Payer[pyr].ContactFunctionCode,
                        EntityIDCode = "PR"

                    });
                    #endregion
                }

                #region ERSRemittanceFileInstance
                ERSRemittanceFileInstance.Add(new ERSRemittanceFileInstance
                {
                    CreateStamp=timestamp,
                    CreateUser=88,
                    LastUser=88,
                    PracticeID=practiceID,
                    pro2created=DateTime.Now,
                    RemittanceSID= ERSRemittenceSID,
                    RecordStatus="R",
                    TimeStamp=timestamp,
                    pro2modified=DateTime.Now,
                    Pro2SrcPDB="medman",
                    prrowid= RemittenceSIDMAXRowID,
                    RemittanceSourceCode="MMNS",
                    DateReceived=DateTime.Now.Date,
                    DateFinished= DateTime.Now.Date,
                    FileArchiveSID=null
                });
                #endregion
                #region ERSPaymentHeader
                ERSPaymentHeaders.Add(new ERSPaymentHeader
                {
                    prrowid = ERSPaymentHeaderMAXRowID,
                    TimeStamp = timestamp,
                    LastUser = 88,
                    CreateStamp = timestamp,
                    CreateUser = 88,
                    Pro2SrcPDB = "medman",
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
                    RemitPayerIdent = transactions[era].Interchangedata.ReceiverIdentifier,
                    ReceiverDFIIDNbrQualifier = transactions[era].financialInformation.RoutingNumber,
                    ReceiverAcctNbr = transactions[era].financialInformation.receiverAccountNumber,
                    ReceiverAcctNbrQualifier = transactions[era].financialInformation.receiverAcctNumberQualifier,
                    ReceiverBankIDNbr = transactions[era].financialInformation.receiverDfiNumber,
                    CheckIssueDate = transactions[era].financialInformation.PaymentEffectiveDate,
                    TraceTypeCode = transactions[era].financialInformation.TraceTypeCode,
                    TraceOrigCompanySupplCode = transactions[era].financialInformation.TraceOrigCompanySupplCode,
                    CheckTraceNbr = transactions[era].financialInformation.CheckTraceNbr,
                    TracePayerIdent = transactions[era].financialInformation.ReferenceIdentificationNumber,
                    RecordStatus = "r",
                    DeletedAfterPost = "N",
                    PaymentNotBalanced = false,
                    OriginalPaymentAmt = transactions[era].financialInformation.TotalPaidAmount,
                    PayerNameText = transactions[era].PayerName,
                    PracticeID = practiceID,
                    RuralHealth="",
                    RemittanceSourceCode="MMNS"

                });
                #endregion
                #region ERSPaymentParty
                ERSPaymentParty.Add(new ERSPaymentParty
                {
                    prrowid = PaymentPartyMAXRowID,
                    TimeStamp = timestamp,
                    LastUser = 88,
                    CreateStamp = timestamp,
                    CreateUser = 88,
                    Pro2SrcPDB = "medman",
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    ERSPaymentSID = ERSPaymentSID,
                    EntityIDCode = "PR",
                    Name = transactions[era].PayerName,
                    AddressInfo01 = transactions[era].PayerAddress.Line1,
                    AddressInfo02 = transactions[era].PayerAddress.Line2,
                    PostalCode = transactions[era].PayerAddress.ZipCode,
                    StateCode = transactions[era].PayerAddress.State,
                    CityName = transactions[era].PayerAddress.City,
                    CountryCode = "",
                    LocationID = "",
                    LocationQualifier = "",
                    IDCode = String.IsNullOrEmpty(transactions[era].PayerIDCode)? transactions[era].Interchangedata.ReceiverIdentifier : transactions[era].PayerIDCode,
                    IDCodeQualifier = ""

                });
                PaymentPartyMAXRowID = GetMAXRowID("ERSPaymentParty", ERSPaymentParty.Count != 0 ? ERSPaymentParty[ERSPaymentParty.Count - 1].prrowid : "0");
                ERSPaymentParty.Add(new ERSPaymentParty
                {
                    prrowid = PaymentPartyMAXRowID,
                    TimeStamp = timestamp,
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = "medman",
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
                #endregion
                #region ERSClaimData
                for (var HG = 0; HG < transactions[era].ClaimHeaderGroups.Count; HG++)//LX 
                {
                   
                    for (var HGItems = 0; HGItems < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems.Count; HGItems++)//CLP
                    {
                        var maxclaimSid = 0;
                        if (HGItems != 0) maxclaimSid = ERSClaimSID;
                        ERSClaimSID = practiceCompassHelper.GetMAXColumnid("ERSClaimData", "ERSClaimSID", maxclaimSid);
                        string ERSClaimDataMAXRowID = GetMAXRowID("ERSClaimData", ERSClaimData.Count != 0 ? ERSClaimData[ERSClaimData.Count - 1].prrowid : "0");
                        ERSClaimData.Add(new ERSClaimData
                        {
                            prrowid = ERSClaimDataMAXRowID,
                            TimeStamp = timestamp,
                            LastUser = 88,
                            CreateStamp = timestamp,
                            CreateUser = 88,
                            Pro2SrcPDB = "medman",
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
                            DiagnosisRelatedGroupCode = string.IsNullOrEmpty(transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].DiagnosisRelatedGroupCode)?null: transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].DiagnosisRelatedGroupCode,
                            DiagnosisRelatedGroupWeight = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].DiagnosisRelatedGroupWeight??null,
                            DischargeFraction = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].DischargeFraction??null,
                            Posted = false,
                            SkipClaim = false,
                            ClaimDetail = ""

                        });
                        string ClaimNameMAXRowID = GetMAXRowID("ERSClaimName", ERSClaimNames.Count != 0 ? ERSClaimNames[ERSClaimNames.Count - 1].prrowid : "0");
                        ERSClaimNames.Add(new ERSClaimName  //NM1*QC
                        {
                            TimeStamp = timestamp,
                            LastUser = 88,
                            CreateStamp = timestamp,
                            CreateUser = 88,
                            Pro2SrcPDB = "medman",
                            pro2created = DateTime.Now,
                            pro2modified = DateTime.Now,
                            ERSClaimSID = ERSClaimSID,
                            prrowid = ClaimNameMAXRowID,
                            EntityIDCode = "QC",
                            EntityTypeQualifier = "1",
                            IDCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Patient.Identifier,
                            IDCodeQualifier = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Patient.Qualifier,
                            NameFirst = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Patient.FirstName,
                            NameMiddle = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Patient.MiddleName,
                            NameSuffix = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Patient.Suffix,
                            NameLastOrOrgName = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Patient.LastName

                        });
                        ClaimNameMAXRowID = GetMAXRowID("ERSClaimName", ERSClaimNames.Count != 0 ? ERSClaimNames[ERSClaimNames.Count - 1].prrowid : "0");
                        ERSClaimNames.Add(new ERSClaimName  //NM1*82
                        {
                            TimeStamp = timestamp,
                            LastUser = 88,
                            CreateStamp = timestamp,
                            CreateUser = 88,
                            Pro2SrcPDB = "medman",
                            pro2created = DateTime.Now,
                            pro2modified = DateTime.Now,
                            ERSClaimSID = ERSClaimSID,
                            prrowid = ClaimNameMAXRowID,
                            EntityIDCode = "82",
                            EntityTypeQualifier = "1",
                            IDCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Provider.NPI,
                            IDCodeQualifier = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Provider.IDCodeQualifier,
                            NameFirst = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Provider.FirstName,
                            NameMiddle = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Provider.MiddleName,
                            NameSuffix = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Provider.Suffix,
                            NameLastOrOrgName = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Provider.LastName

                        });
                        if (!string.IsNullOrEmpty(transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].TransferTo.Name))
                        {
                            ClaimNameMAXRowID = GetMAXRowID("ERSClaimName", ERSClaimNames.Count != 0 ? ERSClaimNames[ERSClaimNames.Count - 1].prrowid : "0");
                            ERSClaimNames.Add(new ERSClaimName  //NM1*TT
                            {
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ERSClaimSID = ERSClaimSID,
                                prrowid = ClaimNameMAXRowID,
                                EntityIDCode = "TT",
                                EntityTypeQualifier = "2",
                                IDCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].TransferTo.Identifier,
                                IDCodeQualifier = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].TransferTo.Qualifier,
                                NameFirst = "",
                                NameMiddle = "",
                                NameSuffix = "",
                                NameLastOrOrgName = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].TransferTo.Name
                            });
                        }

                        string ClaimDateMAXRowID = GetMAXRowID("ERSClaimDate", ERSClaimDates.Count != 0 ? ERSClaimDates[ERSClaimDates.Count - 1].prrowid : "0");
                        ERSClaimDates.Add(new ERSClaimDate  //050
                        {
                            TimeStamp = timestamp,
                            LastUser = 88,
                            CreateStamp = timestamp,
                            CreateUser = 88,
                            Pro2SrcPDB = "medman",
                            pro2created = DateTime.Now,
                            pro2modified = DateTime.Now,
                            ClaimDate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ClaimReceivedDate,
                            DateTimeQualifier = "050",
                            ERSClaimSID = ERSClaimSID,
                            prrowid = ClaimDateMAXRowID
                        });
                        if (transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].StatementStartDate != null)
                        {
                            ClaimDateMAXRowID = GetMAXRowID("ERSClaimDate", ERSClaimDates.Count != 0 ? ERSClaimDates[ERSClaimDates.Count - 1].prrowid : "0");
                            ERSClaimDates.Add(new ERSClaimDate  //232
                            {
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ClaimDate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].StatementStartDate,
                                DateTimeQualifier = "232",
                                ERSClaimSID = ERSClaimSID,
                                prrowid = ClaimDateMAXRowID
                            });
                        }
                        if (transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].StatementEndDate != null)
                        {
                            ClaimDateMAXRowID = GetMAXRowID("ERSClaimDate", ERSClaimDates.Count != 0 ? ERSClaimDates[ERSClaimDates.Count - 1].prrowid : "0");
                            ERSClaimDates.Add(new ERSClaimDate  //233
                            {
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ClaimDate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].StatementEndDate,
                                DateTimeQualifier = "233",
                                ERSClaimSID = ERSClaimSID,
                                prrowid = ClaimDateMAXRowID
                            });
                        }
                        if (transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Payer.ClaimContactName != "")
                        {
                            string ClaimContactMAXRowID = GetMAXRowID("ERSClaimContact", ERSClaimContacts.Count != 0 ? ERSClaimContacts[ERSClaimContacts.Count - 1].prrowid : "0");
                            ERSClaimContacts.Add(new ERSClaimContact
                            {
                                prrowid = ClaimContactMAXRowID,
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ERSClaimSID = ERSClaimSID,
                                ClaimContactName = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Payer.ClaimContactName,
                                ContactFunctionCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Payer.ContactFunctionCode

                            });
                        }
                        if (transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Payer.ClaimContactCommunicationsNbr != "")
                        {
                            string ClaimContactNbrMAXRowID = GetMAXRowID("ERSClaimContactNbr", ERSClaimContactNbrs.Count != 0 ? ERSClaimContactNbrs[ERSClaimContactNbrs.Count - 1].prrowid : "0");
                            ERSClaimContactNbrs.Add(new ERSClaimContactNbr
                            {
                                prrowid = ClaimContactNbrMAXRowID,
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ERSClaimSID = ERSClaimSID,
                                ClaimContactCommunicationsNbr = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Payer.ClaimContactCommunicationsNbr,
                                CommunicationsNbrQualifier = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Payer.CommunicationsNbrQualifier,
                                ContactFunctionCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].Payer.NbrFunctionCode,
                                ClaimContactCommunicationsExt = ""

                            });
                        }
                        if (transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks.Count > 0)//MOA
                        {
                            string outpatientMAXRowID = GetMAXRowID("ERSMedicareOutpatAdj", outpatientlist.Count != 0 ? outpatientlist[outpatientlist.Count - 1].prrowid : "0");
                            outpatientlist.Add(new ERSMedicareOutpatAdj
                            {
                                prrowid = outpatientMAXRowID,
                                ERSClaimSID = ERSClaimSID,
                                ReimbursementRate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.MedicareMedicaidReimbursementRate,
                                ClaimHCPCSPayableAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.HcpcsMonetaryAmount,
                                ClaimPaymentRemarkCode01 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks.Count >= 1 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks[0].Code : null,
                                ClaimPaymentRemarkCode02 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks.Count >= 2 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks[1].Code : null,
                                ClaimPaymentRemarkCode03 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks.Count >= 3 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks[2].Code : null,
                                ClaimPaymentRemarkCode04 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks.Count >= 4 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks[3].Code : null,
                                ClaimPaymentRemarkCode05 = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks.Count >= 5 ? transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].OutPatientAdjudication.Remarks[4].Code : null,
                                ClaimESRDPaymentAmt = null,
                                NonpayableProfComponentAmt = null,
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = DateTime.Now.ToString(),
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                            });
                        }
                        #region modifiers segment SVC
                        for (var mod = 0; mod < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems.Count; mod++)
                        {
                            var maxerschargeSid = 0;
                            if (ERSChargeDates.Count != 0) maxerschargeSid = ERSChargeSID;
                             ERSChargeSID = practiceCompassHelper.GetMAXColumnid("ERSChargeServiceInfo", "ERSChargeSID", maxerschargeSid);
                            //save DOS in date table
                            string ClaimDateofserviceMAXRowID = GetMAXRowID("ERSChargeDate", ERSChargeDates.Count != 0 ? ERSChargeDates[ERSChargeDates.Count - 1].prrowid : "0");
                            ERSChargeDates.Add(new ERSChargeDate  //472
                            {
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ServiceDate = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].DateOfService,
                                DateTimeQualifier = "472",
                                prrowid = ClaimDateofserviceMAXRowID,
                                ERSChargeSID= ERSChargeSID
                            });
                            #region ERSChargeMonetaryAmt
                            for (var p = 0; p < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].ServiceLineSupplementalAmounts.Count; p++)
                            {

                                string ERSClaimMonetaryAmtMAXRowID = GetMAXRowID("ERSChargeMonetaryAmt", ERSChargeMonetaryAmts.Count != 0 ? ERSChargeMonetaryAmts[ERSChargeMonetaryAmts.Count - 1].prrowid : "0");
                                ERSChargeMonetaryAmts.Add(new ERSChargeMonetaryAmt
                                {
                                    prrowid = ERSClaimMonetaryAmtMAXRowID,
                                    TimeStamp = timestamp,
                                    LastUser = 88,
                                    CreateStamp = timestamp,
                                    CreateUser = 88,
                                    Pro2SrcPDB = "medman",
                                    pro2created = DateTime.Now,
                                    pro2modified = DateTime.Now,
                                    AmtQualifierCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].ServiceLineSupplementalAmounts[p].Type,
                                    ERSChargeSID = ERSChargeSID,
                                    ServiceSupplementalAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].ServiceLineSupplementalAmounts[p].Amount
                                });

                            }
                            #endregion

                            string ChargeServiceInfoMAXRowID = GetMAXRowID("ERSChargeServiceInfo", ChargeServiceInfos.Count != 0 ? ChargeServiceInfos[ChargeServiceInfos.Count - 1].prrowid : "0");

                            for (var CIC = 0; CIC < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].ChargeIndustryCodes.Count; CIC++)//LQ
                            {

                                if (!string.IsNullOrEmpty(transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].ChargeIndustryCodes[CIC].CodeListQualifierCode))
                                {
                                    string ERSChargeIndustryCodeMAXRowID = GetMAXRowID("ERSChargeIndustryCode", ERSChargeIndustryCodes.Count != 0 ? ERSChargeIndustryCodes[ERSChargeIndustryCodes.Count - 1].prrowid : "0");
                                    ERSChargeIndustryCodes.Add(new ERSChargeIndustryCode
                                    {
                                        prrowid = ERSChargeIndustryCodeMAXRowID,
                                        ERSChargeSID = ERSChargeSID,
                                        TimeStamp = timestamp,
                                        LastUser = 88,
                                        CreateStamp = timestamp,
                                        CreateUser = 88,
                                        Pro2SrcPDB = "medman",
                                        pro2created = DateTime.Now,
                                        pro2modified = DateTime.Now,
                                        CodeListQualifierCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].ChargeIndustryCodes[CIC].CodeListQualifierCode,
                                        IndustryCode = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].ChargeIndustryCodes[CIC].IndustryCode
                                    });
                                }
                            }

                            var procedure = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].Procedure;
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
                                ProcedureCodeDescription = procedure.Description ?? "",
                                LineItemChargeAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].BilledMonetaryAmount,
                                LineItemProviderPaymentAmt = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].PaidMonetaryAmount,
                                NUBCRevenueCode = procedure.RevenueCode,
                                UnitsOfServicePaidCount = transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[HGItems].ServiceLineItems[mod].Units,
                                OrigUnitsOfServiceCount = 0,
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                OrigProcedureCodeDescription = "",
                                OrigProductServiceID = "",
                                OrigProductServiceIDQualifier = "",
                                OrigProcedureModifier01 = "",
                                OrigProcedureModifier02 = "",
                                OrigProcedureModifier03 = "",
                                OrigProcedureModifier04 = ""

                            });
                        }
                        #endregion

                    }


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
                                TimeStamp = timestamp,
                                LastUser = 88,
                                CreateStamp = timestamp,
                                CreateUser = 88,
                                Pro2SrcPDB = "medman",
                                pro2created = DateTime.Now,
                                pro2modified = DateTime.Now,
                                ERSClaimSID = ERSClaimSID
                            });
                        }
                        #endregion

                    }
                }

                #endregion
                for (var refe = 0; refe < transactions[era].ERAReferences.Count; refe++)
                {
                    string ERSClaimReferenceMAXRowID = GetMAXRowID("ERSClaimReference", ERSClaimReferences.Count != 0 ? ERSClaimReferences[ERSClaimReferences.Count - 1].prrowid : "0");
                    ERSClaimReferences.Add(new ERSClaimReference
                    {
                        prrowid = ERSClaimReferenceMAXRowID,
                        TimeStamp = timestamp,
                        LastUser = 88,
                        CreateStamp = timestamp,
                        CreateUser = 88,
                        Pro2SrcPDB = "medman",
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        ERSClaimSID = ERSClaimSID,
                        ReferenceID = transactions[era].ERAReferences[refe].ReferenceID,
                        ReferenceIDQualifier = transactions[era].ERAReferences[refe].ReferenceIDQualifier
                    });
                }
                #region ProviderAdjustments PLB
                for (var provadj = 0; provadj < transactions[era].ProviderAdjustments.Count; provadj++)
                {
                    string ProviderAdjustmentMAXRowID = GetMAXRowID("ERSPmtProvLevelAdj", ProviderAdjustments.Count != 0 ? ProviderAdjustments[ProviderAdjustments.Count - 1].prrowid : "0");

                    ProviderAdjustments.Add(new ERSPmtProvLevelAdj
                    {
                        prrowid = ProviderAdjustmentMAXRowID,
                        RemitterProviderID = transactions[era].ProviderAdjustments[provadj].ProviderIdentifer,
                        AdjustmentReasonCode = transactions[era].ProviderAdjustments[provadj].AdjustmentReason,
                        TimeStamp = timestamp,
                        LastUser = 88,
                        CreateStamp = timestamp,
                        CreateUser = 88,
                        Pro2SrcPDB = "medman",
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
               
            }
            var claimadjSQL = "INSERT INTO [dbo].[ERSClaimAdjustment]  VALUES (@prrowid,@ERSClaimSID,@ClaimAdjustmentGroupCode,@AdjustmentReasonCode,@AdjustmentAmt,@AdjustmentQuantity,@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
            //var claimadj = this.db.Execute(claimadjSQL, ClaimAdjustments);
            var ServiceInfoSQL = "INSERT INTO [dbo].[ERSChargeServiceInfo]  VALUES  (@prrowid" +
            ", @ERSChargeSID , @ERSClaimSID , @ProductServiceIDQualifier, @ProductServiceID , @ProcedureModifier01" +
            ", @ProcedureModifier02 , @ProcedureModifier03 , @ProcedureModifier04 , @ProcedureCodeDescription" +
            ", @LineItemChargeAmt , @LineItemProviderPaymentAmt , @NUBCRevenueCode , @UnitsOfServicePaidCount" +
            ", @OrigProductServiceIDQualifier , @OrigProductServiceID , @OrigProcedureModifier01 , @OrigProcedureModifier02" +
            ", @OrigProcedureModifier03 , @OrigProcedureModifier04 , @OrigProcedureCodeDescription , @OrigUnitsOfServiceCount" +
            ", @TimeStamp , @LastUser , @CreateStamp , @CreateUser , @Pro2SrcPDB , @pro2created ,@pro2modified)";
            //var Serv = this.db.Execute(ServiceInfoSQL, ChargeServiceInfos);
            var outpatientSQL = "INSERT INTO [dbo].[ERSMedicareOutpatAdj]  VALUES  (@prrowid" +
                ",@ERSClaimSID,@ReimbursementRate,@ClaimHCPCSPayableAmt,@ClaimPaymentRemarkCode01," +
                "@ClaimPaymentRemarkCode02,@ClaimPaymentRemarkCode03,@ClaimPaymentRemarkCode04,@ClaimPaymentRemarkCode05," +
                "@ClaimESRDPaymentAmt,@NonpayableProfComponentAmt, @TimeStamp , @LastUser , @CreateStamp , @CreateUser , @Pro2SrcPDB , @pro2created ,@pro2modified)";
            //var outpat = this.db.Execute(outpatientSQL, outpatientlist);
            var provideradjSQL = "INSERT INTO [dbo].[ERSPmtProvLevelAdj]  VALUES (@prrowid, @ERSPaymentSID,@RemitterProviderID" +
           ", @FiscalPeriodDate, @AdjustmentReasonCode, @ProviderAdjustmentID, @AdjCorrection," +
           "@ProviderAdjustmentAmt, @TimeStamp, @LastUser, @CreateStamp, @CreateUser," +
           "@OrigAdjustmentCode, @MedicareCode, @FinancialControlNumber, @HICNumber," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
           // var provad = this.db.Execute(provideradjSQL, ProviderAdjustments);
            var claimDateSQL = "INSERT INTO [dbo].[ERSClaimDate] VALUES (@prrowid ,@ERSClaimSID, @DateTimeQualifier," +
           "@ClaimDate, @TimeStamp,@LastUser, @CreateStamp, @CreateUser," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
           // var dates = this.db.Execute(claimDateSQL, ERSClaimDates);
            var PaymentPartySQL = "INSERT INTO [dbo].[ERSPaymentParty] VALUES (@prrowid, @ERSPaymentSID, @EntityIDCode," +
           "@Name, @IDCodeQualifier, @IDCode, @AddressInfo01, @AddressInfo02," +
           "@CityName, @StateCode, @PostalCode, @CountryCode, @LocationQualifier," +
           "@LocationID, @TimeStamp, @LastUser, @CreateStamp, @CreateUser," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
            //var PayParty = this.db.Execute(PaymentPartySQL, ERSPaymentParty);
            var ERSClaimContactSQL = "INSERT INTO [dbo].[ERSClaimContact]VALUES (@prrowid,  @ERSClaimSID, @ContactFunctionCode," +
           "@ClaimContactName, @TimeStamp,@LastUser,  @CreateStamp," +
           "@CreateUser, @Pro2SrcPDB, @pro2created, @pro2modified)";
           //var ClmContact = this.db.Execute(ERSClaimContactSQL, ERSClaimContacts);
            var ERSClaimContactNbrSQL = "INSERT INTO[dbo].[ERSClaimContactNbr]  VALUES(@prrowid, @ERSClaimSID, @CommunicationsNbrQualifier," +
          "@ContactFunctionCode, @ClaimContactCommunicationsNbr, @ClaimContactCommunicationsExt, @TimeStamp," +
          "@LastUser, @CreateStamp, @CreateUser, @Pro2SrcPDB, @pro2created, @pro2modified)";
           // var ContactNbr = this.db.Execute(ERSClaimContactNbrSQL, ERSClaimContactNbrs);
            var ERSClaimNameSQL = "INSERT INTO [dbo].[ERSClaimName] VALUES (@prrowid,  @ERSClaimSID, @EntityIDCode, @IDCodeQualifier," +
           "@IDCode, @EntityTypeQualifier, @NameLastOrOrgName,  @NameFirst, @NameMiddle," +
           "@NameSuffix, @TimeStamp,  @LastUser,  @CreateStamp, @CreateUser," +
           "@Pro2SrcPDB, @pro2created, @pro2modified)";
           // var ClaimName = this.db.Execute(ERSClaimNameSQL, ERSClaimNames);
            var ERSPaymentHeaderSQL = "INSERT INTO [dbo].[ERSPaymentHeader] VALUES (@prrowid, @ERSPaymentSID,  @RemittanceSID, @RemittanceSourceCode, @ParameterGroupCode," +
           "@TransHandlingCode, @TotalActualProviderPaymentAmt,  @CreditOrDebitFlagCode, @PaymentMethodCode, @PaymentFormatCode," +
           "@SenderDFIIDNbrQualifier, @SenderDFINbr,  @SenderAcctNbrQualifier, @SenderBankAcctNbr, @RemitPayerIdent," +
           "@PayerSupplCode, @ReceiverDFIIDNbrQualifier, @ReceiverBankIDNbr, @ReceiverAcctNbrQualifier, @ReceiverAcctNbr, " +
           "@CheckIssueDate,  @TraceTypeCode, @CheckTraceNbr,  @TracePayerIdent, @TraceOrigCompanySupplCode, @TimeStamp," +
           "@LastUser, @CreateStamp, @CreateUser, @RuralHealth, @RecordStatus, @PayerNameText, @PaymentNotBalanced, " +
           "@PaymentSID, @DeletedAfterPost, @OriginalPaymentAmt, @CBOERAPaymentSID, @ReportStorageSID," +
           "@ReportStorageParams, @PracticeID, @DateReceived, @FileArchiveSID, @Pro2SrcPDB," +
           "@pro2created, @pro2modified)";
           // var PaymentHeader = this.db.Execute(ERSPaymentHeaderSQL, ERSPaymentHeaders);
            var ERSClaimDataSQL = "INSERT INTO[dbo].[ERSClaimData] VALUES(@prrowid, @ERSClaimSID, @ERSPaymentSID, @PatientControlNbr, @ClaimStatusCode," +
             "@TotalClaimChargeAmt, @ClaimPaymentAmt, @PatientResponsibilityAmt, @ClaimFilingIndicatorCode," +
             "@PayerClaimControlNumber, @FacilityTypeCode, @ClaimFrequencyTypeCode, @DiagnosisRelatedGroupCode," +
             "@DiagnosisRelatedGroupWeight, @DischargeFraction, @TimeStamp, @LastUser, @CreateStamp," +
             "@CreateUser, @ClaimDetail, @SkipClaim, @Posted, @Pro2SrcPDB, @pro2created, @pro2modified)";
           //var ClaimData = this.db.Execute(ERSClaimDataSQL, ERSClaimData);
            var ERSClaimReferenceSQL = "INSERT INTO [dbo].[ERSClaimReference]VALUES (@prrowid, @ERSClaimSID, @ReferenceIDQualifier," +
           "@ReferenceID, @TimeStamp,@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB," +
           "@pro2created,@pro2modified)";
            //var ClaimReferenc = this.db.Execute(ERSClaimReferenceSQL, ERSClaimReferences);
            var ERSClaimMonetaryAmtSQL = "INSERT INTO [dbo].[ERSClaimMonetaryAmt] VALUES (@prrowid, @ERSClaimSID,@AmtQualifierCode,@ClaimSupplementalInfoAmt," +
           "@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
           // var ClaimMonetaryAmt = this.db.Execute(ERSClaimMonetaryAmtSQL, ERSClaimMonetaryAmts);
            var ERSChargeIndustryCodeSQL = "INSERT INTO [dbo].[ERSChargeIndustryCode] VALUES (@prrowid, @ERSChargeSID,@CodeListQualifierCode, @IndustryCode, @TimeStamp," +
           "@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
           // var ChargeIndustryCode = this.db.Execute(ERSChargeIndustryCodeSQL, ERSChargeIndustryCodes);
            var ERSChargeDateCodeSQL = "INSERT INTO [dbo].[ERSChargeDate]VALUES(@prrowid,@ERSChargeSID,@DateTimeQualifier,@ServiceDate,@TimeStamp,@LastUser,@CreateStamp,"+
            "@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
            // var ERSChargeDateCode = this.db.Execute(ERSChargeDateCodeSQL, ERSChargeDates);
            var ERSChargeMonetaryAmtSQL = "INSERT INTO [dbo].[ERSChargeMonetaryAmt] VALUES(@prrowid,@ERSChargeSID,@AmtQualifierCode,@ServiceSupplementalAmt,@TimeStamp," +
            "@LastUser,@CreateStamp,@CreateUser,@Pro2SrcPDB,@pro2created,@pro2modified)";
           // var ChargeMonetaryAmt = this.db.Execute(ERSChargeMonetaryAmtSQL, ERSChargeMonetaryAmts);
           var ERSPmtPartyContactNbrSql= "INSERT INTO [dbo].[ERSPmtPartyContactNbr]VALUES(@prrowid,@ERSPaymentSID,@EntityIDCode,@ContactFunctionCode"+
           ", @CommunicationsNbrQualifier, @CommunicationsNbr, @CommunicationsExt, @TimeStamp, @LastUser" +
           ", @CreateStamp, @CreateUser, @Pro2SrcPDB, @pro2created, @pro2modified)";
           // var ERSPmtPartyContactn = this.db.Execute(ERSPmtPartyContactNbrSql, ERSPmtPartyContactNbrs);
            var ERSPmtPartyContactSql = "INSERT INTO [dbo].[ERSPmtPartyContact]VALUES(@prrowid,@ERSPaymentSID,@EntityIDCode,@ContactFunctionCode,@Name"+
           ", @TimeStamp, @LastUser, @CreateStamp, @CreateUser, @Pro2SrcPDB, @pro2created, @pro2modified)";
            //var ERSPmtPartyContact = this.db.Execute(ERSPmtPartyContactSql, ERSPmtPartyContacts);
            var ERSRemittanceDateSql = "INSERT INTO [dbo].[ERSRemittanceDate]VALUES(@prrowid,@RemittanceSID,@DateTimeQualifier,@Date,@TimeStamp"+
           ", @LastUser, @CreateStamp, @CreateUser, @Pro2SrcPDB, @pro2created, @pro2modified)";
            var ERSRemittanceDat= this.db.Execute(ERSRemittanceDateSql, ERSRemittanceDates);

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
                return "";
            }
        }
        public Task<ERSClaimAdjustment> SingleOrDefaultAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
