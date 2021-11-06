﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ERAPaymentDetail
    {
        public ERAPaymentDetail()
        {
        }

        public int ERSClaimSID { get; set; }
        public int ERSChargeSID { get; set; }
        public string PayerClaimControlNumber { get; set; }
        public string ClaimNumber { get; set; }
        public string NameLastOrOrgName { get; set; }
        public string NameFirst { get; set; }
        public string ProcedureModifier01 { get; set; }
        public string ProcedureModifier02 { get; set; }
        public string ProductServiceID { get; set; }
        public string ServiceDate { get; set; }
        public string DateTimeQualifier { get; set; }
        public float LineItemChargeAmt { get; set; }
        public float LineItemProviderPaymentAmt { get; set; }
        public float ChargeClaimAdjustmentAmt { get; set; }
        public string ChargeClaimAdjustmentReason { get; set; }
        public float ClaimAdjustmentAmt { get; set; }
        public string ERSClaimAdjustmentreason { get; set; }
        public float ProviderAdjustmentAmt { get; set; }
        public string PmtProvLevelAdjReason { get; set; }
    }
}