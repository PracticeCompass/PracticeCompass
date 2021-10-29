﻿using Microsoft.AspNetCore.Mvc;
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
        public List<PaymentDetails> PaymentDetailsGet(int PaymentSID)
        {
            try
            {
                return unitOfWork.PaymentRepository.GetPaymentDetails(PaymentSID);

            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return new List<PaymentDetails>();
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
    }
}