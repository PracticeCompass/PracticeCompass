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
    public class FilterRepository : IFilterRepository
    {
        private IDbConnection db;
        public FilterRepository(string connString)
           
        { this.db = new SqlConnection(connString); }

        public Task AddAsync(Filters entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<Filters> entities)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<Filters, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Filters>> FindAsync(Expression<Func<Filters, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<Filters> FirstOrDefaultAsync(Expression<Func<Filters, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Filters>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public bool FilterDelete(int FilterId)
        {
            try
            {
                this.db.Execute("uspFilterDelete", new { @filterID = FilterId }, commandType: CommandType.StoredProcedure);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool FilterExist(string DisplayName ,string Entity)
        {
            try
            {
               var data= this.db.Query("uspFiltersCheck", new { @DisplayName = DisplayName, @Entity = Entity}, commandType: CommandType.StoredProcedure);
              
                return data.ToList().Count()>0;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool FilterInsert(string DisplayName, string Body, string Entity, int Order, int userid)
        {
            try
            {
                this.db.Execute("uspFilterInsert", new { @DisplayName = DisplayName, @Body=Body, @Entity=Entity, @Order=Order, @userid=userid }, commandType: CommandType.StoredProcedure);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool FilterUpdate(int filterId,string DisplayName, string Body, string Entity, int Order, int userid)
        {
            try
            {
                this.db.Execute("uspFilterUpdate", new { @filterID=filterId, @DisplayName = DisplayName, @Body = Body, @Entity = Entity, @Order = Order, @userid = userid }, commandType: CommandType.StoredProcedure);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<Filters> FiltersGet(string Entity, string DisplayName)
        {
            var data = this.db.QueryMultiple("uspFiltersGet", new { @Entity = Entity , @DisplayName = DisplayName }, commandType: CommandType.StoredProcedure);
            return data.Read<Filters>().ToList();
        }

        public void Remove(Filters entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Filters> entities)
        {
            throw new NotImplementedException();
        }

        public Task<Filters> SingleOrDefaultAsync(Expression<Func<Filters, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
