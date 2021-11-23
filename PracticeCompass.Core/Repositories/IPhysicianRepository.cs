using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IPhysicianRepository : IRepository<Physician>
    {
        
        public List<Physician> PhysiciansGridGet(int ProviderID, string firstName, string lastName, string positionCode,string zip, int skip, string SortColumn, string SortDirection);
        public List<Position> PositionGet();
        public PhysicianDetails PhysicianDetailsGet(int providerId);

    }
}
