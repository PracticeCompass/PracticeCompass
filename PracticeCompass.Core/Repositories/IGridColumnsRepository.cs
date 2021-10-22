using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IGridColumnsRepository : IRepository<GridColumn>
    {
        GridColumn GetGridColumns(string Name);
        GridColumn SaveGridColumns(string Name,string Columns);
    }
}
