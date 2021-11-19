using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IPhysicianRepository : IRepository<Physician>
    {
        public List<Physician> PhysiciansGridGet(int ProviderID, string firstName, string lastName,int zip, int skip, string SortColumn, string SortDirection);
    }
}
