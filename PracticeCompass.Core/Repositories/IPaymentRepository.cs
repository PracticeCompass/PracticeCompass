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
        PaymentDetails GetPaymentDetails(int PaymentSID);
        List<PaymentAssignmentDTO> GetPaymentAssignment(int PaymentSID);
        bool InsertUpdatePayment(string prrowid, int PaymentSID, int PracticeID, string PostDate, string Source, int PayorID, string Class, float Amount, string Method,
            string CreditCard, string AuthorizationCode, string Voucher, string CreateMethod, int LastUser, int CreateUser);
        List<PatientPayment> GetPatientPaymentforApply(int PatientID);
        List<InsurancePayment> GetInsurancePaymentforApply(int GuarantorID, int DOSType, string DOSvalue, int InsuranceID, string ClaimIcnNumber);
        bool ApplyPayment(List<ApplyPaymentModel> applyPaymentModel);
        List<ERAPaymentHeader> GetERAPaymentHeader(int PracticeID, string IsPosted, float Amount, string CheckNumber, string AmountType, string SenderAccount, string ReceiverAccount, string PostDate, string Days);

        List<ERAPaymentDetail> GetERAPaymentDetails(int ERSPaymentSID);

    }
}
