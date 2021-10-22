using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IChargeDetailsRepository : IRepository<ChargeDetails>
    {
        public List<ChargeActivity> ChargeActivityGet(int ChargeSID);
        public ChargeDetails ChargeDetailsGet(int ChargeSID);
        public List<ICD10> ICD10PopupGet(string filter,int skip);
        public List<Modifier> ModifierGet();
        public List<CPTCode> CptCodesGet(string cptCode);
    }
}
