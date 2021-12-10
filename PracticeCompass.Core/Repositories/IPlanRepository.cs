using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IPlanRepository : IRepository<PlanList>
    {

        public List<PlanList> PlansGridGet(int planID, string Zip, int skip, string SortColumn, string SortDirection,string PlanGroup);
        public PlanDetails PlanDetailsGet(int providerId, string groupNumber);
        public List<PlanGroup> PlanGroupGet(string search);

    }
}
