using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class ChargeDetails
    {
        public ChargeDetails()
        {
        }

        #region Generated Properties
        public string ChargeSID { get; set; }
        public string ProcedureCode { get; set; }
        public string ProcedureDescription { get; set; } 
        public float Units { get; set; }
        public float Amount { get; set; }
        public string FromServiceDate { get; set; }
        public string ToServiceDate { get; set; }
        public string TOSCode { get; set; }
        public string Modifier1 { get; set; }
        public string Modifier2 { get; set; }
        public string Modifier3 { get; set; }
        public string Modifier4 { get; set; }
        public string Diag1 { get; set; }
        public string Diag2 { get; set; }
        public string Diag3 { get; set; }
        public string Diag4 { get; set; }
        public string Diag5 { get; set; }
        public string Diag6 { get; set; }
        public string Diag7 { get; set; }
        public string Diag8 { get; set; }
        public string AuthorizationNumber { get; set; }
        public string RenderingID { get; set; }
        public string RenderingName { get; set; }
        public string SupervisingID { get; set; }
        public string SupervisingName { get; set; }
        public float ApprovedAmount { get; set; }
        public float PatientPortion { get; set; }
        public float PatientPaid { get; set; }
        public float InsurancePaid { get; set; }
        public float ChargeBalance { get; set; }
        public string RecordStatus { get; set; }
        public string CurrentStatus { get; set; }
        public string ReferralSID { get; set; }
        public string ReferralName { get; set; }

        #endregion

    }
}
