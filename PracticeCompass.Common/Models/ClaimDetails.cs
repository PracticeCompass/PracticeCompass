using System;
using System.Collections.Generic;
using System.Text;
using PracticeCompass.Common.Enums;

namespace PracticeCompass.Common.Models
{
    public class ClaimDetails
    {
        public string PatientAccountNumber { set; get; }
        public ClaimStatus Status { set; get; }
        public decimal BilledAmount { set; get; }
        public decimal PaidAmount { set; get; }
        public decimal PatientResponsibilityAmount { set; get; }
        public ClaimFilingType Type { set; get; }
        public string PayerControlId { set; get; }
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
            this.Status = ClaimStatus.None;
            this.BilledAmount = 0;
            this.PaidAmount = 0;
            this.PatientResponsibilityAmount = 0;
            this.Type = ClaimFilingType.None;
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
