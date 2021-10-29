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
    }
}
