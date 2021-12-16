﻿using Dapper;
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
    public class LookupRepository : ILookupRepository
    {
        private IDbConnection db;
        public LookupRepository(string connString)

        { this.db = new SqlConnection(connString); }
        
        public LookupList LookupDetailsGet(int lookupId)
        {
            var data = this.db.QueryMultiple("uspPlanDetailsGet", new
            {
                @lookupId = lookupId,
            }, commandType: CommandType.StoredProcedure);
            return data.Read<LookupList>().FirstOrDefault();
        }
        public List<LookupType> LookupTypeGet(string search)
        {
            var data = this.db.QueryMultiple("uspLookupType", new
            {
                @search = search
            }, commandType: CommandType.StoredProcedure);
            return data.Read<LookupType>().ToList();
        }
        public List<LookupList> LookupCodeGet(string LookupType, string isActive, string lookupCode)
        {
            var data = this.db.QueryMultiple("uspLookupCodeGet", new
            {
                @LookupType = LookupType,
                @isActive = isActive,
                @lookupCode = lookupCode,
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<LookupList>().ToList();
        }
        Task IRepository<LookupList>.AddAsync(LookupList entity)
        {
            throw new NotImplementedException();
        }

        Task IRepository<LookupList>.AddRangeAsync(IEnumerable<LookupList> entities)
        {
            throw new NotImplementedException();
        }

        Task<int> IRepository<LookupList>.CountAsync(Expression<Func<LookupList, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<LookupList>> IRepository<LookupList>.FindAsync(Expression<Func<LookupList, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<LookupList> IRepository<LookupList>.FirstOrDefaultAsync(Expression<Func<LookupList, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<LookupList>> IRepository<LookupList>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }


        void IRepository<LookupList>.Remove(LookupList entity)
        {
            throw new NotImplementedException();
        }

        void IRepository<LookupList>.RemoveRange(IEnumerable<LookupList> entities)
        {
            throw new NotImplementedException();
        }

        Task<LookupList> IRepository<LookupList>.SingleOrDefaultAsync(Expression<Func<LookupList, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }
    }
}