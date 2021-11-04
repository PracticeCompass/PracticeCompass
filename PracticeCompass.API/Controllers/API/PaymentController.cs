using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PracticeCompass.API.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using System;
using PracticeCompass.Logger;

namespace PracticeCompass.API.Controllers.API
{
    public class PaymentController : Controller
    {
        private readonly ITechnoMedicUnitOfWork unitOfWork;
        public PaymentController(ITechnoMedicUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("api/payment/InsurancePaymentGet")]
        public List<Payment> InsurancePaymentGet(int PracticeID, int InsuranceID,int DateType ,string Datevalue , bool Fullyapplied = false)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetInsurancePayment(PracticeID, InsuranceID, DateType,Datevalue , Fullyapplied);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Payment>();
            }
        }
        [HttpGet]
        [Route("api/payment/PatientPaymentGet")]
        public List<Payment> PatientPaymentGet(int PracticeID, int PatientID, int DateType , string Datevalue, bool Fullyapplied = false)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetPatientPayment(PracticeID, PatientID, DateType, Datevalue, Fullyapplied);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<Payment>();
            }
        }
        [HttpGet]
        [Route("api/payment/PaymentDetailsGet")]
        public PaymentDetails PaymentDetailsGet(int PaymentSID)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetPaymentDetails(PaymentSID);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new PaymentDetails();
            }
        }
        [HttpGet]
        [Route("api/payment/PaymentAssignmentGet")]
        public List<PaymentAssignmentDTO> PaymentAssignmentGet(int PaymentSID)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetPaymentAssignment(PaymentSID);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PaymentAssignmentDTO>();
            }
        }
        [HttpGet]
        [Route("api/payment/ApplyPatientPaymentGet")]
        public List<PatientPayment> ApplyPatientPaymentGet(int PatientID)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetPatientPaymentforApply(PatientID);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PatientPayment>();
            }
        }
        [HttpGet]
        [Route("api/payment/ApplyInsurancePaymentGet")]
        public List<InsurancePayment> ApplyInsurancePaymentGet(int GuarantorID,int DOSType,string DOSvalue, int InsuranceID, string ClaimIcnNumber)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetInsurancePaymentforApply(GuarantorID,DOSType,DOSvalue,InsuranceID,ClaimIcnNumber);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<InsurancePayment>();
            }
        }
        [HttpGet]
        [Route("api/payment/PaymentSave")]
        public bool PaymentSave(int PaymentSID,int PracticeID ,string PostDate, string Source,int PayorID , string Class,float Amount ,string Method,
            string CreditCard,string AuthorizationCode ,string Voucher, string CreateMethod,int CurrentUser)
        {
            try
            {
                string prrowid = "";
                unitOfWork.PaymentRepository.InsertUpdatePayment( prrowid,PaymentSID,  PracticeID,  PostDate,  Source,  PayorID,  Class,  Amount,  Method,
             CreditCard,  AuthorizationCode,  Voucher,  CreateMethod, CurrentUser, CurrentUser);
                return true;

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/payment/PaymentClassGet")]
        public List<PaymentClass> PaymentClassGet()
        {
            try
            {
                return unitOfWork.PaymentRepository.GetPaymentClass();

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PaymentClass>();
            }
        }
        [HttpGet]
        [Route("api/payment/ApplyPayment")]
        public bool ApplyPayment(List<ApplyPaymentModel> applyPaymentModel)
        {
            try
            {
                ApplyPaymentModel applyPaymentModel1 = new ApplyPaymentModel();
                applyPaymentModel1.ChargeSID = 3507;
                applyPaymentModel1.AmountPaid = 10;
                applyPaymentModel1.Adjustment = 20;
                ApplyPaymentModel applyPaymentModel2 = new ApplyPaymentModel();
                applyPaymentModel2.ChargeSID = 3509;
                applyPaymentModel2.AmountPaid = 25;
                applyPaymentModel2.Adjustment = 40;
                applyPaymentModel.Add(applyPaymentModel1);
                applyPaymentModel.Add(applyPaymentModel2);
                unitOfWork.PaymentRepository.ApplyPayment(applyPaymentModel);
                // Get List of Rows
                // Scope tranaction
                // update charge
                // ChargeActivity
                // PaymentAssignment
                return true;

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }
        [HttpGet]
        [Route("api/payment/ERAPaymentHeaderGet")]
        public List<ERAPaymentHeader> ERAPaymentHeaderGet(int PracticeID ,string IsPosted, float Amount,string CheckNumber="",string AmountType="")
        {
            try
            {
                return unitOfWork.PaymentRepository.GetERAPaymentHeader(PracticeID,IsPosted,Amount,CheckNumber != null?CheckNumber:"", AmountType);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ERAPaymentHeader>();
            }
        }
        [HttpGet]
        [Route("api/payment/ERAPaymentDetailsGet")]
        public List<ERAPaymentDetail> ERAPaymentDetailsGet(int ERSPaymentSID)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetERAPaymentDetails(ERSPaymentSID);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ERAPaymentDetail>();
            }
        }

    }
}