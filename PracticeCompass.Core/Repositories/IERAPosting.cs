﻿using System.Collections.Generic;
using PracticeCompass.Common.Models;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Models.ERS;

namespace PracticeCompass.Core.Repositories
{
    public interface IERAPosting : IRepository<ERSClaimAdjustment>
    {
        bool PostERA(string CheckTraceNbr);
    }
}
