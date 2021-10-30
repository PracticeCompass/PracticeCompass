using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IPaymentRepository:IRepository<Payment>
    {
        List<Payment> GetInsurancePayment(int PracticeID , int PatientID, int DateType, string Datevalue, bool Fullyapplied);
        List<Payment> GetPatientPayment(int PracticeID, int PatientID, int DateType, string Datevalue, bool Fullyapplied);
        List<PaymentClass> GetPaymentClass();
        List<PaymentDetails> GetPaymentDetails(int PaymentSID);
        List<PaymentAssignment> GetPaymentAssignment(int PaymentSID);
        bool InsertUpdatePayment(string prrowid, int PaymentSID, int PracticeID, string PostDate, string Source, int PayorID, string Class, float Amount, string Method,
            string CreditCard, string AuthorizationCode, string Voucher, string CreateMethod, int LastUser, int CreateUser);
        List<PatientPayment> GetPatientPaymentforApply(int PatientID);
    }
}
