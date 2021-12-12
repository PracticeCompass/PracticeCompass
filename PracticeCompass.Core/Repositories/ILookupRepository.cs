using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface ILookupRepository : IRepository<LookupList>
    {
        public LookupList LookupDetailsGet(int lookupId);
        public List<LookupType> LookupTypeGet(string search);
        public List<LookupList> LookupCodeGet(string LookupType, string isActive, string lookupCode);

    }
}
