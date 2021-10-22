using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Common.Models
{
    public class OutpatientAdjudication
    {
        public List<ERARemark> Remarks { set; get; }
        public decimal MedicareMedicaidReimbursementRate { set; get; }
        public decimal HcpcsMonetaryAmount { set; get; }
        public OutpatientAdjudication()
        {
            this.Remarks = new List<ERARemark>();
            this.MedicareMedicaidReimbursementRate = 0;
            this.HcpcsMonetaryAmount = 0;
        }
    }
}
