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

namespace PracticeCompass.Data.Repositories
{
    public class InsuranceRecordRepository : IInsuranceRecordRepository
    {
        private IDbConnection db;
        public InsuranceRecordRepository(string connString)

        { this.db = new SqlConnection(connString); }



        public Task AddAsync(InsuranceRecord entity)
        {
            throw new NotImplementedException();
        }



        public Task AddRangeAsync(IEnumerable<InsuranceRecord> entities)
        {
            throw new NotImplementedException();
        }



        public Task<int> CountAsync(Expression<Func<InsuranceRecord, bool>> predicate)
        {
            throw new NotImplementedException();
        }



        public Task<IEnumerable<InsuranceRecord>> FindAsync(Expression<Func<InsuranceRecord, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }



        public Task<InsuranceRecord> FirstOrDefaultAsync(Expression<Func<InsuranceRecord, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<InsuranceRecord>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public InsuranceRecord GetInsuranceRecord(int PlanId)
        {
            try
            {
                var data = this.db.QueryMultiple("uspInsuranceRecordGet", new { @PlanID = PlanId }, commandType: CommandType.StoredProcedure);
                return data.Read<InsuranceRecord>().FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }
        public void Remove(InsuranceRecord entity)
        {
            throw new NotImplementedException();
        }



        public void RemoveRange(IEnumerable<InsuranceRecord> entities)
        {
            throw new NotImplementedException();
        }



        public Task<InsuranceRecord> SingleOrDefaultAsync(Expression<Func<InsuranceRecord, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
