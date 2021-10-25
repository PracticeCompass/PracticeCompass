﻿using System;
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
            using var txScope = new TransactionScope();
            for (var era = 0; era < transactions.Count; era++)
            {
                var random = new Random();
                var ERSClaimSID = random.Next(1000, 999999);
                var ERSChargeSID = random.Next(1000, 999999);
                var ERSPaymentSID = random.Next(1000, 999999);
                string PaymentPartyMAXRowID = GetMAXRowID("ERSPaymentParty", ERSPaymentParty.Count != 0 ? ERSPaymentParty[ERSPaymentParty.Count - 1].prrowid : "0");
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
                    IDCode= transactions[era].Payer.IDCode,
                    IDCodeQualifier= ""

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
                    ERSClaimSID= ERSClaimSID,
                    ClaimContactName= transactions[era].Payer.ClaimContactName,
                    ContactFunctionCode= transactions[era].Payer.ContactFunctionCode

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
                    ClaimContactCommunicationsNbr= transactions[era].Payer.ClaimContactCommunicationsNbr,
                    CommunicationsNbrQualifier= transactions[era].Payer.CommunicationsNbrQualifier,
                    ContactFunctionCode= transactions[era].Payer.NbrFunctionCode,
                    ClaimContactCommunicationsExt=""

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


                    //for (var HGItems = 0; HGItems < transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems.Count; HGItems++)
                    {
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
                            EntityIDCode="QC",
                            EntityTypeQualifier= "1",
                            IDCode= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.Identifier,
                            IDCodeQualifier= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.Qualifier,
                            NameFirst= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.FirstName,
                            NameMiddle= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.MiddleName,
                            NameSuffix= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.Suffix,
                            NameLastOrOrgName= transactions[era].ClaimHeaderGroups[HG].ClaimRemittanceAdviceItems[0].Patient.LastName

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
