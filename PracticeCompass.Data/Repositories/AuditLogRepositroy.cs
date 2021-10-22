using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;

namespace PracticeCompass.Data.Repositories
{
    public class AuditLogRepositroy : IAuditLogRepositroy
    {
        private IDbConnection db;
        public AuditLogRepositroy(string connString)

        { this.db = new SqlConnection(connString); }
        public Task AddAsync(AuditLog entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<AuditLog> entities)
        {
            throw new NotImplementedException();
        }

        public bool AuditLogInsert(string Audit_PatientID, string Audit_PatientName, int Audit_EncounterSID, int Audit_ProcedureEventSID, string Audit_ProcedureName, string Audit_UserName, string Audit_Type, string Audit_Location, string Audit_Module, string Audit_Practice, string Audit_Comment)
        {
            try
            {
                this.db.Execute("uspAuditLogInsert", new { @Audit_PatientID = Audit_PatientID, @Audit_PatientName = Audit_PatientName,
                    @Audit_EncounterSID = Audit_EncounterSID,
                    @Audit_ProcedureEventSID = Audit_ProcedureEventSID,
                    @Audit_ProcedureName = Audit_ProcedureName,
                    @Audit_UserName = Audit_UserName,
                    @Audit_Type = Audit_Type,
                    @Audit_Location = Audit_Location,
                    @Audit_Module = Audit_Module,
                    @Audit_Practice = Audit_Practice,
                    @Audit_Comment = Audit_Comment
                }, commandType: CommandType.StoredProcedure);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public Task<int> CountAsync(Expression<Func<AuditLog, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AuditLog>> FindAsync(Expression<Func<AuditLog, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<AuditLog> FirstOrDefaultAsync(Expression<Func<AuditLog, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AuditLog>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public void Remove(AuditLog entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<AuditLog> entities)
        {
            throw new NotImplementedException();
        }

        public Task<AuditLog> SingleOrDefaultAsync(Expression<Func<AuditLog, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
