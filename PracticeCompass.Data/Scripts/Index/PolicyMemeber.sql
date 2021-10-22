USE [medman]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__PolicyMe__CE8778346832218B]    Script Date: 08/01/2021 2:48:04 AM ******/
ALTER TABLE [dbo].[PolicyMember] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##BackImageFileID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##BackImageFileID] ON [dbo].[PolicyMember]
(
	[BackImageFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PolicyMember##BackImageSID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##BackImageSID] ON [dbo].[PolicyMember]
(
	[BackImageSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##ClaimMemberID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##ClaimMemberID] ON [dbo].[PolicyMember]
(
	[ClaimMemberID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PolicyMember##CoverageOrder]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##CoverageOrder] ON [dbo].[PolicyMember]
(
	[CoverageOrder] ASC
)
INCLUDE([prrowid],[PlanID],[PolicyNumber],[PersonID],[RelationToSub],[DeductibleSource],[DeductibleRemaining],[DeductibleTimestamp],[MemberNumber],[RecordStatus],[TimeStamp],[LastUser],[CreateStamp],[CreateUser],[InsuranceType],[RxBenefit],[ClaimMemberID],[EDIMemberID],[Note],[FrontImageSID],[BackImageSID],[CopayClass],[ClaimMemberID2],[HL7Updated],[FrontImageFileID],[BackImageFileID],[FrontImageScanStamp],[BackImageScanStamp],[FrontImageScanUserID],[BackImageScanUserID],[Pro2SrcPDB],[pro2created],[pro2modified]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PolicyMember##CoverageOrder#PolicyNumber#PersonID#EDIMemberID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##CoverageOrder#PolicyNumber#PersonID#EDIMemberID] ON [dbo].[PolicyMember]
(
	[CoverageOrder] ASC
)
INCLUDE([PolicyNumber],[PersonID],[EDIMemberID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##CoverageOrderRecordStatus]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##CoverageOrderRecordStatus] ON [dbo].[PolicyMember]
(
	[CoverageOrder] ASC,
	[RecordStatus] ASC
)
INCLUDE([PersonID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##FrontImageFileID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##FrontImageFileID] ON [dbo].[PolicyMember]
(
	[FrontImageFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PolicyMember##FrontImageSID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##FrontImageSID] ON [dbo].[PolicyMember]
(
	[FrontImageSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PolicyMember##MemberCoverage]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##MemberCoverage] ON [dbo].[PolicyMember]
(
	[PersonID] ASC,
	[CoverageOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##PatientPolicyPK]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##PatientPolicyPK] ON [dbo].[PolicyMember]
(
	[PlanID] ASC,
	[PolicyNumber] ASC,
	[PersonID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PolicyMember##PersonID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##PersonID] ON [dbo].[PolicyMember]
(
	[PersonID] ASC,
	[CoverageOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PolicyMember##PlanID#CoverageOrder#PersonID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##PlanID#CoverageOrder#PersonID] ON [dbo].[PolicyMember]
(
	[PlanID] ASC,
	[CoverageOrder] ASC
)
INCLUDE([PersonID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##PlanPersonStatus]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##PlanPersonStatus] ON [dbo].[PolicyMember]
(
	[PlanID] ASC,
	[PersonID] ASC,
	[RecordStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##PolicyNumber#CoverageOrder#PersonID#EDIMemberID]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##PolicyNumber#CoverageOrder#PersonID#EDIMemberID] ON [dbo].[PolicyMember]
(
	[PolicyNumber] ASC,
	[CoverageOrder] ASC
)
INCLUDE([PersonID],[EDIMemberID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PolicyMember##RecordStatus]    Script Date: 08/01/2021 2:48:04 AM ******/
CREATE NONCLUSTERED INDEX [PolicyMember##RecordStatus] ON [dbo].[PolicyMember]
(
	[PersonID] ASC,
	[RecordStatus] ASC,
	[CoverageOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


