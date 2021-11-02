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

        { this.db = new SqlConnection(connString); }
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
                @CreateMethod = CreateMethod
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
            var PaymentAssignments= new List<PaymentAssignment>();
            var PlanClaimCharges = new List<PlanClaimCharge>();

           var chargeIDs= applyPaymentModel.Select(x => x.ChargeSID);
            string sql = "SELECT * FROM Charge WHERE chargeSID IN @ids";
            var Chargesresults = this.db.QueryMultiple(sql, new { ids = chargeIDs });
            Charges = Chargesresults.Read<Charge>().ToList();
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);

            foreach (var paymentmodel in applyPaymentModel)
            {
                // update Charge
                var chargerow = Charges.FirstOrDefault(x => x.ChargeSID == paymentmodel.ChargeSID);
                chargerow.GuarantorReceipts = paymentmodel.AmountPaid;
                chargerow.Adjustments = paymentmodel.Adjustment;
                chargerow.pro2modified = DateTime.Now;

                // ChargeActivity
                string ChargeActivityMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", ChargeActivities.Count() != 0 ? ChargeActivities[ChargeActivities.Count() - 1].prrowid : "0");
                int maxactivitycount = practiceCompassHelper.GetMAXColumnid("ChargeActivity", "ActivityCount",
                     ChargeActivities.Count(x => x.ChargeSID == paymentmodel.ChargeSID) != 0 ? ChargeActivities[ChargeActivities.Count() - 1].ActivityCount.Value : 0
                     , string.Format("Where ChargeSID = {0}", paymentmodel.ChargeSID.ToString()));
                ChargeActivities.Add(new Core.Models.ChargeActivity
                {
                    prrowid = ChargeActivityMAXRowID,
                    ChargeSID = paymentmodel.ChargeSID,
                    ActivityCount = maxactivitycount,
                    Amount = paymentmodel.AmountPaid,
                    ActivityType = "PMT",
                    SourceType = paymentmodel.PaymentType,
                    SourceID = paymentmodel.PayorID,
                    CreateMethod = "M",
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = "medman",
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now
                });

                ChargeActivityMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", ChargeActivities.Count() != 0 ? ChargeActivities[ChargeActivities.Count() - 1].prrowid : "0");
                 maxactivitycount = practiceCompassHelper.GetMAXColumnid("ChargeActivity", "ActivityCount",
                     ChargeActivities.Count(x => x.ChargeSID == paymentmodel.ChargeSID) != 0 ? ChargeActivities[ChargeActivities.Count() - 1].ActivityCount.Value : 0
                     , string.Format("Where ChargeSID = {0}",paymentmodel.ChargeSID.ToString()));
                ChargeActivities.Add(new Core.Models.ChargeActivity
                {
                    prrowid = ChargeActivityMAXRowID,
                    ChargeSID = paymentmodel.ChargeSID,
                    ActivityCount = maxactivitycount,
                    Amount = paymentmodel.Adjustment,
                    ActivityType = "ADJ",
                    SourceType = paymentmodel.PaymentType,
                    SourceID = paymentmodel.PayorID,
                    CreateMethod = "M",
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = "medman",
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now
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
                    Amount = paymentmodel.AmountPaid,
                    TimeStamp = DateTime.Now.ToString(),
                    LastUser = 88,
                    CreateStamp = DateTime.Now.ToString(),
                    CreateUser = 88,
                    Pro2SrcPDB = "medman",
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now
                });
            }
            using var txScope = new TransactionScope();
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
            var PlanClaimChargeSQL = "INSERT INTO [dbo].[PlanClaimCharge] VALUES " +
           "(@prrowid,@PlanID,@ClaimSID,@PolicyNumber,@LineItem,@ChargeSID,@BilledAmount,@TimeStamp,@LastUser" +
           ",@CreateStamp,@CreateUser,@PatReceipts,@InsReceipts,@Pro2SrcPDB,@pro2created,@pro2modified)";
            var PlanClaimCharge = this.db.Execute(PlanClaimChargeSQL, PlanClaimCharges);
            txScope.Complete();
            return true;
        }

        public List<ERAPaymentHeader> GetERAPaymentHeader(int PracticeID, string IsPosted, float Amount, string CheckNumber, string AmountType)
        {
            var data = this.db.QueryMultiple("uspERAPaymentHeaderGet", new
            {
                @PracticeID = PracticeID,
                @IsPosted = IsPosted,
                @Amount = Amount,
                @CheckNumber = CheckNumber,
                @AmountType = AmountType
            }, commandType: CommandType.StoredProcedure);
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var results= data.Read<ERAPaymentHeader>().ToList();
            foreach (var Paymentheader in results)
            {
                Paymentheader.TransHandlingCode = practiceCompassHelper.GetHandlingMethodFromCode(Paymentheader.TransHandlingCode).ToString();
                Paymentheader.PaymentFormatCode = practiceCompassHelper.GetPaymentFormatFromCode(Paymentheader.PaymentFormatCode).ToString();
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
