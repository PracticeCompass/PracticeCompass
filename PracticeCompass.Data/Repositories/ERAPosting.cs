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
using System.IO;
using Z.Dapper.Plus;
using PracticeCompass.Logger;

namespace PracticeCompass.Data.Repositories
{
    public class ERAPostingRepository : IERAPosting
    {
        private IDbConnection db;
        private string connectionstrting;
        public ERAPostingRepository(string connString)

        {
            this.db = new SqlConnection(connString);
            connectionstrting = connString;

        }
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

        public bool PostERA(string CheckTraceNbr)
        {
            try
            {
                var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
                var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
                var Payments = new List<Payment>();
                //Get Payment Header 1 record
                #region Get_ERSPaymentHeader
                var ERSPaymentHeader = new ERSPaymentHeader();
                string sql = "SELECT * FROM ERSPaymentHeader WHERE CheckTraceNbr = @CheckTraceNbr";
                ERSPaymentHeader = this.db.QueryFirst<ERSPaymentHeader>(sql, new { CheckTraceNbr = CheckTraceNbr });
                #endregion
               
                // Get Plan ID
                #region Get_PlanID
                var plan = new Plan();
                sql = "select * from [Plan] where PayerID in(select payerID from payer where EnvoyPayerID = @ESRTracePayerIdent)";
                 plan = this.db.QueryFirst<Plan>(sql, new { ESRTracePayerIdent = ERSPaymentHeader.TracePayerIdent }); 
                #endregion
                //Get Charges 
                #region Get_Charges
                var ERSChargeReferences = new List<ERSChargeReference>();
                sql = @"select * from [dbo].[ERSChargeReference] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                            where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID = @ERSPaymentSID )) and ReferenceIDQualifier='6R' ";
                var ERSChargeRef = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.ERSPaymentSID });
                ERSChargeReferences = ERSChargeRef.Read<ERSChargeReference>().ToList(); 
                #endregion

