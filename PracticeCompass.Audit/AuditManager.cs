using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PracticeCompass.Audit
{
    public class AuditManager
    {
        /// <summary>
        /// Creates an audit record according to IHE ATNA standards
        /// </summary>
        /// <param name="evnActionId">The id of the audited operation (Ex.: create, update, delete...)</param>
        /// <param name="evnOutcomeIndicator">The flag of the operation result (Ex.: success or failuer)</param>
        /// <param name="evnId">The id of the audited event (Ex.: UserAuthenticated, Query, Import, Export... )</param>
        /// <param name="evnTypeId">The id of the audited event type (Ex.: Login, Logout, Patient Identity Feed...)</param>
        /// <param name="userId">The id of the active participant whom initiated the event action</param>
        /// <param name="altUserId">An alternative id for the active participant whom initiated the event action</param>
        /// <param name="userName">The name of the active participant whom initiated the event action</param>
        /// <param name="netAccessTypeId">The type of the audited network access point (Ex.: IP Address)</param>
        /// <param name="netAccessId">The id of the audited network access point</param>
        /// <param name="roleId">The role of the active participant whom initiated the event action (Ex.: Source, destination, application...)</param>
        /// <param name="sourceId">The id of the audited domain</param>
        /// <param name="siteId">The id of the healthcare enterprise</param>
        /// <param name="sourceTypeId">The id of the audited domain type (Ex.: End user interface)</param>
        /// <param name="isUserRequestor">Assumed "true" if not specified</param>
        public void AuditTrail(int? evnActionId, bool evnOutcomeIndicator, int evnId, int? evnTypeId, int userId, int? altUserId, string userName, int? netAccessTypeId, string netAccessId, int? roleId, int sourceId, long? siteId, int? sourceTypeId, bool isUserRequestor = true)
        {
            AuditBuffer.AddAuditItem(evnActionId, evnOutcomeIndicator, evnId, evnTypeId, userId, altUserId, userName, netAccessTypeId, netAccessId, roleId, sourceId, siteId, sourceTypeId, isUserRequestor, null, null, null);
        }

        public void AuditTrail(int? evnActionId, bool evnOutcomeIndicator, int evnId, int? evnTypeId, int userId, int? altUserId, string userName, int? netAccessTypeId, string netAccessId, int? roleId, int sourceId, long? siteId, int? sourceTypeId, bool isUserRequestor, long? patientId, long? visitId, string comment)
        {
            AuditBuffer.AddAuditItem(evnActionId, evnOutcomeIndicator, evnId, evnTypeId, userId, altUserId, userName, netAccessTypeId, netAccessId, roleId, sourceId, siteId, sourceTypeId, isUserRequestor, patientId, visitId, comment);
        }
    }
    public class AuditBuffer
    {
        //public static ConcurrentQueue<AuditTrailModel> Buffer { get; set; }
        public static List<AuditTrailModel> Buffer { get; set; }
        public static int MaximumAuditBufferSize { get; set; }
        private static readonly object BufferLock = new object();
        private static readonly object FlushLock = new object();

        static AuditBuffer()
        {
            Buffer = new List<AuditTrailModel>();
            MaximumAuditBufferSize = 10;
        }

        public static void AddAuditItem(int? evnActionId, bool evnOutcomeIndicator, int evnId, int? evnTypeId, int userId,
                               int? altUserId, string userName, int? netAccessTypeId, string netAccessId, int? roleId,
                               int sourceId, long? siteId, int? sourceTypeId, bool isUserRequestor, long? patientId,
                               long? visitId, string comment)
        {
            var audit = new AuditTrailModel
            {
                UserId = userId,
                UserName = userName
            };
            lock (BufferLock)
            {
                Buffer.Add(audit);
            }
            // TODO: 10 should be configuration
            if (Buffer.Count >= 10) Task.Factory.StartNew(FlushBuffer);
        }

        public static void AddAuditItems(List<AuditTrailModel> auditItems)
        {
            lock (BufferLock)
            {
                Buffer.AddRange(auditItems);
            }
            // TODO: 10 should be configuration
            if (Buffer.Count >= 10) Task.Factory.StartNew(FlushBuffer);
        }

        public static void FlushBuffer()
        {
            try
            {
                AuditTrailModel[] localBuffer;
                lock (BufferLock)
                {
                    if (!Buffer.Any()) return;
                    localBuffer = new AuditTrailModel[Buffer.Count];
                    Buffer.CopyTo(localBuffer);
                    Buffer.Clear();
                }
                lock (FlushLock)
                {
                    if (!localBuffer.Any()) return;
                    // Save audit into DB 

                    //var audit = new AuditDomainContext("");
                    //localBuffer.ToList().ForEach(audit.AddAuditTrail);
                    //audit.SaveChanges();
                }
            }
            catch (Exception ex)
            {    // TODO: we should log exception here
            }
        }
    }
}