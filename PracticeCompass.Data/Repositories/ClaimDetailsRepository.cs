using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;

namespace PracticeCompass.Data.Repositories
{
    public class ClaimDetailsRepository : IClaimDetailsRepository
    {
        private IDbConnection db;
        public ClaimDetailsRepository(string connString)
           
        { this.db = new SqlConnection(connString); }


        public Task AddAsync(ClaimDetails entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<ClaimDetails> entities)
        {
            throw new NotImplementedException();
        }

       

        public Task<int> CountAsync(Expression<Func<ClaimDetails, bool>> predicate)
        {
            throw new NotImplementedException();
        }

       

        public void Remove(ClaimDetails entity)
        {
            throw new NotImplementedException();
        }


        public void RemoveRange(IEnumerable<ClaimDetails> entities)
        {
            throw new NotImplementedException();
        }


        Task<IEnumerable<ClaimDetails>> IRepository<ClaimDetails>.FindAsync(Expression<Func<ClaimDetails, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<ClaimDetails> IRepository<ClaimDetails>.FirstOrDefaultAsync(Expression<Func<ClaimDetails, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<ClaimDetails>> IRepository<ClaimDetails>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<ClaimDetails> IRepository<ClaimDetails>.SingleOrDefaultAsync(Expression<Func<ClaimDetails, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }
        public List<ClaimDetails> ClaimDetailsGet(int ClaimSID, int PracticeID)
        {
            var data = this.db.QueryMultiple("uspClaimDetailsGet", new
            {
                @ClaimSID = ClaimSID,
                @PracticeID = PracticeID,
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<ClaimDetails>().ToList();
        }
        public List<ClaimNote> ClaimNotesGet(int ClaimSID)
        {
            var data = this.db.QueryMultiple("uspClaimNotesGet", new
            {
                @ClaimSID = ClaimSID
            },
               commandType: CommandType.StoredProcedure);
            return data.Read<ClaimNote>().ToList();
        }
        public List<ChargeDTO> ChargeGridGet(int ClaimSID)
        {
            var data = this.db.QueryMultiple("uspChargeGridGet", new
            {
                @ClaimSID = ClaimSID
            },
              commandType: CommandType.StoredProcedure);
            return data.Read<ChargeDTO>().ToList();
        }
        public List<SubmissionHistory> ClaimSubmissionHistoryGet(int ClaimSID)
        {
            var data = this.db.QueryMultiple("uspClaimSubmissionHistoryGet", new
            {
                @ClaimSID = ClaimSID
            },
              commandType: CommandType.StoredProcedure);
            return data.Read<SubmissionHistory>().ToList();
        }

        public bool ClaimDetailsUpdate(ClaimDetails claimDetails,string ClaimSID)
        {
            var data = this.db.QueryMultiple("ClaimDetailsUpdate", new
            {
                @ClaimSID= ClaimSID,
                @ClaimNumber = claimDetails.ClaimNumber,
                @PracticeID = claimDetails.PracticeID,
                @OriginalCRN = claimDetails.OriginalCRN,
                @AccidentRelated = claimDetails.AccidentRelated,
                @PrimaryStatus = claimDetails.PrimaryStatus,
                @PrimaryBilledDate = claimDetails.PrimaryBilledDate,
                @SeconadryStatus = claimDetails.SeconadryStatus,
                @SeconadryBilledDate = claimDetails.SeconadryBilledDate,
                @TertiaryStatus = claimDetails.TertiaryStatus,
                @TertiaryBilledDate = claimDetails.TertiaryBilledDate,
                @userID = 0


            }, commandType: CommandType.StoredProcedure);
            return true;
        }
    }
}
