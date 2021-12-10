using System;
using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IFileManagerRepository : IRepository<ERAFileManager>
    {
        public List<ERAFileManager> filesGet(string fileName, string Notes, bool? isprocessed, DateTime? fileDate);
        public bool ProcessFile(string fileName, bool isprocessed);
        public bool AddFileNotes(string fileName, string notes);
        public string GetFileContent(string path);
    }
}
