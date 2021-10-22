using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface ITrendRepository : IRepository<Trend>
    {
        public List<Trend> TrendsGet(int UserId, string EntityName);
        public List<Trend> TrendsSave(string EntityName, int UserID, string EntityValueID);
    }
}
