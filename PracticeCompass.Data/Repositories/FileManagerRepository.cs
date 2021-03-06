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
using System.IO;

namespace PracticeCompass.Data.Repositories
{
    public class FileManagerRepository : IFileManagerRepository
    {
        private IDbConnection db;
        public FileManagerRepository(string connString)
           
        { this.db = new SqlConnection(connString); }

        
        public Task AddAsync(ERAFileManager entity)
        {
            throw new NotImplementedException();
        }

       
        public Task AddRangeAsync(IEnumerable<ERAFileManager> entities)
        {
            throw new NotImplementedException();
        }

       

        public Task<int> CountAsync(Expression<Func<ERAFileManager, bool>> predicate)
        {
            throw new NotImplementedException();
        }

       

        public Task<IEnumerable<ERAFileManager>> FindAsync(Expression<Func<ERAFileManager, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<ERAFileManager> FirstOrDefaultAsync(Expression<Func<ERAFileManager, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public void Remove(ERAFileManager entity)
        {
            throw new NotImplementedException();
        }


        public void RemoveRange(IEnumerable<ERAFileManager> entities)
        {
            throw new NotImplementedException();
        }


        public List<ERAFileManager> filesGet(string fileName, string Notes, bool? isprocessed, DateTime? fileDate)
        {
            var data = this.db.QueryMultiple("uspFilesGet", new { @Notes = Notes, @isprocessed = isprocessed,
                @fileName= fileName, @fileDate= fileDate }, commandType: CommandType.StoredProcedure);
            return data.Read<ERAFileManager>().ToList();
        }
        public string GetFileContent(string path)
        {
            return @File.ReadAllText(path);
        }
        public bool ProcessFile(string fileName, bool isprocessed)
        {
            var proced = isprocessed == true ? 1 : 0;
            var sql =
               "update ERAFileManager set IsProcessed ="+ proced + " where FileName='"+ fileName + "'";
            this.db.Execute(sql);
            return true;
        }
        public bool AddFileNotes(string fileName, string notes)
        {
            var sql =
             "update ERAFileManager set Notes ='" + notes + "' where FileName='" + fileName+"'";
            this.db.Execute(sql);
            return true;
        }
        public bool AddFiles()
        {
            var practiceCompassHelper = new Data.Utilities.PracticeCompassHelper(this.db);
            string[] reports =
            Directory.GetFiles(@"C:\PracticeCompas\Inbound\Reports", "*", SearchOption.AllDirectories);
            if (!Directory.Exists(@"C:\PracticeCompas\Inbound\ParsedReports"))
            {
                Directory.CreateDirectory(@"C:\PracticeCompas\Inbound\ParsedReports");
            }
            var ERAfiles = new List<ERAFileManager>();
            var fileId = 0;
            for (var r = 0; r < reports.Length; r++)
            {
                var reportname = Path.GetFileName(reports[r]);
                var filedate=File.GetLastWriteTime(reports[r]);
                var newreportpath = Path.Combine(@"C:\PracticeCompas\Inbound\ParsedReports", reportname);
                File.Move(reports[r], newreportpath);
                var maxfileId = 0;
                if (r != 0) maxfileId = fileId;
                fileId=practiceCompassHelper.GetMAXColumnid("ERAFileManager", "FileID", maxfileId);
                ERAfiles.Add(new ERAFileManager
                {
                    FileID = fileId,
                    FileDate= filedate,
                    FileName= reportname,
                    IsProcessed=false,
                    Notes="",
                    Path= newreportpath
                });

            }
            var sql = "INSERT INTO [dbo].[ERAFileManager]VALUES (@FileName,@Path,@FileDate,@IsProcessed,@Notes)";
            var ERAFileMngr = this.db.Execute(sql, ERAfiles);
            return true;
        }
        Task<IEnumerable<ERAFileManager>> IRepository<ERAFileManager>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }

        public Task<ERAFileManager> SingleOrDefaultAsync(Expression<Func<ERAFileManager, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
