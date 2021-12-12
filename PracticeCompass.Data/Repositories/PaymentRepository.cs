﻿using Dapper;
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

        public List<PaymentDTO> GetInsurancePayment(int PracticeID, int InsuranceID, int DateType, string Datevalue, bool Fullyapplied)
        {
            var data = this.db.QueryMultiple("uspInsurancePaymentGet", new { @PracticeID = PracticeID, @InsuranceID = InsuranceID, @DateType = DateType, @Datevalue = Datevalue, @Fullyapplied = Fullyapplied }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentDTO>().ToList();
        }

        public List<PaymentDTO> GetPatientPayment(int PracticeID, int PatientID, int DateType, string Datevalue, bool Fullyapplied)
        {
            var data = this.db.QueryMultiple("uspPatientPaymentGet", new { @PracticeID = PracticeID, @PatientID = PatientID, @DateType = DateType, @Datevalue = Datevalue, @Fullyapplied = Fullyapplied }, commandType: CommandType.StoredProcedure);
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
        public List<InsurancePayment> GetInsurancePaymentforApply(int GuarantorID, int DOSType, string DOSvalue, int InsuranceID, string ClaimIcnNumber)
        {
            var data = this.db.QueryMultiple("uspInsurancePaymentGetforApply", new
            {
                @GuarantorID = GuarantorID,
                @DOSType = DOSType,
                @DOSvalue = DOSvalue,
                @InsuranceID = InsuranceID,
                @ClaimIcnNumber = ClaimIcnNumber
            }, commandType: CommandType.StoredProcedure);
            return data.Read<InsurancePayment>().ToList();
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

            // update Charge
            Charges = ChargesUpdate(applyPaymentModel, Charges);
            ChargeActivities = ChargeActivityAdd(applyPaymentModel, ChargeActivities, Charges);
            PaymentAssignments = PaymentAssignmentAdd(applyPaymentModel, Charges, PaymentAssignments);
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
            return true;
        }

        public List<Charge> ChargesUpdate(List<ApplyPaymentModel> applyPaymentModel , List<Charge> Charges)
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
                #endregion

            }
            return Charges;
        }

        public List<ChargeActivity> ChargeActivityAdd(List<ApplyPaymentModel> applyPaymentModel, List<ChargeActivity> ChargeActivities , List<Charge> Charges)
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
                    LastUser = 88,
                    CreateStamp = timestamp,
                    CreateUser = 88,
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
                    LastUser = 88,
                    CreateStamp = timestamp,
                    CreateUser = 88,
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

        public List<PaymentAssignment> PaymentAssignmentAdd (List<ApplyPaymentModel> applyPaymentModel, List<Charge> Charges, List<PaymentAssignment> PaymentAssignments)
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
                        LastUser = 88,
                        CreateStamp = timestamp,
                        CreateUser = 88,
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

        public List<Account> AccountUpdate (List<ApplyPaymentModel> applyPaymentModel , List<Account> accounts, List<Charge> Charges)
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

                accounts.Add(Accountrow);
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
    }
}
