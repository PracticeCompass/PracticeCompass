using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IPaymentRepository:IRepository<Payment>
    {
        List<Payment> GetInsurancePayment(int PracticeID , int PatientID);
        List<Payment> GetPatientPayment(int PracticeID, int PatientID);
        List<PaymentClass> GetPaymentClass();
        List<PaymentDetails> GetPaymentDetails(int PaymentSID);
    }
}
