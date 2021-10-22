USE [medman]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__PlanClai__CE877834B8C06925]    Script Date: 08/01/2021 2:46:06 AM ******/
ALTER TABLE [dbo].[PlanClaim] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PlanClaim##ClaimOrder]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##ClaimOrder] ON [dbo].[PlanClaim]
(
	[ClaimSID] ASC,
	[CoverageOrder] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PlanClaim##ClaimSID]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##ClaimSID] ON [dbo].[PlanClaim]
(
	[ClaimSID] ASC,
	[PlanID] ASC,
	[PolicyNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PlanClaim##CoverageOrder#PlanID#PolicyNumber#ClaimSID#PlanICN]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##CoverageOrder#PlanID#PolicyNumber#ClaimSID#PlanICN] ON [dbo].[PlanClaim]
(
	[CoverageOrder] ASC
)
INCLUDE([PlanID],[PolicyNumber],[ClaimSID],[PlanICN]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PlanClaim##PlanBillDateCStatus]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PlanBillDateCStatus] ON [dbo].[PlanClaim]
(
	[PlanID] ASC,
	[BilledDate] ASC,
	[CurrentStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PlanClaim##PlanClaimOrder]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PlanClaimOrder] ON [dbo].[PlanClaim]
(
	[PlanID] ASC,
	[ClaimSID] ASC,
	[CoverageOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PlanClaim##PlanClaimPK]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PlanClaimPK] ON [dbo].[PlanClaim]
(
	[PlanID] ASC,
	[PolicyNumber] ASC,
	[ClaimSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PlanClaim##PlanClaimPolicy]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PlanClaimPolicy] ON [dbo].[PlanClaim]
(
	[PlanID] ASC,
	[ClaimSID] ASC,
	[PolicyNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PlanClaim##PolicyNumber]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PolicyNumber] ON [dbo].[PlanClaim]
(
	[PolicyNumber] ASC
)
INCLUDE([prrowid],[PlanID],[ClaimSID],[CurrentStatus],[SubmittalCount],[PracticeID],[PatientID],[AccountSID],[AccountNumber],[BilledDate],[FromDate],[TotalClaimAmount],[CoverageOrder],[PlanICN],[BillingProviderID],[BilledThruDate],[AilmentSID],[SubscriberID],[PerformingProviderID],[RefProviderID],[ReferralSID],[OtherSubscriberID],[ServiceCenterID],[SortField],[TimeStamp],[LastUser],[CreateStamp],[CreateUser],[SatisfiedDate],[PrevResponsible],[Pro2SrcPDB],[pro2created],[pro2modified],[ClaimFlagCode]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PlanClaim##PracPatBilled]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PracPatBilled] ON [dbo].[PlanClaim]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[BilledDate] ASC,
	[SatisfiedDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PlanClaim##PracPlanBilled]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PracPlanBilled] ON [dbo].[PlanClaim]
(
	[PracticeID] ASC,
	[PlanID] ASC,
	[BilledDate] ASC,
	[SatisfiedDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PlanClaim##PracPlanFromDate]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PracPlanFromDate] ON [dbo].[PlanClaim]
(
	[PracticeID] ASC,
	[PlanID] ASC,
	[FromDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PlanClaim##PracPlanShortList]    Script Date: 08/01/2021 2:46:06 AM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##PracPlanShortList] ON [dbo].[PlanClaim]
(
	[PracticeID] ASC,
	[PlanID] ASC,
	[SatisfiedDate] ASC,
	[PrevResponsible] ASC,
	[BilledDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


