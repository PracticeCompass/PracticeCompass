using System;
using System.Collections.Generic;
using System.Text;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IAuditLogRepositroy : IRepository<AuditLog>
    {
        bool AuditLogInsert(string Audit_PatientID, string Audit_PatientName, int Audit_EncounterSID,
            int Audit_ProcedureEventSID, string Audit_ProcedureName, string Audit_UserName
            ,string Audit_Type , string Audit_Location , string Audit_Module , string Audit_Practice , string Audit_Comment);
    }
}
