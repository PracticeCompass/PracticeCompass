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
using PracticeCompass.Logger;

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
        public List<LookupType> UserLookupTypeGet(string search)
        {
            var data = this.db.QueryMultiple("uspUserLookupType", new
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
        public List<LookupList> UserLookupCodeGet(string LookupType, string isActive, string lookupCode)
        {
            var data = this.db.QueryMultiple("uspUserLookupCodeGet", new
            {
                @LookupType = LookupType,
                @isActive = isActive,
                @lookupCode = lookupCode,
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<LookupList>().ToList();
        }

        public bool AddUserLookupCode(LookupList lookup)
        {
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            string LookupCodeMAXRowID = GetMAXRowID("UserLookupCode", "0", "prrowid");
            string LookupOrderMAXRowID = GetMAXRowID("UserLookupCode", "0", "order");
            try
            {
                var data = this.db.QueryMultiple("uspUserLookupCodeSave", new
                {
                    @CreateStamp = timestamp,
                    @CreateUser = practiceCompassHelper.CurrentUser(),
                    @RecordStatus = lookup.RecordStatus,
                    @Description = lookup.description,
                    @LookupCode = lookup.LookupCode,
                    @LookupType = lookup.LookupType,
                    @order = Convert.ToInt32(LookupOrderMAXRowID),
                    @LastUser = practiceCompassHelper.CurrentUser(),
                    @pro2created = DateTime.Now,
                    @pro2modified = DateTime.Now,
                    @Pro2SrcPDB = "medman2",
                    @prrowid = LookupCodeMAXRowID,
                    @TimeStamp = timestamp,
                    @IsAdd = lookup.IsAdd,
                    @gridId = lookup.gridId

                },
                  commandType: CommandType.StoredProcedure);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }

        public bool AddLookupCode(LookupList lookup)
        {
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            string LookupCodeMAXRowID = GetMAXRowID("LookupCode", "0" , "prrowid");
            string LookupOrderMAXRowID = GetMAXRowID("LookupCode", "0","order");
            try
            {
                var data = this.db.QueryMultiple("uspLookupCodeSave", new
                {
                    @CreateStamp = timestamp,
                    @CreateUser = practiceCompassHelper.CurrentUser(),
                    @RecordStatus = lookup.RecordStatus,
                    @Description = lookup.description,
                    @LookupCode = lookup.LookupCode,
                    @LookupType = lookup.LookupType,
                    @order = Convert.ToInt32(LookupOrderMAXRowID),
                    @LastUser = practiceCompassHelper.CurrentUser(),
                    @pro2created = DateTime.Now,
                    @pro2modified = DateTime.Now,
                    @Pro2SrcPDB = "medman",
                    @prrowid = LookupCodeMAXRowID,
                    @TimeStamp = timestamp,
                    @IsAdd=lookup.IsAdd,
                    @gridId=lookup.gridId

                },
                  commandType: CommandType.StoredProcedure);
                return true;
            }catch(Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }

        public bool AddLookupType(LookupType lookup)
        {
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            string LookupCodeMAXRowID = GetMAXRowID("LookupType", "0", "prrowid");
            try
            {
                var data = this.db.QueryMultiple("uspLookupTypeSave", new
                {
                    @CreateStamp = timestamp,
                    @CreateUser = practiceCompassHelper.CurrentUser(),
                    @Length = lookup.Length,
                    @Description = lookup.description,
                    @DescriptionLabel=lookup.descriptionLabel,
                    @Class = lookup.Class,
                    @LookupType = lookup.lookupType,
                    @LastUser = practiceCompassHelper.CurrentUser(),
                    @pro2created = DateTime.Now,
                    @pro2modified = DateTime.Now,
                    @Pro2SrcPDB = "medman",
                    @prrowid = LookupCodeMAXRowID,
                    @TimeStamp = timestamp,

                },
                  commandType: CommandType.StoredProcedure);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }



        public bool AddUserLookupType(LookupType lookup)
        {
            var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
            var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
            string LookupCodeMAXRowID = GetMAXRowID("UserLookupType", "0", "prrowid");
            try
            {
                var data = this.db.QueryMultiple("uspUserLookupTypeSave", new
                {
                    @CreateStamp = timestamp,
                    @CreateUser = practiceCompassHelper.CurrentUser(),
                    @Length = lookup.Length,
                    @Description = lookup.description,
                    @DescriptionLabel = lookup.descriptionLabel,
                    @LookupType = lookup.lookupType,
                    @LastUser = practiceCompassHelper.CurrentUser(),
                    @pro2created = DateTime.Now,
                    @pro2modified = DateTime.Now,
                    @Pro2SrcPDB = "medman",
                    @prrowid = LookupCodeMAXRowID,
                    @TimeStamp = timestamp,

                },
                  commandType: CommandType.StoredProcedure);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(ex.Message, "PracticeCompass", TechnoMedicLogFiles.API.ToString());
                return false;
            }
        }

        private string GetMAXRowID(string tableName, string lastprrowid,string columnName)
        {
            try
            {


                long intFromHex;
                if (lastprrowid != "0")
                {
                    intFromHex = Convert.ToInt64(lastprrowid, 16) + 1;
                }
                else
                {
                    string sql = string.Format("SELECT MAX(CONVERT(INT, CONVERT(VARBINARY, ["+columnName+"] ,1))) from [{0}]", tableName);
                    var prrowid = db.ExecuteScalar(sql);
                    intFromHex = 1;
                    if (prrowid != null)
                        intFromHex = (int)prrowid + 1;
                }
                if (columnName == "order")
                {
                    return intFromHex.ToString();
                }
                else {
                    string hexValue = intFromHex.ToString("x16");
                    return string.Format("0x{0:X}", hexValue);
                }
            }
            catch (Exception e)
            {
                return "";
            }
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
