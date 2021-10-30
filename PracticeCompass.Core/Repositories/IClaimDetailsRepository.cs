using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IClaimDetailsRepository : IRepository<ClaimDetails>
    {
        List<ClaimDetails> ClaimDetailsGet(int ClaimSID, int PracticeID);
        List<ClaimNote> ClaimNotesGet(int ClaimSID);
        List<ChargeDTO> ChargeGridGet(int ClaimSID);
        List<SubmissionHistory> ClaimSubmissionHistoryGet(int ClaimSID);

    }
}
