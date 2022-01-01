using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IChargeDetailsRepository : IRepository<ChargeDetails>
    {
        public List<ChargeActivityDTO> ChargeActivityGet(int ChargeSID);
        public ChargeDetails ChargeDetailsGet(int ChargeSID);
        public List<ICD10> ICD10PopupGet(string filter,int skip);
        public List<Reading> ProviderGet(string filter);
        public List<Reading> ReferralStaffGet(string filter);
        public List<Reading> SupervisingStaffGet(string filter);
        public List<Modifier> ModifierGet();
        public List<CPTCode> CptCodesGet(string cptCode);
        public bool ChargeDetailsUpdate(ChargeDetails chargeDetails);
    }
}
