using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IFilterRepository : IRepository<Filters>
    {
        bool FilterDelete(int FilterId);
        List<Filters> FiltersGet(string Entity, string DisplayName);
        bool FilterInsert(string DisplayName,string Body,string Entity , int Order , int userid);
        bool FilterExist(string DisplayName, string Entity);
        bool FilterUpdate(int filterId, string DisplayName, string Body, string Entity, int Order, int userid);
    }
}
