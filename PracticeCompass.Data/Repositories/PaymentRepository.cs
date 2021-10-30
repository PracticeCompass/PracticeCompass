using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;

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
            var data = this.db.QueryMultiple("uspPatientPaymentGet", new { @PracticeID = PracticeID , @PatientID = PatientID, @DateType = DateType, @Datevalue = Datevalue, @Fullyapplied = Fullyapplied }, commandType: CommandType.StoredProcedure);
            return data.Read<Payment>().ToList();
        }

        public List<PaymentDetails> GetPaymentDetails(int PaymentSID)
        {
            var data = this.db.QueryMultiple("uspInsurancePaymentDetailsGet", new { @PaymentSID = PaymentSID }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentDetails>().ToList();
        }
        public List<PaymentAssignment> GetPaymentAssignment(int PaymentSID)
        {
            var data = this.db.QueryMultiple("uspPaymentAssignmentGet", new { @PaymentSID = PaymentSID }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentAssignment>().ToList();
        }

        public bool InsertUpdatePayment(string prrowid, int PaymentSID, int PracticeID, string PostDate, string Source, int PayorID, string Class, float Amount, string Method,
            string CreditCard, string AuthorizationCode, string Voucher, string CreateMethod,int LastUser,int CreateUser)
        {
            var data = this.db.QueryMultiple("uspPaymentInsertUpdate", new {
                @prrowid = prrowid,
                @PaymentSID = PaymentSID,
                @PracticeID= PracticeID,
                @PostDate= PostDate,
                @Source= Source,
                @PayorID= PayorID,
                @Class= Class,
                @Amount= Amount,
                @Method= Method,
                @CreditCard= CreditCard,
                @AuthorizationCode= AuthorizationCode,
                @Voucher= Voucher,
                @LastUser= LastUser,
                @CreateUser= CreateUser,
                @CreateMethod= CreateMethod
            }, commandType: CommandType.StoredProcedure);
            return true;
        }
        public List<PatientPayment> GetPatientPaymentforApply(int PatientID)
        {

            var data = this.db.QueryMultiple("uspPatientPaymentGetforApply", new { @PatientID = PatientID }, commandType: CommandType.StoredProcedure);
            return data.Read<PatientPayment>().ToList();
        }
        public List<PaymentClass> GetPaymentClass()
        {
            var data = this.db.QueryMultiple("uspPayClassGet", new { }, commandType: CommandType.StoredProcedure);
            return data.Read<PaymentClass>().ToList();
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
