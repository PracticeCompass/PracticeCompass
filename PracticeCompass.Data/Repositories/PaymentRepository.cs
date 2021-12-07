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

namespace PracticeCompass.Data.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private IDbConnection db;
        public PaymentRepository(string connString)

        {
            this.db = new SqlConnection(connString);
        }
        public Task AddAsync(Payment entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<Payment> entities)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<Payment, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Payment>> FindAsync(Expression<Func<Payment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<Payment> FirstOrDefaultAsync(Expression<Func<Payment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Payment>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public List<Payment> GetInsurancePayment(int PracticeID, int InsuranceID, int DateType, string Datevalue, bool Fullyapplied)
        {
            var data = this.db.QueryMultiple("uspInsurancePaymentGet", new { @PracticeID = PracticeID, @InsuranceID = InsuranceID, @DateType = DateType, @Datevalue = Datevalue, @Fullyapplied = Fullyapplied }, commandType: CommandType.StoredProcedure);
            return data.Read<Payment>().ToList();
        }

        public List<Payment> GetPatientPayment(int PracticeID, int PatientID, int DateType, string Datevalue, bool Fullyapplied)
        {
            var data = this.db.QueryMultiple("uspPatientPaymentGet", new { @PracticeID = PracticeID, @PatientID = PatientID, @DateType = DateType, @Datevalue = Datevalue, @Fullyapplied = Fullyapplied }, commandType: CommandType.StoredProcedure);
            return data.Read<Payment>().ToList();
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
            var PaymentAssignments = new List<PaymentAssignment>();
            var PlanClaimCharges = new List<PlanClaimCharge>();

            var chargeIDs = applyPaymentModel.Select(x => x.ChargeSID);
            var paymentID = applyPaymentModel[0].PaymentSID;
            string sql = "SELECT * FROM Charge WHERE chargeSID IN @ids";
            var Chargesresults = this.db.QueryMultiple(sql, new { ids = chargeIDs });
            Charges = Chargesresults.Read<Charge>().ToList();

            var Payments = new Payment();
            string paymentSql = "SELECT * FROM Payment WHERE PaymentSID = @ids";
            var Paymentsresults = this.db.QueryMultiple(paymentSql, new { ids = paymentID });
            Payments = Paymentsresults.Read<Payment>().FirstOrDefault();
            if (applyPaymentModel[0].PaymentRemaining == 0)
            {
                Payments.FullyApplied = "Y";
            }
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);

            foreach (var paymentmodel in applyPaymentModel)
            {
                var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
                // update Charge
                var chargerow = Charges.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                var gurantorDiff = paymentmodel.PaymentType == "G" ? paymentmodel.AmountPaid - chargerow.GuarantorReceipts : 0;
                var insuranceDiff = paymentmodel.PaymentType == "I" ? paymentmodel.AmountPaid - chargerow.InsuranceReceipts : 0;
                var adjustamnetsDiff = paymentmodel.Adjustment - chargerow.Adjustments;
                string ChargeActivityMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", ChargeActivities.Count() != 0 ? ChargeActivities[ChargeActivities.Count() - 1].prrowid : "0");
                int maxactivitycount = practiceCompassHelper.GetMAXColumnid("ChargeActivity", "ActivityCount",ChargeActivities.Count(x => x.ChargeSID == paymentmodel.ChargeSID) != 0 ? 
                    ChargeActivities[ChargeActivities.Count() - 1].ActivityCount.Value : 0, string.Format("Where ChargeSID = {0}", paymentmodel.ChargeSID.ToString()));
                if (gurantorDiff != 0 || insuranceDiff != 0)
                {
                    // ChargeActivity

                    ChargeActivities.Add(new Core.Models.ChargeActivity
                    {
                        prrowid = ChargeActivityMAXRowID,
                        ChargeSID = paymentmodel.ChargeSID,
                        ActivityCount = maxactivitycount,
                        Amount = insuranceDiff != 0 ? insuranceDiff : gurantorDiff ,
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
                    //PaymentAssignment
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
                if (adjustamnetsDiff != 0)
                {
                    ChargeActivityMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", ChargeActivities.Count() != 0 ? ChargeActivities[ChargeActivities.Count() - 1].prrowid : "0");
                    maxactivitycount = practiceCompassHelper.GetMAXColumnid("ChargeActivity", "ActivityCount",
                        ChargeActivities.Count(x => x.ChargeSID == paymentmodel.ChargeSID) != 0 ? ChargeActivities[ChargeActivities.Count() - 1].ActivityCount.Value : 0
                        , string.Format("Where ChargeSID = {0}", paymentmodel.ChargeSID.ToString()));
                    ChargeActivities.Add(new Core.Models.ChargeActivity
                    {
                        prrowid = ChargeActivityMAXRowID,
                        ChargeSID = paymentmodel.ChargeSID,
                        ActivityCount = maxactivitycount,
                        Amount = adjustamnetsDiff,
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
                }


                if (paymentmodel.PaymentType == "G")
                    chargerow.GuarantorReceipts = paymentmodel.AmountPaid;
                else
                    chargerow.InsuranceReceipts = paymentmodel.AmountPaid;
                chargerow.Adjustments = paymentmodel.Adjustment;
                chargerow.pro2modified = DateTime.Now;
                chargerow.TimeStamp = timestamp;
                if ((chargerow.Amount - (Decimal)(chargerow.InsuranceReceipts + chargerow.GuarantorReceipts + chargerow.Adjustments)) == 0)
                {
                    chargerow.RecordStatus = "S";
                }
            }
            using var txScope = new TransactionScope();
            this.db.BulkUpdate(Charges);
            this.db.BulkUpdate(Payments);
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
            txScope.Complete();
            return true;
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

        public void Remove(Payment entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Payment> entities)
        {
            throw new NotImplementedException();
        }

        public Task<Payment> SingleOrDefaultAsync(Expression<Func<Payment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