                //Get Claim Data
                #region Get_ERSClaimData
                var ERSClaimData = new List<ERSClaimData>();
                sql = @"select * from ERSClaimData where ERSPaymentSID=@ERSPaymentSID";
                var ERSclaim = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.ERSPaymentSID });
                ERSClaimData = ERSclaim.Read<ERSClaimData>().ToList();
                #endregion
                #region planclaim_get
                var planCliamdata = new List<PlanClaim>();
                string planCliamsql = "select * from PlanClaim where PlanICN in @PlanICN";
                var planCliamrows = this.db.QueryMultiple(planCliamsql, new { PlanICN = ERSClaimData.Select(x=>x.PayerClaimControlNumber).ToList() });
                planCliamdata = planCliamrows.Read<PlanClaim>().ToList();
                foreach (var plclaim in planCliamdata)
                {
                    plclaim.BilledDate = DateTime.Now.Date;
                    plclaim.CurrentStatus = "BILLED";
                    plclaim.pro2modified = DateTime.Now;
                    plclaim.LastUser = practiceCompassHelper.CurrentUser();
                }
                #endregion
                // Get Charge Service info 
                #region Get_ERSChargeServiceInfo
                var ERSChargeServiceInfo = new List<ERSChargeServiceInfo>();
                sql = @"select * from [dbo].[ERSChargeServiceInfo]  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )";
                var ERSchargeinfo = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.ERSPaymentSID });
                ERSChargeServiceInfo = ERSchargeinfo.Read<ERSChargeServiceInfo>().ToList(); 
                #endregion

                // Get Charge Claim Adj
                #region Get_ERSChargeClaimAdj
                var ERSChargeClaimAdjustment = new List<ERSChargeClaimAdjustment>();
                sql = @"select *from ERSChargeClaimAdjustment  where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                        where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))";
                var ERSchargeAdj = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.ERSPaymentSID });
                ERSChargeClaimAdjustment = ERSchargeAdj.Read<ERSChargeClaimAdjustment>().ToList(); 
                #endregion

                //Get [ERSChargeMonetaryAmt]
                #region Get_ERSChargeMonetaryAmt
                var ERSChargeMonetaryAmt = new List<ERSChargeMonetaryAmt>();
                sql = @"select * from [dbo].[ERSChargeMonetaryAmt] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                            where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))";
                var ERSchargeMonetaryAmt = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.ERSPaymentSID });
                ERSChargeMonetaryAmt = ERSchargeMonetaryAmt.Read<ERSChargeMonetaryAmt>().ToList();
                #endregion

                //Get PlanClaimCharge
                #region Get_PlanClaimCharge
                var PlanClaimCharge = new List<PlanClaimCharge>();
                sql = @"  select PlanClaimCharge.* from PlanClaimCharge inner join PlanClaim on PlanClaim.PlanID = PlanClaimCharge.PlanID
                and PlanClaim.ClaimSID = PlanClaimCharge.ClaimSID and PlanClaim.PolicyNumber = PlanClaimCharge.PolicyNumber
                where PlanICN in (select PayerClaimControlNumber from ERSClaimData where ERSPaymentSID = @ERSPaymentSID )";
                var PlanClaimCharges = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.ERSPaymentSID });
                PlanClaimCharge = PlanClaimCharges.Read<PlanClaimCharge>().ToList();
                #endregion

                //Add Payment Record
                #region Payment_Insert
                string PaymentMAXRowID = practiceCompassHelper.GetMAXprrowid("Payment", Payments.Count() != 0 ? Payments[Payments.Count() - 1].prrowid : "0");
                int PaymentSID = practiceCompassHelper.GetMAXColumnid("Payment", "PaymentSID");
                Payments.Add(new Payment
                {
                    CreateUser = practiceCompassHelper.CurrentUser(),
                    LastUser = practiceCompassHelper.CurrentUser(),
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    Pro2SrcPDB = "medman",
                    PaymentSID = PaymentSID,
                    Amount = ERSPaymentHeader.TotalActualProviderPaymentAmt,
                    prrowid = PaymentMAXRowID,
                    PracticeID = ERSPaymentHeader.PracticeID,
                    PayorID = plan.PlanID,
                    ReportStorageParams = ERSPaymentHeader.ReportStorageParams,
                    Method = ERSPaymentHeader.PaymentMethodCode,
                    Source = ERSPaymentHeader.TransHandlingCode,
                    ReportStorageSID = ERSPaymentHeader.ReportStorageSID,
                    CBOPaymentSID = ERSPaymentHeader.CBOERAPaymentSID,
                    PostDate =ERSPaymentHeader.DateReceived,
                    CreateMethod = ERSPaymentHeader.PaymentMethodCode,
                    AuthorizationCode = "",
                    CreditCard = "",
                    CCReceiptInfo = "",
                    Class = "",
                    CreateStamp = timestamp,
                    FullyApplied = "N",
                    PatientBilled = false,
                    PreCollected = "N",
                    RecordStatus = "O",
                    ReferenceDate = ERSPaymentHeader.CheckIssueDate,
                    RestrictUser = "Y",
                    SPSReferenceID = "",
                    TimeStamp = timestamp,
                    Voucher = ERSPaymentHeader.CheckTraceNbr,
                    TraceNumber = ""
                    //,JournalSID

                });
                #endregion

                #region update_paymentHeader
                ERSPaymentHeader.PaymentSID = PaymentSID;
                ERSPaymentHeader.RecordStatus = "P";
                ERSPaymentHeader.pro2modified = DateTime.Now;
                ERSPaymentHeader.LastUser = practiceCompassHelper.CurrentUser();
                #endregion
                //Insert Plan Claim Data 
                List<ApplyPaymentModel> applyPaymentModels = new List<ApplyPaymentModel>();
                foreach (var ERSCharge in ERSChargeReferences)
                {
                    applyPaymentModels.Add(new ApplyPaymentModel
                    {
                       ChargeSID = Convert.ToInt32(ERSCharge.ReferenceID),
                       PaymentSID = PaymentSID,
                       PlanID = plan.PlanID,
                       PayorID= plan.PlanID,
                       PaymentType="I",
                       Adjustment = ERSChargeClaimAdjustment.FirstOrDefault(x=>x.ERSChargeSID== ERSCharge.ERSChargeSID)?.AdjustmentAmt,
                       AmountPaid = ERSChargeServiceInfo.FirstOrDefault(x => x.ERSChargeSID == ERSCharge.ERSChargeSID)?.LineItemProviderPaymentAmt,
                       ApprovedAmount= (ERSChargeServiceInfo.FirstOrDefault(x => x.ERSChargeSID == ERSCharge.ERSChargeSID)==null?0: ERSChargeServiceInfo.FirstOrDefault(x => x.ERSChargeSID == ERSCharge.ERSChargeSID).LineItemProviderPaymentAmt) +
                        (ERSChargeClaimAdjustment.FirstOrDefault(x => x.ERSChargeSID == ERSCharge.ERSChargeSID && x.ClaimAdjustmentGroupCode == "PR")==null?0: ERSChargeClaimAdjustment.FirstOrDefault(x => x.ERSChargeSID == ERSCharge.ERSChargeSID && x.ClaimAdjustmentGroupCode == "PR").AdjustmentAmt),
                       GoToNext=true,
                       PolicyNumber = PlanClaimCharge.FirstOrDefault(x=>x.ChargeSID == Convert.ToInt32(ERSCharge.ReferenceID) && x.PlanID == plan.PlanID).PolicyNumber
                    });
                }
                var ChargeActivities = new List<ChargeActivity>();
                var Charges = new List<Charge>();
                var Accounts = new List<Account>();
                var PaymentAssignments = new List<PaymentAssignment>();
                var PlanClaimChargeRemits = new List<PlanClaimChargeRemit>();
                var PlanClaimChargeRemitAdjments = new List<PlanClaimChargeRemitAdj>();
                #region Get_Charges
                var chargeIDs = applyPaymentModels.Select(x => x.ChargeSID);
                sql = "SELECT * FROM Charge WHERE chargeSID IN @ids";
                var Chargesresults = this.db.QueryMultiple(sql, new { ids = chargeIDs });
                Charges = Chargesresults.Read<Charge>().ToList();
                #endregion
                PaymentRepository paymentRepository = new PaymentRepository(connectionstrting);
                ChargeActivities = paymentRepository.ChargeActivityAdd(applyPaymentModels, ChargeActivities, Charges);
                PaymentAssignments = paymentRepository.PaymentAssignmentAdd(applyPaymentModels, Charges, PaymentAssignments);
                Charges = paymentRepository.ChargesUpdate(applyPaymentModels, Charges);
                Accounts = paymentRepository.AccountUpdate(applyPaymentModels, Accounts, Charges);
                PlanClaimChargeRemits = paymentRepository.PlanClaimChargeRemitAdd(applyPaymentModels, PlanClaimCharge, ChargeActivities,ERSPaymentHeader, ERSChargeReferences,ERSChargeServiceInfo);
                PlanClaimChargeRemitAdjments = paymentRepository.PlanClaimChargeRemitAdjAdd(ERSChargeClaimAdjustment, PlanClaimCharge, ERSChargeReferences, PlanClaimChargeRemits);
                var PlanClaimChargeMonetaryAmt = new List<PlanClaimChargeMonetaryAmt>();
                foreach (var ERSChargemontAmt in ERSChargeMonetaryAmt)
                {
                    string PlanClaimChargeMonetaryAmtMAXRowID = practiceCompassHelper.GetMAXprrowid("PlanClaimChargeMonetaryAmt", PlanClaimChargeMonetaryAmt.Count() != 0 ? PlanClaimChargeMonetaryAmt[PlanClaimChargeMonetaryAmt.Count() - 1].prrowid : "0");
                    int chargesid = Convert.ToInt32(ERSChargeReferences.FirstOrDefault(x => x.ERSChargeSID == ERSChargemontAmt.ERSChargeSID).ReferenceID);
                    PlanClaimChargeMonetaryAmt.Add(new PlanClaimChargeMonetaryAmt
                    {
                        CreateUser = practiceCompassHelper.CurrentUser(),
                        LastUser = practiceCompassHelper.CurrentUser(),
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        Pro2SrcPDB = "medman",
                        prrowid = PlanClaimChargeMonetaryAmtMAXRowID,
                        Amount = ERSChargemontAmt.ServiceSupplementalAmt,
                        ChargeSID = chargesid,
                        CreateMethod = "R",
                        CreateStamp = timestamp,
                        TimeStamp = timestamp,
                        QualifierCode = ERSChargemontAmt.AmtQualifierCode,
                        ClaimSID = PlanClaimCharge.FirstOrDefault(x => x.ChargeSID == chargesid).ClaimSID,
                        PlanID = PlanClaimCharge.FirstOrDefault(x => x.ChargeSID == chargesid).PlanID,
                        PolicyNumber = PlanClaimCharge.FirstOrDefault(x => x.ChargeSID == chargesid).PolicyNumber,
                        LineItem = PlanClaimCharge.FirstOrDefault(x => x.ChargeSID == chargesid).LineItem,
                        RemitCount = 1
                    });
                }
                using var txScope = new TransactionScope();
                this.db.BulkUpdate(ERSPaymentHeader);
                var paymentSql = "INSERT INTO [dbo].[Payment]VALUES(@prrowid,@PaymentSID,@PracticeID,@JournalSID,@PostDate" +
                  ", @Source, @PayorID, @Class, @Amount, @Method, @FullyApplied, @CreditCard, @AuthorizationCode, @PreCollected" +
                 ", @RestrictUser, @ReferenceDate, @Voucher, @RecordStatus, @TimeStamp, @LastUser, @CreateStamp" +
                 ", @CreateUser, @CreateMethod, @CBOPaymentSID, @TraceNumber, @CCReceiptInfo, @ReportStorageSID, @ReportStorageParams" +
                 ", @SPSReferenceID, @PatientBilled, @Pro2SrcPDB, @pro2created, @pro2modified)";
                var paymentData = this.db.Execute(paymentSql, Payments);
                this.db.BulkUpdate(Charges);
                var ChargeActivitySQL = "INSERT INTO [dbo].[ChargeActivity] VALUES " +
                 "(@prrowid,@ChargeSID,@ActivityCount,@ActivityType,@SourceType,@SourceID,@JournalSID,@PostDate,@Amount" +
                ",@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@AccountSID,@PatientStatement,@DisplayText,@CreateMethod" +
                ",@DNPracticeID,@Pro2SrcPDB,@pro2created,@pro2modified)";
                var ChargeActivity = this.db.Execute(ChargeActivitySQL, ChargeActivities);
                var PaymentAssignmentSQL = "INSERT INTO [dbo].[PaymentAssignment] VALUES " +
                "(@prrowid,@PaymentSID,@ChargeSID,@ActivityCount,@AccountSID,@JournalSID,@PostDate,@Amount,@PatientBilled" +
                 ",@PatientStatement,@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@CreditedPlanID,@Pro2SrcPDB" +
                ",@pro2created,@pro2modified)";
                var PaymentAssignment = this.db.Execute(PaymentAssignmentSQL, PaymentAssignments);
                this.db.BulkUpdate(Accounts);
                var PlanClaimChargeMonetaryAmtSql= "INSERT INTO [dbo].[PlanClaimChargeMonetaryAmt] VALUES(@prrowid,@PlanID,@ClaimSID,@PolicyNumber,@ChargeSID"+
                ",@RemitCount,@QualifierCode,@Amount,@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@CreateMethod,@LineItem"+
                ",@Pro2SrcPDB,@pro2created,@pro2modified)";
                var PlanClaimChargeMonetary = this.db.Execute(PlanClaimChargeMonetaryAmtSql, PlanClaimChargeMonetaryAmt);
                var PlanClaimChargeRemitSQL = "INSERT INTO [dbo].[PlanClaimChargeRemit]VALUES(@prrowid,@PlanID,@ClaimSID,@PolicyNumber,@ChargeSID" +
                 ",@RemitCount,@PaymentChargeSID,@PaymentSID,@ActivityCount,@PaidAmount,@RemitProcedureCode,@RemitProcedureDesc" +
                 ",@PaidUnits,@AdjudicationDate,@RemitCodesChanged,@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@ProductServiceIDQualifier" +
                 ",@NUBCRevenueCode,@LineItem,@BundledChargeSID,@Pro2SrcPDB,@pro2created,@pro2modified)";
                var PlanClaimChargermt = this.db.Execute(PlanClaimChargeRemitSQL, PlanClaimChargeRemits);
                var PlanClaimChargeRemitAdjSql = "INSERT INTO [dbo].[PlanClaimChargeRemitAdj] VALUES(@prrowid,@PlanID,@ClaimSID,@PolicyNumber,@ChargeSID,@RemitCount" +
                " ,@ClaimAdjustmentGroupCode,@AdjustmentReasonCode,@AdjustmentAmount,@AdjustmentQuantity,@TimeStamp" +
                " ,@LastUser,@CreateStamp,@CreateUser,@LineItem,@Pro2SrcPDB,@pro2created,@pro2modified)";
                var PlanClaimChargeRemitAd = this.db.Execute(PlanClaimChargeRemitAdjSql, PlanClaimChargeRemitAdjments);
                txScope.Complete();

                using var txScope1 = new TransactionScope();
                paymentRepository.MovetoNextPlan(applyPaymentModels);
                txScope1.Complete();
                return true;
            }
            catch (Exception ex )
            {
                Log.LogErrorStack(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }

        public void Remove(ERSClaimAdjustment entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<ERSClaimAdjustment> entities)
        {
            throw new NotImplementedException();
        }

        public Task<ERSClaimAdjustment> SingleOrDefaultAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
