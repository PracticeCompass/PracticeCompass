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
    public class TrendRepository : ITrendRepository
    {
        private IDbConnection db;
        public TrendRepository(string connString)
           
        { this.db = new SqlConnection(connString); }

        
        public Task AddAsync(Trend entity)
        {
            throw new NotImplementedException();
        }

       
        public Task AddRangeAsync(IEnumerable<Trend> entities)
        {
            throw new NotImplementedException();
        }

       

        public Task<int> CountAsync(Expression<Func<Trend, bool>> predicate)
        {
            throw new NotImplementedException();
        }

       

        public Task<IEnumerable<Trend>> FindAsync(Expression<Func<Trend, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<Trend> FirstOrDefaultAsync(Expression<Func<Trend, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public void Remove(Trend entity)
        {
            throw new NotImplementedException();
        }


        public void RemoveRange(IEnumerable<Trend> entities)
        {
            throw new NotImplementedException();
        }


        public Task<Trend> SingleOrDefaultAsync(Expression<Func<Trend, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public List<Trend> TrendsGet(int UserId, string EntityName)
        {
            var data = this.db.QueryMultiple("uspTrendsGet", new { @EntityName = EntityName, @UserID= UserId }, commandType: CommandType.StoredProcedure);
            return data.Read<Trend>().ToList();
        }

        public List<Trend> TrendsSave(string EntityName, int UserID, string EntityValueID)
        {
            this.db.Execute("uspTrendsSave", new { @EntityName = EntityName, @UserID = UserID, @EntityValueID = EntityValueID,}, commandType: CommandType.StoredProcedure);
            var data = this.db.QueryMultiple("uspTrendsGet", new { @EntityName = EntityName, @UserID = UserID }, commandType: CommandType.StoredProcedure);
            return data.Read<Trend>().ToList();
        }

        Task<IEnumerable<Trend>> IRepository<Trend>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }
    }
}
