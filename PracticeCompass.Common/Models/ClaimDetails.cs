using System;
using System.Collections.Generic;
using System.Text;
using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class ClaimDetails
    {
        public string PatientAccountNumber { set; get; }
        public string Status { set; get; }
        public decimal BilledAmount { set; get; }
        public decimal PaidAmount { set; get; }
        public decimal PatientResponsibilityAmount { set; get; }
        public string Type { set; get; }
        public string PayerControlId { set; get; }
        public string FacilityTypeCode { set; get; }
        public string ClaimFrequencyTypeCode { set; get; }
        public string DiagnosisRelatedGroupCode { set; get; }
        public decimal? DiagnosisRelatedGroupWeight { set; get; }
        public decimal? DischargeFraction { set; get; }
        public Patient Patient { set; get; }
        public Subscriber Subscriber { set; get; }
        public Provider Provider { set; get; }
        public Carrier Carrier { set; get; }
        public DateTime ClaimReceivedDate { set; get; }
        public DateTime StatementStartDate { set; get; }
        public DateTime StatementEndDate { set; get; }
        public OutpatientAdjudication OutPatientAdjudication { set; get; }
        public List<ServiceLine> ServiceLineItems { set; get; }
        public List<ClaimAdjustment> Adjustments { set; get; }
        public ClaimDetails()
        {
            this.PatientAccountNumber = string.Empty;
            this.Status = string.Empty;
            this.ClaimFrequencyTypeCode = string.Empty;
            this.DiagnosisRelatedGroupCode = string.Empty;
            this.DiagnosisRelatedGroupWeight = 0;
            this.DischargeFraction = 0;
            this.FacilityTypeCode = string.Empty;
            this.BilledAmount = 0;
            this.PaidAmount = 0;
            this.PatientResponsibilityAmount = 0;
            this.Type = string.Empty;
            this.PayerControlId = string.Empty;
            this.Patient = new Patient();
            this.Subscriber = new Subscriber();
            this.Provider = new Provider();
            this.Carrier = new Carrier();
            this.ClaimReceivedDate = new DateTime(1900, 1, 1);
            this.StatementStartDate = new DateTime(1900, 1, 1);
            this.StatementEndDate = new DateTime(1900, 1, 1);
            this.OutPatientAdjudication = new OutpatientAdjudication();
            this.ServiceLineItems = new List<ServiceLine>();
            this.Adjustments = new List<ClaimAdjustment>();
        }

    }
}
