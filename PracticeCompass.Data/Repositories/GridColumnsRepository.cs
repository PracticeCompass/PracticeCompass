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
    public class GridColumnsRepository : IGridColumnsRepository
    {
        private IDbConnection db;
        public GridColumnsRepository(string connString)
           
        { this.db = new SqlConnection(connString); }

        public Task AddAsync(GridColumn entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<GridColumn> entities)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<GridColumn, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<GridColumn>> FindAsync(Expression<Func<GridColumn, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<GridColumn> FirstOrDefaultAsync(Expression<Func<GridColumn, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<GridColumn>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public GridColumn SaveGridColumns(string Name,string Columns)
        {
            try
            {
                var data =  this.db.QueryMultiple("uspGridColumnsSave", new { @Name=Name, @Columns= Columns }, commandType: CommandType.StoredProcedure);
                return data.Read<GridColumn>().FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }
        public GridColumn GetGridColumns(string Name)
        {
            var data = this.db.QueryMultiple("uspGetGridColumns", new { @Name = Name }, commandType: CommandType.StoredProcedure);
            return data.Read<GridColumn>().FirstOrDefault();
        }

        public void Remove(GridColumn entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<GridColumn> entities)
        {
            throw new NotImplementedException();
        }

        public Task<GridColumn> SingleOrDefaultAsync(Expression<Func<GridColumn, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
