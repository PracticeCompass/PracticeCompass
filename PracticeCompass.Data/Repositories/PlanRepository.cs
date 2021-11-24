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
    public class PlanRepository : IPlanRepository
    {
        private IDbConnection db;
        public PlanRepository(string connString)

        { this.db = new SqlConnection(connString); }

        public PlanDetails PlanDetailsGet(int providerId)
        {
            var data = this.db.QueryMultiple("uspPlanDetailsGet", new
            {
                @ProviderID = providerId,
            }, commandType: CommandType.StoredProcedure);
            return data.Read<PlanDetails>().FirstOrDefault();
        }

        public List<PlanList> PlansGridGet(int planID,  string Zip, int skip, string SortColumn, string SortDirection)
        {
            var data = this.db.QueryMultiple("uspPlanGridGet", new
            {
                @PlanID = planID,
                @Zip= Zip,
                @Skip = skip,
                @SortColumn = SortColumn,
                @SortDirection = SortDirection
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<PlanList>().ToList();
        }
        Task IRepository<PlanList>.AddAsync(PlanList entity)
        {
            throw new NotImplementedException();
        }

        Task IRepository<PlanList>.AddRangeAsync(IEnumerable<PlanList> entities)
        {
            throw new NotImplementedException();
        }

        Task<int> IRepository<PlanList>.CountAsync(Expression<Func<PlanList, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<PlanList>> IRepository<PlanList>.FindAsync(Expression<Func<PlanList, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<PlanList> IRepository<PlanList>.FirstOrDefaultAsync(Expression<Func<PlanList, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<PlanList>> IRepository<PlanList>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }


        void IRepository<PlanList>.Remove(PlanList entity)
        {
            throw new NotImplementedException();
        }

        void IRepository<PlanList>.RemoveRange(IEnumerable<PlanList> entities)
        {
            throw new NotImplementedException();
        }

        Task<PlanList> IRepository<PlanList>.SingleOrDefaultAsync(Expression<Func<PlanList, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }
    }
}
