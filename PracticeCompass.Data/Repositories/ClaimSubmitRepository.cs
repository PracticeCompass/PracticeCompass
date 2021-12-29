using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Common;
using PracticeCompass.Common.Models;
using PracticeCompass.Core.Repositories;

namespace PracticeCompass.Data.Repositories
{
    public class ClaimSubmitRepository : IClaimSubmitRepository
    {
        private IDbConnection db;
        public ClaimSubmitRepository(string connString)

        { this.db = new SqlConnection(connString); }


        public Task AddAsync(ClaimMessageModel entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<ClaimMessageModel> entities)
        {
            throw new NotImplementedException();
        }

        public List<ClaimMessageModel> ClaimMessageModelGet(string ClaimSID)
        {
            var data = this.db.QueryMultiple("uspClaimMessageGet", new { @ClaimSID = ClaimSID }, commandType: CommandType.StoredProcedure);
            return data.Read<ClaimMessageModel>().ToList();
        }

        public Task<int> CountAsync(Expression<Func<ClaimMessageModel, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ClaimMessageModel>> FindAsync(Expression<Func<ClaimMessageModel, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<ClaimMessageModel> FirstOrDefaultAsync(Expression<Func<ClaimMessageModel, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ClaimMessageModel>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public void Remove(ClaimMessageModel entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<ClaimMessageModel> entities)
        {
            throw new NotImplementedException();
        }

        public Task<ClaimMessageModel> SingleOrDefaultAsync(Expression<Func<ClaimMessageModel, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
