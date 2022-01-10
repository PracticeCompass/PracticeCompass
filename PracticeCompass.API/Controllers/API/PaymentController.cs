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
        public List<PaymentDTO> InsurancePaymentGet(int PracticeID, int InsuranceID, int DateType, string Datevalue, string totxnDate, bool Fullyapplied, int amountType, int amount, string SortColumn, string SortDirection)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetInsurancePayment(PracticeID, InsuranceID, DateType, Datevalue, totxnDate, Fullyapplied,amountType,amount,SortColumn,SortDirection);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PaymentDTO>();
            }
        }
        [HttpGet]
        [Route("api/payment/PatientPaymentGet")]
        public List<PaymentDTO> PatientPaymentGet(int PracticeID, int PatientID, int DateType, string Datevalue,string totxnDate, bool Fullyapplied = false)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetPatientPayment(PracticeID, PatientID, DateType, Datevalue, totxnDate, Fullyapplied);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PaymentDTO>();
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
        public List<InsurancePayment> ApplyInsurancePaymentGet(int GuarantorID, int DOSType, string DOSvalue,string ToDOSvalue, int InsuranceID, string ClaimIcnNumber)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetInsurancePaymentforApply(GuarantorID, DOSType, DOSvalue, ToDOSvalue, InsuranceID, ClaimIcnNumber);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<InsurancePayment>();
            }
        }
        [HttpGet]
        [Route("api/payment/GetChargeAdjustmentDetails")]
        public List<ChargeAdjustmentDetail> GetChargeAdjustmentDetails(int ChargeSID, int ClaimSID,int PlanId)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetChargeAdjustmentDetails(ChargeSID, ClaimSID, PlanId);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<ChargeAdjustmentDetail>();
            }
        }
        [HttpGet]
        [Route("api/payment/PaymentSave")]
        public bool PaymentSave(int PaymentSID, int PracticeID, string PostDate, string Source, int PayorID, string Class, float Amount, string Method,
            string CreditCard, string AuthorizationCode, string Voucher, string CreateMethod, int CurrentUser)
        {
            try
            {
                if (Class == "null") Class = "";
                string prrowid = "";
                unitOfWork.PaymentRepository.InsertUpdatePayment(prrowid, PaymentSID, PracticeID, PostDate, Source, PayorID, Class, Amount, Method,
             CreditCard, AuthorizationCode, Voucher, CreateMethod, CurrentUser, CurrentUser);
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
        [HttpPost]
        [Route("api/payment/ApplyPayment")]
        public bool ApplyPayment([FromBody] List<ApplyPaymentModel> applyPaymentModel)
        {
            try
            {

                unitOfWork.PaymentRepository.ApplyPayment(applyPaymentModel);
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
        public List<ERAPaymentHeader> ERAPaymentHeaderGet(int PracticeID, string IsPosted, float Amount, string CheckNumber, string AmountType, string SenderAccount, string ReceiverAccount, string PostDate, int Days)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetERAPaymentHeader(PracticeID, IsPosted, Amount, CheckNumber != null ? CheckNumber : "", AmountType, SenderAccount != null ? SenderAccount : "", ReceiverAccount != null ? ReceiverAccount : "", PostDate != null ? PostDate : "", Days);

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

        [HttpGet]
        [Route("api/payment/ERAPost")]
        public bool ERAPost(string CheckTraceNbr)
        {
            try
            {
                return unitOfWork.ERAPostingRepository.PostERA(CheckTraceNbr);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }

    }
}