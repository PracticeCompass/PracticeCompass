using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class AuditLog
    {
        public AuditLog()
        {
        }

        #region Generated Properties

        public int AuditID { get; set; }
        public string Audit_PatientID { get; set; }
        public string Audit_PatientName { get; set; }
        public string Audit_EncounterSID { get; set; }
        public string Audit_ProcedureEventSID { get; set; }
        public string Audit_ProcedureName { get; set; }
        public string Audit_UserName { get; set; }
        public string Audit_Date { get; set; }
        public string Audit_Type { get; set; }
        public string Audit_Location { get; set; }
        public string Audit_Module { get; set; }
        public string Audit_Practice { get; set; }
        public string Audit_Comment { get; set; }



        #endregion
    }
}
