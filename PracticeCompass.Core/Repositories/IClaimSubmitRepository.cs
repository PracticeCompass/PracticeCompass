﻿using System.Collections.Generic;
using PracticeCompass.Core.Common;
using PracticeCompass.Common.Models;

namespace PracticeCompass.Core.Repositories
{
    public interface IClaimSubmitRepository : IRepository<ClaimMessageModel>
    {
        public ClaimMessageModel ClaimMessageModelGet(int ClaimSID);
    }
}
