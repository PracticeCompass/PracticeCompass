using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Common.Models;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;
using PracticeCompass.Core.Common;
using Dapper;
using System.Linq;

namespace PracticeCompass.Data.Repositories
{
    public class EClaimReportsRepository : IClaimReportsRepository
    {
        private IDbConnection db;
        private string connectionstrting;
        public EClaimReportsRepository(string connString)

        {
            this.db = new SqlConnection(connString);
            connectionstrting = connString;

        }


        public Task AddAsync(PlanClaimStatus entity)
        {
            throw new NotImplementedException();
        }



        public Task AddRangeAsync(IEnumerable<PlanClaimStatus> entities)
        {
            throw new NotImplementedException();
        }


        public Task<int> CountAsync(Expression<Func<PlanClaimStatus, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<PlanClaimStatus>> FindAsync(Expression<Func<PlanClaimStatus, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<PlanClaimStatus> FirstOrDefaultAsync(Expression<Func<PlanClaimStatus, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
        public void Remove(PlanClaimStatus entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<PlanClaimStatus> entities)
        {
            throw new NotImplementedException();
        }


        public Task<PlanClaimStatus> SingleOrDefaultAsync(Expression<Func<PlanClaimStatus, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<PlanClaimStatus>> IRepository<PlanClaimStatus>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }
        public bool ParseClaimReport(ClaimReportModel claimReportModel)
        {
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            var claimstatuses = new List<PlanClaimStatus>();
            for (var cr = 0; cr < claimReportModel.ClaimReportItems.Count; cr++)
            {
                string PlanClaimstatusMAXRowID = practiceCompassHelper.GetMAXprrowid("PlanClaimStatus", claimstatuses.Count() != 0 ? claimstatuses[claimstatuses.Count() - 1].prrowid : "0");
                #region Practice
                var claimSql = "select* from Practice inner join StaffAltID" +
                " on practice.GroupStaffID = StaffAltID.StaffID and StaffAltID.AidTag = 'TAXID' " +
                " and StaffAltID.PracticeID = Practice.PracticeID where ID=@ID ";
                var practiceModel = new Practice();
                practiceModel = this.db.QueryFirstOrDefault<Practice>(claimSql, new { ID = claimReportModel.ClaimReportItems[cr].PracticeTaxCode });
                #endregion

                #region get claim model
                var ClaimModel = new Claim();
                string claimsql = "select * from claim where ClaimNumber= @ClaimNumber";
                ClaimModel = this.db.QueryFirstOrDefault<Claim>(claimsql, new { ClaimNumber = claimReportModel.ClaimReportItems[cr].ClaimNumber.Replace(practiceModel.PracticeCode, "") });
                int? claimSID = 0;
                if (ClaimModel != null) claimSID = ClaimModel.ClaimSID;
                #endregion
                #region plan data 
                var batchrunSql = "select * from BatchRunClaim where RunNumber = @RunNumber and PracticeID = @PracticeID and ClaimSID = @ClaimSID";
                var BatchRun = new BatchRunClaim();
                BatchRun = this.db.QueryFirstOrDefault<BatchRunClaim>(batchrunSql, new { RunNumber= 
                    claimReportModel.ClaimReportItems[cr].RunNumber,PracticeID= practiceModel.PracticeID,ClaimSID=ClaimModel.ClaimSID});
                #endregion
                int maxStatusCount = practiceCompassHelper.GetMAXColumnid("PlanClaimStatus", "StatusCount", claimstatuses.Count(x => x.ClaimSID == claimSID) != 0 ?
                   claimstatuses[claimstatuses.Count() - 1].StatusCount.Value : 0, string.Format("Where ClaimSID = {0}", claimSID.ToString()));
                int maxerrorSequence= practiceCompassHelper.GetMAXColumnid("PlanClaimStatus", "ErrorSequence", claimstatuses.Count(x => x.ClaimSID == claimSID &&x.ErrorSequence!=null) != 0 ?
                   claimstatuses[claimstatuses.Count() - 1].ErrorSequence.Value : 0, string.Format("Where ClaimSID = {0} and ReportType='05' ", claimSID.ToString()));
               
                var planclaimstatus = new PlanClaimStatus
                {
                    TimeStamp = timestamp,
                    CreateStamp = timestamp,
                    CreateUser = practiceCompassHelper.CurrentUser(),
                    LastUser = practiceCompassHelper.CurrentUser(),
                    pro2created = DateTime.Now,
                    pro2modified = DateTime.Now,
                    Pro2SrcPDB = "medman",
                    ErrorField = claimReportModel.ClaimReportItems[cr].ErrorField,
                    ErrorLevel = claimReportModel.ClaimReportItems[cr].ErrorLevel,
                    ErrorFieldData = claimReportModel.ClaimReportItems[cr].ErrorFieldData,
                    ErrorFieldName= "",
                    ErrorRejectReason = claimReportModel.ClaimReportItems[cr].ErrorRejectReason,
                    ErrorMessage = claimReportModel.ClaimReportItems[cr].Message,
                    ErrorSequence= claimReportModel.reportType == "05" ? maxerrorSequence:(int?)null,
                    ClearinghouseClaimRef = claimReportModel.reportType == "04" ? claimReportModel.ClaimReportItems[cr].ClearingHouseClaimref:null,
                    ClearinghouseFileRef = claimReportModel.reportType == "04" ? claimReportModel.ClaimReportItems[cr].ClearingHouseFileref:null,
                    ClaimStatus = claimReportModel.ClaimReportItems[cr].ClaimStatus,
                    StatusCategory = claimReportModel.ClaimReportItems[cr].SatatusCategory,
                    ReportType = claimReportModel.reportType,
                    prrowid = PlanClaimstatusMAXRowID,
                    StatusSource = claimReportModel.ClaimReportItems[cr].SatatusSource,
                    StatusCount = maxStatusCount,
                    ClaimSID = claimSID,
                    PayerClaimID = claimReportModel.ClaimReportItems[cr].PayerClaimID,
                    PlanID= BatchRun.PlanID,
                    PolicyNumber= BatchRun.PolicyNumber,
                    AmountPaid = (claimReportModel.reportType == "10"|| claimReportModel.reportType == "11") ? BatchRun.TotalClaimAmount:null,
                    DueDate=null,
                    StatusDateStamp= timestamp,
                    SplitClaim = claimReportModel.reportType == "10" ? 1 : (int?)null,
                    PayerAddress1="",
                    PayerAddress2="",
                    PayerCity="",
                    PayerContact="",
                    PayerPhone="",
                    PayerState="",
                    PayerZip="",
                    PayerFileID="",
                   // FileArchiveSID=null,
                };
                claimstatuses.Add(planclaimstatus);
            }

            var PlanClaimStatusSql = "INSERT INTO [dbo].[PlanClaimStatus] VALUES( @prrowid,@PlanID,@PolicyNumber,@ClaimSID,@StatusCount,@ReportType" +
           ", @StatusSource, @StatusDateStamp, @StatusCategory, @ClaimStatus, @AmountPaid, @PayerClaimID, @ErrorFieldData" +
           ", @ErrorField, @ErrorFieldName, @ErrorSequence, @ErrorMessage, @ErrorRejectReason, @ErrorLevel, @SplitClaim" +
           ", @TimeStamp, @LastUser, @CreateStamp, @CreateUser, @FileArchiveSID, @ClearinghouseFileRef, @ClearinghouseClaimRef" +
           ", @DueDate, @PayerPhone, @PayerContact, @PayerAddress1, @PayerAddress2, @PayerCity, @PayerState, @PayerZip, @PayerFileID" +
           ", @Pro2SrcPDB, @pro2created, @pro2modified)";
            var claimstatus = this.db.Execute(PlanClaimStatusSql, claimstatuses);
            return true;
        }

    }
}
