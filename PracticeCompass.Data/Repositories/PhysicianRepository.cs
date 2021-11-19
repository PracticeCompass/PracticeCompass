using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;
using PracticeCompass.Core.Common;

namespace PracticeCompass.Data.Repositories
{
    public class PhysicianRepository : IPhysicianRepository
    {
        private IDbConnection db;
        public PhysicianRepository(string connString)

        { this.db = new SqlConnection(connString); }

        public List<Physician> PhysiciansGridGet(int ProviderID, string firstName, string lastName,int Zip, int skip, string SortColumn, string SortDirection)
        {
            var data = this.db.QueryMultiple("uspPhysicianGridGet", new
            {
                @ProviderID = ProviderID,
                @firstName = firstName,
                @lastName = lastName,
                @Zip= Zip,
                @Skip = skip,
                @SortColumn = SortColumn,
                @SortDirection = SortDirection
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<Physician>().ToList();
        }

        Task IRepository<Physician>.AddAsync(Physician entity)
        {
            throw new NotImplementedException();
        }

        Task IRepository<Physician>.AddRangeAsync(IEnumerable<Physician> entities)
        {
            throw new NotImplementedException();
        }

        Task<int> IRepository<Physician>.CountAsync(Expression<Func<Physician, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<Physician>> IRepository<Physician>.FindAsync(Expression<Func<Physician, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<Physician> IRepository<Physician>.FirstOrDefaultAsync(Expression<Func<Physician, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<Physician>> IRepository<Physician>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }


        void IRepository<Physician>.Remove(Physician entity)
        {
            throw new NotImplementedException();
        }

        void IRepository<Physician>.RemoveRange(IEnumerable<Physician> entities)
        {
            throw new NotImplementedException();
        }

        Task<Physician> IRepository<Physician>.SingleOrDefaultAsync(Expression<Func<Physician, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }
    }
}
