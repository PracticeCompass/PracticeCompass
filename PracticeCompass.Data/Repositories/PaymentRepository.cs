using Dapper;
using Z.Dapper.Plus;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;
using System.Transactions;
using PracticeCompass.Core.Models.ERS;

namespace PracticeCompass.Data.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private IDbConnection db;
        private Utilities.PracticeCompassHelper practiceCompassHelper;
        public PaymentRepository(string connString)

        {
            this.db = new SqlConnection(connString);
            practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
        }
        public Task AddAsync(PaymentDTO entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<PaymentDTO> entities)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<PaymentDTO, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<PaymentDTO>> FindAsync(Expression<Func<PaymentDTO, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<PaymentDTO> FirstOrDefaultAsync(Expression<Func<PaymentDTO, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<PaymentDTO>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public List<PaymentDTO> GetInsurancePayment(int PracticeID, int InsuranceID, int DateType, string Datevalue,string totxnDate, bool Fullyapplied)
        {
            var data = this.db.QueryMultiple("uspInsurancePaymentGet", new { @PracticeID = PracticeID, @InsuranceID = InsuranceID, @DateType = DateType, @Datevalue = Datevalue, @totxnDate= totxnDate, @Fullyapplied = Fullyapplied }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentDTO>().ToList();
        }

        public List<PaymentDTO> GetPatientPayment(int PracticeID, int PatientID, int DateType, string Datevalue,string totxnDate, bool Fullyapplied)
        {
            var data = this.db.QueryMultiple("uspPatientPaymentGet", new { @PracticeID = PracticeID, @PatientID = PatientID, @DateType = DateType, @Datevalue = Datevalue, @totxnDate= totxnDate, @Fullyapplied = Fullyapplied }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentDTO>().ToList();
        }

        public PaymentDetails GetPaymentDetails(int PaymentSID)
        {
            var data = this.db.QueryMultiple("uspInsurancePaymentDetailsGet", new { @PaymentSID = PaymentSID }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentDetails>().FirstOrDefault();
        }
        public List<PaymentAssignmentDTO> GetPaymentAssignment(int PaymentSID)
        {
            var data = this.db.QueryMultiple("uspPaymentAssignmentGet", new { @PaymentSID = PaymentSID }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentAssignmentDTO>().ToList();
        }

        public bool InsertUpdatePayment(string prrowid, int PaymentSID, int PracticeID, string PostDate, string Source, int PayorID, string Class, float Amount, string Method,
            string CreditCard, string AuthorizationCode, string Voucher, string CreateMethod, int LastUser, int CreateUser)
        {
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            if (string.IsNullOrEmpty(prrowid))
            {
                prrowid = practiceCompassHelper.GetMAXprrowid("Payment", "0");
            }
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            var createStamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);

            var data = this.db.QueryMultiple("uspPaymentInsertUpdate", new
            {
                @prrowid = prrowid,
                @PaymentSID = PaymentSID,
                @PracticeID = PracticeID,
                @PostDate = PostDate,
                @Source = Source,
                @PayorID = PayorID,
                @Class = Class,
                @Amount = Amount,
                @Method = Method,
                @CreditCard = CreditCard,
                @AuthorizationCode = AuthorizationCode,
                @Voucher = Voucher,
                @LastUser = LastUser,
                @CreateUser = CreateUser,
                @CreateMethod = CreateMethod,
                @CreateStamp = createStamp,
                @TimeStamp = timestamp
            }, commandType: CommandType.StoredProcedure);
            return true;
        }
        public List<PatientPayment> GetPatientPaymentforApply(int PatientID)
        {

            var data = this.db.QueryMultiple("uspPatientPaymentGetforApply", new { @PatientID = PatientID }, commandType: CommandType.StoredProcedure);
            return data.Read<PatientPayment>().ToList();
        }
        public List<InsurancePayment> GetInsurancePaymentforApply(int GuarantorID, int DOSType, string DOSvalue,string ToDOSvalue, int InsuranceID, string ClaimIcnNumber)
        {
            var data = this.db.QueryMultiple("uspInsurancePaymentGetforApply", new
            {
                @GuarantorID = GuarantorID,
                @DOSType = DOSType,
                @DOSvalue = DOSvalue,
                @ToDOSvalue= ToDOSvalue,
                @InsuranceID = InsuranceID,
                @ClaimIcnNumber = ClaimIcnNumber
            }, commandType: CommandType.StoredProcedure);
            return data.Read<InsurancePayment>().ToList();
        }
        public List<ChargeAdjustmentDetail> GetChargeAdjustmentDetails(int ChargeSID, int ClaimSID, int PlanId)
        {
            var data = this.db.QueryMultiple("uspChargeAdjustmentDetailsGet", new
            {
                @ChargeSID = ChargeSID,
                @ClaimSID = ClaimSID,
                @PlanId= PlanId
            }, commandType: CommandType.StoredProcedure);
            return data.Read<ChargeAdjustmentDetail>().ToList();
        }
        public List<PaymentClass> GetPaymentClass()
        {
            var data = this.db.QueryMultiple("uspPayClassGet", new { }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentClass>().ToList();
        }
        public bool ApplyPayment(List<ApplyPaymentModel> applyPaymentModel)
        {
            var ChargeActivities = new List<ChargeActivity>();
            var Charges = new List<Charge>();
            var Accounts = new List<Account>();
            var PaymentAssignments = new List<PaymentAssignment>();
            var PlanClaimCharges = new List<PlanClaimCharge>();

            #region Get_Charges
            var chargeIDs = applyPaymentModel.Select(x => x.ChargeSID);
            string sql = "SELECT * FROM Charge WHERE chargeSID IN @ids";
            var Chargesresults = this.db.QueryMultiple(sql, new { ids = chargeIDs });
            Charges = Chargesresults.Read<Charge>().ToList();
            #endregion

            #region Get_Payments
            var paymentID = applyPaymentModel[0].PaymentSID;
            var Payments = new Payment();
            string paymentSql = "SELECT * FROM Payment WHERE PaymentSID = @ids";
            var Paymentsresults = this.db.QueryMultiple(paymentSql, new { ids = paymentID });
            Payments = Paymentsresults.Read<Payment>().FirstOrDefault();
            #endregion

            if (applyPaymentModel[0].PaymentRemaining == 0)
            {
                Payments.FullyApplied = "Y";
            }
            //update chargeAdjustmentDetails

            var PlanClaimChargeRemitAdjments = new List<PlanClaimChargeRemitAdj>();
            PlanClaimChargeRemitAdjments = PlanClaimChargeRemitAdjAdd(applyPaymentModel);
            var PlanClaimChargeRemitAdjSql = "INSERT INTO [dbo].[PlanClaimChargeRemitAdj] VALUES(@prrowid,@PlanID,@ClaimSID,@PolicyNumber,@ChargeSID,@RemitCount" +
            " ,@ClaimAdjustmentGroupCode,@AdjustmentReasonCode,@AdjustmentAmount,@AdjustmentQuantity,@TimeStamp" +
            " ,@LastUser,@CreateStamp,@CreateUser,@LineItem,@Pro2SrcPDB,@pro2created,@pro2modified)";
            var PlanClaimChargeRemitAd = this.db.Execute(PlanClaimChargeRemitAdjSql, PlanClaimChargeRemitAdjments);

            // update Charge
            ChargeActivities = ChargeActivityAdd(applyPaymentModel, ChargeActivities, Charges);
            PaymentAssignments = PaymentAssignmentAdd(applyPaymentModel, Charges, PaymentAssignments);
            Charges = ChargesUpdate(applyPaymentModel, Charges);
            Accounts = AccountUpdate(applyPaymentModel, Accounts, Charges);
            using var txScope = new TransactionScope();
            this.db.BulkUpdate(Charges);
            this.db.BulkUpdate(Payments);
            this.db.BulkUpdate(Accounts);


            #region Insert_Statments
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
            var PlanClaimChargeSQL = "INSERT INTO [dbo].[PlanClaimCharge] VALUES " +
           "(@prrowid,@PlanID,@ClaimSID,@PolicyNumber,@LineItem,@ChargeSID,@BilledAmount,@TimeStamp,@LastUser" +
           ",@CreateStamp,@CreateUser,@PatReceipts,@InsReceipts,@Pro2SrcPDB,@pro2created,@pro2modified)";
            var PlanClaimCharge = this.db.Execute(PlanClaimChargeSQL, PlanClaimCharges);
            #endregion
            txScope.Complete();

            using var txScope1 = new TransactionScope();
            #region move_to_next
            MovetoNextPlan(applyPaymentModel);
            txScope1.Complete();
            #endregion
            return true;
        }

        public List<Charge> ChargesUpdate(List<ApplyPaymentModel> applyPaymentModel, List<Charge> Charges)
        {
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            foreach (var paymentmodel in applyPaymentModel)
            {
                #region update_Charge
                var chargerow = Charges.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                if (paymentmodel.PaymentType == "G")
                    chargerow.GuarantorReceipts = paymentmodel.AmountPaid;
                else
                    chargerow.InsuranceReceipts = paymentmodel.AmountPaid;
                chargerow.Adjustments = paymentmodel.Adjustment;
                chargerow.pro2modified = DateTime.Now;
                chargerow.TimeStamp = timestamp;
                if ((chargerow.Amount - (chargerow.InsuranceReceipts + chargerow.GuarantorReceipts + chargerow.Adjustments)) == 0)
                {
                    chargerow.RecordStatus = "S";
                    chargerow.DateSatisfied = DateTime.Now.Date;
                }
                if (paymentmodel.ApprovedAmount != null)
                    chargerow.ApprovedAmount = paymentmodel.ApprovedAmount;
                if (paymentmodel.copayAmount != null)
                    chargerow.CopayAmount = paymentmodel.copayAmount;
                if (paymentmodel.deductibleApplied != null)
                    chargerow.DeductibleApplied = paymentmodel.deductibleApplied;
                #endregion

            }
            return Charges;
        }

        public List<PlanClaimChargeRemit> PlanClaimChargeRemitAdd(List<ApplyPaymentModel> applyPaymentModel, List<PlanClaimCharge> PlanClaimCharges, List<ChargeActivity> ChargeActivities, ERSPaymentHeader paymentHeader, List<ERSChargeReference> ERSChargeReferences, List<ERSChargeServiceInfo> ERSChargeServiceInfos)
        {
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            var PlanClaimChargeRemits = new List<PlanClaimChargeRemit>();
            foreach (var paymentmodel in applyPaymentModel)
            {
                string PlanClaimChargeRemitMAXRowID = practiceCompassHelper.GetMAXprrowid("PlanClaimChargeRemit", PlanClaimChargeRemits.Count() != 0 ? PlanClaimChargeRemits[PlanClaimChargeRemits.Count() - 1].prrowid : "0");
                var chargeactivity = ChargeActivities.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                var planclaim = PlanClaimCharges.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                var ERSChargeServiceInfo = ERSChargeServiceInfos.FirstOrDefault(c => c.ERSChargeSID == (ERSChargeReferences.FirstOrDefault(x => x.ReferenceID == paymentmodel.ChargeSID.ToString()).ERSChargeSID));
                var chargeexistsql = "select * from PlanClaimChargeRemit where ChargeSID = @ChargeSID ";
                var PlanClaimChargermt = this.db.QueryFirst<PlanClaimChargeRemit>(chargeexistsql, new { ChargeSID = paymentmodel.ChargeSID });
                PlanClaimChargeRemits.Add(new PlanClaimChargeRemit
                {
                    TimeStamp = timestamp,
                    LastUser = practiceCompassHelper.CurrentUser(),
                    CreateUser = practiceCompassHelper.CurrentUser(),
                    CreateStamp = timestamp,
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    Pro2SrcPDB = "medman",
                    prrowid = PlanClaimChargeRemitMAXRowID,
                    ActivityCount = chargeactivity.ActivityCount,
                    ChargeSID = paymentmodel.ChargeSID,
                    AdjudicationDate = paymentHeader.CheckIssueDate,
                    BundledChargeSID = null,
                    ClaimSID = planclaim.ClaimSID,
                    PlanID = planclaim.PlanID,
                    PolicyNumber = planclaim.PolicyNumber,
                    LineItem = planclaim.LineItem,
                    NUBCRevenueCode = "",
                    PaidAmount = paymentmodel.AmountPaid,
                    PaidUnits = 1,
                    PaymentChargeSID = paymentmodel.ChargeSID,
                    PaymentSID = paymentHeader.PaymentSID,
                    ProductServiceIDQualifier = ERSChargeServiceInfo.ProductServiceIDQualifier,
                    RemitProcedureCode = ERSChargeServiceInfo.ProductServiceID + (string.IsNullOrEmpty(ERSChargeServiceInfo.OrigProcedureModifier01) ? "" : "-" + ERSChargeServiceInfo.OrigProcedureModifier01),
                    RemitCodesChanged = "N",
                    RemitCount = PlanClaimChargermt != null ? (PlanClaimChargermt.RemitCount + 1) : 1,
                    RemitProcedureDesc = "",
                });
            }
            return PlanClaimChargeRemits;

        }
        public List<PlanClaimChargeRemitAdj> PlanClaimChargeRemitAdjAdd(List<ERSChargeClaimAdjustment> ERSChargeClaimAdjustments, List<PlanClaimCharge> PlanClaimCharges, List<ERSChargeReference> ERSChargeReferences)
        {
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            var PlanClaimChargeRemitadjs = new List<PlanClaimChargeRemitAdj>();
            foreach (var chargeclaimadjus in ERSChargeClaimAdjustments)
            {
                string PlanClaimChargeRemitadjMAXRowID = practiceCompassHelper.GetMAXprrowid("PlanClaimChargeRemitAdj", PlanClaimChargeRemitadjs.Count() != 0 ? PlanClaimChargeRemitadjs[PlanClaimChargeRemitadjs.Count() - 1].prrowid : "0");
                var planclaim = PlanClaimCharges.FirstOrDefault(c => c.ChargeSID == int.Parse((ERSChargeReferences.FirstOrDefault(x => x.ERSChargeSID == chargeclaimadjus.ERSChargeSID)).ReferenceID));
                var adjexistsql = "select * from PlanClaimChargeRemitAdj where ChargeSID = @ChargeSID ";
                var PlanClaimChargermtadj = this.db.QueryFirst<PlanClaimChargeRemitAdj>(adjexistsql, new { ChargeSID = planclaim.ChargeSID });

                PlanClaimChargeRemitadjs.Add(new PlanClaimChargeRemitAdj
                {
                    TimeStamp = timestamp,
                    CreateStamp = timestamp,
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    Pro2SrcPDB = "medman",
                    LastUser = practiceCompassHelper.CurrentUser(),
                    CreateUser = practiceCompassHelper.CurrentUser(),
                    PlanID = planclaim.PlanID,
                    ClaimSID = planclaim.ClaimSID,
                    ChargeSID = planclaim.ChargeSID,
                    PolicyNumber = planclaim.PolicyNumber,
                    prrowid = PlanClaimChargeRemitadjMAXRowID,
                    RemitCount = PlanClaimChargermtadj != null ? (PlanClaimChargermtadj.RemitCount + 1) : 1,
                    AdjustmentAmount = chargeclaimadjus.AdjustmentAmt,
                    AdjustmentQuantity = chargeclaimadjus.AdjustmentQuantity,
                    AdjustmentReasonCode = chargeclaimadjus.AdjustmentReasonCode,
                    ClaimAdjustmentGroupCode = chargeclaimadjus.ClaimAdjustmentGroupCode,
                    LineItem = planclaim.LineItem
                });
            }
            return PlanClaimChargeRemitadjs;
        }
        public List<PlanClaimChargeRemitAdj> PlanClaimChargeRemitAdjAdd(List<ApplyPaymentModel> applyPaymentModels)
        {
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            var PlanClaimChargeRemitadjs = new List<PlanClaimChargeRemitAdj>();
            foreach (var applyPaymentModel in applyPaymentModels)
            {
                foreach (var chargeclaimadjus in applyPaymentModel.ChargeAdjustments)
                {
                    if (!chargeclaimadjus.isAdd) continue;
                    string PlanClaimChargeRemitadjMAXRowID = practiceCompassHelper.GetMAXprrowid("PlanClaimChargeRemitAdj", PlanClaimChargeRemitadjs.Count() != 0 ? PlanClaimChargeRemitadjs[PlanClaimChargeRemitadjs.Count() - 1].prrowid : "0");
                    
                    var planclaimSql = "select* from PlanClaimCharge where ChargeSID = @ChargeSID and PlanID = @PlanID and ClaimSID = @ClaimSID ";
                    var planclaim = this.db.QueryFirst<PlanClaimCharge>(planclaimSql, new { ChargeSID = chargeclaimadjus.chargeSid, PlanID= chargeclaimadjus.planId });


                    var adjexistsql = "select * from PlanClaimChargeRemitAdj where ChargeSID = @ChargeSID ";
                    var PlanClaimChargermtadj = this.db.QueryFirst<PlanClaimChargeRemitAdj>(adjexistsql, new { ChargeSID = chargeclaimadjus.chargeSid });
                    PlanClaimChargeRemitadjs.Add(new PlanClaimChargeRemitAdj
                    {
                        TimeStamp = timestamp,
                        CreateStamp = timestamp,
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        Pro2SrcPDB = "medman",
                        LastUser = practiceCompassHelper.CurrentUser(),
                        CreateUser = practiceCompassHelper.CurrentUser(),
                        PlanID = planclaim.PlanID,
                        ClaimSID = planclaim.ClaimSID,
                        ChargeSID = planclaim.ChargeSID,
                        PolicyNumber = planclaim.PolicyNumber,
                        prrowid = PlanClaimChargeRemitadjMAXRowID,
                        RemitCount = PlanClaimChargermtadj != null ? (PlanClaimChargermtadj.RemitCount + 1) : 1,
                        AdjustmentAmount = chargeclaimadjus.adjustmentAmount,
                        AdjustmentQuantity = 1,
                        AdjustmentReasonCode = chargeclaimadjus.adjustmentReasonCode,
                        ClaimAdjustmentGroupCode = chargeclaimadjus.claimAdjustmentGroupCode,
                        LineItem = planclaim.LineItem
                    });
                }
            }
                return PlanClaimChargeRemitadjs;
        }

        public List<ChargeActivity> ChargeActivityAdd(List<ApplyPaymentModel> applyPaymentModel, List<ChargeActivity> ChargeActivities, List<Charge> Charges)
        {
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            foreach (var paymentmodel in applyPaymentModel)
            {
                var chargerow = Charges.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                var gurantorDiff = paymentmodel.PaymentType == "G" ? paymentmodel.AmountPaid - chargerow.GuarantorReceipts : 0;
                var insuranceDiff = paymentmodel.PaymentType == "I" ? paymentmodel.AmountPaid - chargerow.InsuranceReceipts : 0;
                var adjustamnetsDiff = paymentmodel.Adjustment - chargerow.Adjustments;

                string ChargeActivityMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", ChargeActivities.Count() != 0 ? ChargeActivities[ChargeActivities.Count() - 1].prrowid : "0");
                int maxactivitycount = practiceCompassHelper.GetMAXColumnid("ChargeActivity", "ActivityCount", ChargeActivities.Count(x => x.ChargeSID == paymentmodel.ChargeSID) != 0 ?
                    ChargeActivities[ChargeActivities.Count() - 1].ActivityCount.Value : 0, string.Format("Where ChargeSID = {0}", paymentmodel.ChargeSID.ToString()));
                if (gurantorDiff != 0 || insuranceDiff != 0)
                {
                    #region ChargeActivity_PMT
                    // ChargeActivity

                    ChargeActivities.Add(new Core.Models.ChargeActivity
                    {
                        prrowid = ChargeActivityMAXRowID,
                        ChargeSID = paymentmodel.ChargeSID,
                        ActivityCount = maxactivitycount,
                        Amount = insuranceDiff != 0 ? -1 * insuranceDiff : -1 * gurantorDiff,
                        ActivityType = "PMT",
                        SourceType = paymentmodel.PaymentType,
                        SourceID = paymentmodel.PayorID,
                        CreateMethod = "M",
                        TimeStamp = timestamp,
                        LastUser = practiceCompassHelper.CurrentUser(),
                        CreateStamp = timestamp,
                        CreateUser = practiceCompassHelper.CurrentUser(),
                        Pro2SrcPDB = "medman",
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        PostDate = DateTime.Now.Date,
                        AccountSID = chargerow.AccountSID,
                        DNPracticeID = chargerow.PracticeID,
                        PatientStatement = "",
                        DisplayText = ""

                    });
                    #endregion
                }
                if (adjustamnetsDiff != 0)
                {
                    #region ChargeActivity_Adj
                    ChargeActivityMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", ChargeActivities.Count() != 0 ? ChargeActivities[ChargeActivities.Count() - 1].prrowid : "0");
                    maxactivitycount = practiceCompassHelper.GetMAXColumnid("ChargeActivity", "ActivityCount",
                        ChargeActivities.Count(x => x.ChargeSID == paymentmodel.ChargeSID) != 0 ? ChargeActivities[ChargeActivities.Count() - 1].ActivityCount.Value : 0
                        , string.Format("Where ChargeSID = {0}", paymentmodel.ChargeSID.ToString()));
                    ChargeActivities.Add(new Core.Models.ChargeActivity
                    {
                        prrowid = ChargeActivityMAXRowID,
                        ChargeSID = paymentmodel.ChargeSID,
                        ActivityCount = maxactivitycount,
                        Amount = -1 * adjustamnetsDiff,
                        ActivityType = "ADJ",
                        SourceType = paymentmodel.PaymentType,
                        SourceID = paymentmodel.PayorID,
                        CreateMethod = "M",
                        TimeStamp = timestamp,
                        LastUser = practiceCompassHelper.CurrentUser(),
                        CreateStamp = timestamp,
                        CreateUser = practiceCompassHelper.CurrentUser(),
                        Pro2SrcPDB = "medman",
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        PostDate = DateTime.Now.Date,
                        AccountSID = chargerow.AccountSID,
                        DNPracticeID = chargerow.PracticeID,
                        PatientStatement = "",
                        DisplayText = ""
                    });
                    #endregion
                }
            }
            return ChargeActivities;
        }

        public List<PaymentAssignment> PaymentAssignmentAdd(List<ApplyPaymentModel> applyPaymentModel, List<Charge> Charges, List<PaymentAssignment> PaymentAssignments)
        {
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            foreach (var paymentmodel in applyPaymentModel)
            {
                var chargerow = Charges.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                var gurantorDiff = paymentmodel.PaymentType == "G" ? paymentmodel.AmountPaid - chargerow.GuarantorReceipts : 0;
                var insuranceDiff = paymentmodel.PaymentType == "I" ? paymentmodel.AmountPaid - chargerow.InsuranceReceipts : 0;
                var adjustamnetsDiff = paymentmodel.Adjustment - chargerow.Adjustments;
                //PaymentAssignment
                #region PaymentAssignment
                if (gurantorDiff != 0 || insuranceDiff != 0)
                {
                    var PaymentAssignmentMAXRowID = practiceCompassHelper.GetMAXprrowid("PaymentAssignment", PaymentAssignments.Count() != 0 ? PaymentAssignments[PaymentAssignments.Count() - 1].prrowid : "0");
                    var PAmaxactivitycount = practiceCompassHelper.GetMAXColumnid("PaymentAssignment", "ActivityCount",
                     PaymentAssignments.Count(x => x.ChargeSID == paymentmodel.ChargeSID) != 0 ? PaymentAssignments[PaymentAssignments.Count() - 1].ActivityCount.Value : 0);
                    PaymentAssignments.Add(new PaymentAssignment
                    {
                        prrowid = PaymentAssignmentMAXRowID,
                        PaymentSID = paymentmodel.PaymentSID,
                        ChargeSID = paymentmodel.ChargeSID,
                        ActivityCount = PAmaxactivitycount,
                        Amount = insuranceDiff != 0 ? insuranceDiff : gurantorDiff,
                        TimeStamp = timestamp,
                        LastUser = practiceCompassHelper.CurrentUser(),
                        CreateStamp = timestamp,
                        CreateUser = practiceCompassHelper.CurrentUser(),
                        Pro2SrcPDB = "medman",
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        AccountSID = chargerow.AccountSID,
                        PostDate = DateTime.Now.Date,
                        PatientBilled = "",
                        PatientStatement = "",
                        CreditedPlanID = paymentmodel.PlanID

                    });
                }
                #endregion
            }
            return PaymentAssignments;
        }

        public List<Account> AccountUpdate(List<ApplyPaymentModel> applyPaymentModel, List<Account> accounts, List<Charge> Charges)
        {
            var chargeIDs = applyPaymentModel.Select(x => x.ChargeSID);
            string sql = "select * from account where AccountSID in (select AccountSID from Charge where ChargeSID in @ChargeSID)";
            var AccountResults = this.db.QueryMultiple(sql, new { ChargeSID = chargeIDs });
            accounts = AccountResults.Read<Account>().ToList();

            foreach (var paymentmodel in applyPaymentModel)
            {
                var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
                var chargerow = Charges.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                var gurantorDiff = paymentmodel.PaymentType == "G" ? paymentmodel.AmountPaid - chargerow.GuarantorReceipts : 0;
                var insuranceDiff = paymentmodel.PaymentType == "I" ? paymentmodel.AmountPaid - chargerow.InsuranceReceipts : 0;
                var adjustamnetsDiff = paymentmodel.Adjustment - chargerow.Adjustments;

                #region Update_Account

                var Accountrow = accounts.FirstOrDefault(x => x.AccountSID == chargerow.AccountSID);
                Accountrow.Balance = Accountrow.Balance + gurantorDiff + insuranceDiff + adjustamnetsDiff;
                if (accounts.Find(x => x.AccountSID == Accountrow.AccountSID) != null)
                {
                    accounts.Find(x => x.AccountSID == Accountrow.AccountSID).Balance = Accountrow.Balance;
                }
                else
                {
                    accounts.Add(Accountrow);
                }

                #endregion
            }
            return accounts;

        }
        public List<ERAPaymentHeader> GetERAPaymentHeader(int PracticeID, string IsPosted, float Amount, string CheckNumber, string AmountType, string SenderAccount, string ReceiverAccount, string PostDate, int Days)
        {
            var data = this.db.QueryMultiple("uspERAPaymentHeaderGet", new
            {
                @PracticeID = PracticeID,
                @IsPosted = IsPosted,
                @Amount = Amount,
                @CheckNumber = CheckNumber,
                @AmountType = AmountType,
                @SenderAccount = SenderAccount,
                @ReceiverAccount = ReceiverAccount,
                @PostDate = PostDate,
                @Days = Days
            }, commandType: CommandType.StoredProcedure);
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var results = data.Read<ERAPaymentHeader>().ToList();
            foreach (var Paymentheader in results)
            {
                Paymentheader.TransHandlingCode = practiceCompassHelper.GetHandlingMethodFromCode(Paymentheader.TransHandlingCode).ToString();
                Paymentheader.PaymentFormatCode = practiceCompassHelper.GetPaymentFormatFromCode(Paymentheader.PaymentFormatCode).ToString();
            }

            return results;

        }

        public List<ERAPaymentDetail> GetERAPaymentDetails(int ERSPaymentSID)
        {
            var data = this.db.QueryMultiple("uspERAPaymentDetailsGet", new { @ERSPaymentSID = ERSPaymentSID }, commandType: CommandType.StoredProcedure);
            var results = data.Read<ERAPaymentDetail>().ToList();
            foreach (var item in results)
            {
                if (string.IsNullOrEmpty(item.comment_)) item.comment_ = item.comment;
                if (item.comment == "Records are Matched")
                    item.AlertCode = "Accepted,Apply all";
            }
            return results;
        }

        public void Remove(PaymentDTO entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<PaymentDTO> entities)
        {
            throw new NotImplementedException();
        }

        public Task<PaymentDTO> SingleOrDefaultAsync(Expression<Func<PaymentDTO, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public void MovetoNextPlan(List<ApplyPaymentModel> applyPaymentModel)
        {
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            List<Charge> Charges = new List<Charge>();
            List<Claim> Claims = new List<Claim>();
            List<PlanClaimCharge> PlanClaimCharge = new List<PlanClaimCharge>();
            List<ChargeActivity> ChargeActivities = new List<ChargeActivity>();
            #region Get_Charges
            var chargeIDs = applyPaymentModel.Select(x => x.ChargeSID).ToList();
            string sql = "SELECT * FROM Charge WHERE chargeSID IN @ids";
            var Chargesresults = this.db.QueryMultiple(sql, new { ids = chargeIDs });
            Charges = Chargesresults.Read<Charge>().ToList();
            #endregion

            #region get_claims
            sql = "select  *  from PlanClaimCharge where ChargeSID IN @ids";
            var PlanClaimChargeresults = this.db.QueryMultiple(sql, new { ids = chargeIDs });
            PlanClaimCharge = PlanClaimChargeresults.Read<PlanClaimCharge>().ToList();
            var ClaimIDs = PlanClaimCharge.Select(x=>x.ClaimSID);
             sql = "SELECT * FROM Claim WHERE ClaimSID IN @ids";
            var ClaimResults = this.db.QueryMultiple(sql, new { ids = ClaimIDs });
            Claims = ClaimResults.Read<Claim>().ToList();
            #endregion

            foreach (var applyPayment in applyPaymentModel)
            {

                if (applyPayment.GoToNext.Value)
                {
                    var ChargeRecord = Charges.FirstOrDefault(x => x.ChargeSID == applyPayment.ChargeSID);

                    var ClaimrecordID = PlanClaimCharge.FirstOrDefault(x => x.ChargeSID == applyPayment.ChargeSID && x.PlanID == applyPayment.PlanID && x.PolicyNumber == applyPayment.PolicyNumber).ClaimSID;
                    var Claimrecord = Claims.FirstOrDefault(x => x.ClaimSID == ClaimrecordID);

                    #region Get_Charges_Coverage
                    sql = "select  * from ChargeCoverage where ChargeSID= @ChargeSID";
                    var ChargeCoverageresults = this.db.QueryMultiple(sql, new { ChargeSID = ChargeRecord.ChargeSID }); // change to query multiple
                    var ChargeCoverage = ChargeCoverageresults.Read<ChargeCoverage>().ToList();
                    #endregion
                    //select from ChargeCoverage  by planid and PolicyNumber
                    //get next index if last one change to patient
                    var cuurent_coverage = ChargeCoverage.FirstOrDefault(x => x.PlanID == applyPayment.PlanID && x.PolicyNumber == applyPayment.PolicyNumber).CoverageOrder;
                    var Next_ChargeCoverage = ChargeCoverage.FirstOrDefault(x => x.PlanID == applyPayment.PlanID && x.PolicyNumber == applyPayment.PolicyNumber && x.CoverageOrder == cuurent_coverage + 1);
                    int? Next_Payor;
                    int Next_CoverageOrder;
                    if (Next_ChargeCoverage == null)
                    {
                        Next_CoverageOrder = 99;
                        Next_Payor = ChargeRecord.PatientID;

                    }
                    else
                    {
                        Next_CoverageOrder = cuurent_coverage + 1;
                        Next_Payor = Next_ChargeCoverage.PlanID;
                    }
                    #region Update_Charge_Record
                    ChargeRecord.RespCoverageOrder = Next_CoverageOrder;
                    ChargeRecord.TimeStamp = timestamp;
                    ChargeRecord.LastUser = practiceCompassHelper.CurrentUser();
                    ChargeRecord.pro2modified = DateTime.Now;
                    #endregion

                    #region Update_Claim
                    // update coverage order

                    if (Claimrecord != null && Next_CoverageOrder > Claimrecord.LowestRespCoverageOrder)
                    {
                        Claimrecord.LowestRespCoverageOrder = Next_CoverageOrder;
                        Claimrecord.TimeStamp = timestamp;
                        Claimrecord.LastUser = practiceCompassHelper.CurrentUser();
                        Claimrecord.pro2modified = DateTime.Now;
                    }
                    #endregion

                    #region Inset_Chargeactivity

                    string ChargeActivityMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", ChargeActivities.Count() != 0 ? ChargeActivities[ChargeActivities.Count() - 1].prrowid : "0");
                    int maxactivitycount = practiceCompassHelper.GetMAXColumnid("ChargeActivity", "ActivityCount", ChargeActivities.Count(x => x.ChargeSID == ChargeRecord.ChargeSID) != 0 ?
                    ChargeActivities[ChargeActivities.Count() - 1].ActivityCount.Value : 0, string.Format("Where ChargeSID = {0}", ChargeRecord.ChargeSID.ToString()));

                    #region ChargeActivity_XFR
                    // ChargeActivity

                    ChargeActivities.Add(new Core.Models.ChargeActivity
                    {
                        prrowid = ChargeActivityMAXRowID,
                        ChargeSID = ChargeRecord.ChargeSID,
                        ActivityCount = maxactivitycount,
                        Amount = 0,
                        ActivityType = "XFR",
                        SourceType = Next_CoverageOrder == 99 ? "G" : "I",
                        SourceID = Next_Payor,
                        CreateMethod = "M",
                        TimeStamp = timestamp,
                        LastUser = practiceCompassHelper.CurrentUser(),
                        CreateStamp = timestamp,
                        CreateUser = practiceCompassHelper.CurrentUser(),
                        Pro2SrcPDB = "medman",
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        PostDate = DateTime.Now.Date,
                        AccountSID = ChargeRecord.AccountSID,
                        DNPracticeID = ChargeRecord.PracticeID,
                        PatientStatement = "",
                        DisplayText = ""

                    });
                    #endregion

                    #endregion 
                }
            }

            //using var txScope = new TransactionScope();
            this.db.BulkUpdate(Charges);
            this.db.BulkUpdate(Claims);

            #region Insert_Statments
            var ChargeActivitySQL = "INSERT INTO [dbo].[ChargeActivity] VALUES " +
             "(@prrowid,@ChargeSID,@ActivityCount,@ActivityType,@SourceType,@SourceID,@JournalSID,@PostDate,@Amount" +
            ",@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@AccountSID,@PatientStatement,@DisplayText,@CreateMethod" +
            ",@DNPracticeID,@Pro2SrcPDB,@pro2created,@pro2modified)";

            this.db.Execute(ChargeActivitySQL, ChargeActivities);
            #endregion

            //txScope.Complete();



        }
    }
}
