using PracticeCompass.Core.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PracticeCompass.Data.Common
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext Context;

        public Repository(DbContext context)
        {
            this.Context = context;
        }
        public async Task AddAsync(TEntity entity)
        {
            await Context.Set<TEntity>().AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await Context.Set<TEntity>().AddRangeAsync(entities);
        }

        public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate, bool trackChanges = false)
        {
            IQueryable<TEntity> q = Context.Set<TEntity>();
            if (!trackChanges) q = q.AsNoTracking();
            if (predicate != null) q = q.Where(predicate);
            return await q.ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(bool trackChanges = false)
        {
            IQueryable<TEntity> q = Context.Set<TEntity>();
            if (!trackChanges) q = q.AsNoTracking();
            return await q.ToListAsync();
        }

        public void Remove(TEntity entity)
        {
            Context.Set<TEntity>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().RemoveRange(entities);
        }

        public Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, bool trackChanges = false)
        {
            IQueryable<TEntity> q = Context.Set<TEntity>();
            if (!trackChanges) q = q.AsNoTracking();
            if (predicate != null) q = q.Where(predicate);
            return q.SingleOrDefaultAsync();
        }

        public Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, bool trackChanges = false)
        {
            IQueryable<TEntity> q = Context.Set<TEntity>();
            if (!trackChanges) q = q.AsNoTracking();

            if (predicate != null) q = q.Where(predicate);
            return q.FirstOrDefaultAsync();
        }

        public async Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate)
        {
            try
            {
                IQueryable<TEntity> q = Context.Set<TEntity>();

                if (predicate != null) q = q.Where(predicate);
                return await q.CountAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return 0;
            }
        }
    }
}
