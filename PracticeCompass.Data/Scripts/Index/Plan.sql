USE [medman]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Plan__CE87783425EF843F]    Script Date: 08/01/2021 2:45:03 AM ******/
ALTER TABLE [dbo].[Plan] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##CarrierCode]    Script Date: 08/01/2021 2:45:03 AM ******/
CREATE NONCLUSTERED INDEX [Plan##CarrierCode] ON [dbo].[Plan]
(
	[CarrierCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##CarrierCodeName]    Script Date: 08/01/2021 2:45:03 AM ******/
CREATE NONCLUSTERED INDEX [Plan##CarrierCodeName] ON [dbo].[Plan]
(
	[RecordStatus] ASC,
	[CarrierCode] ASC,
	[SortName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##CarrierCodePlanCode]    Script Date: 08/01/2021 2:45:03 AM ******/
CREATE NONCLUSTERED INDEX [Plan##CarrierCodePlanCode] ON [dbo].[Plan]
(
	[RecordStatus] ASC,
	[CarrierCode] ASC,
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##CarrierPlan]    Script Date: 08/01/2021 2:45:03 AM ******/
CREATE NONCLUSTERED INDEX [Plan##CarrierPlan] ON [dbo].[Plan]
(
	[CarrierCode] ASC,
	[PlanID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##CarrierZipPlanCode]    Script Date: 08/01/2021 2:45:03 AM ******/
CREATE NONCLUSTERED INDEX [Plan##CarrierZipPlanCode] ON [dbo].[Plan]
(
	[RecordStatus] ASC,
	[CarrierCode] ASC,
	[DNZip] ASC,
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Plan##DenialMsgCodeProfileID]    Script Date: 08/01/2021 2:45:03 AM ******/
CREATE NONCLUSTERED INDEX [Plan##DenialMsgCodeProfileID] ON [dbo].[Plan]
(
	[DenialMsgCodeProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##FilingCode]    Script Date: 08/01/2021 2:45:03 AM ******/
CREATE NONCLUSTERED INDEX [Plan##FilingCode] ON [dbo].[Plan]
(
	[FilingCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Plan##ImportPlanID]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##ImportPlanID] ON [dbo].[Plan]
(
	[ImportPlanID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##Name]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##Name] ON [dbo].[Plan]
(
	[SortName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##NameWord]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##NameWord] ON [dbo].[Plan]
(
	[SortName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Plan##PayerID]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##PayerID] ON [dbo].[Plan]
(
	[PayerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##PlanClass]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##PlanClass] ON [dbo].[Plan]
(
	[Class] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##PlanCode]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##PlanCode] ON [dbo].[Plan]
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Plan##PlanPK]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##PlanPK] ON [dbo].[Plan]
(
	[PlanID] ASC
)
INCLUDE([CarrierCode],[Class]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##ProfileOverrideAllowed]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##ProfileOverrideAllowed] ON [dbo].[Plan]
(
	[ProfileOverrideAllowed] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##RecordStatus]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##RecordStatus] ON [dbo].[Plan]
(
	[RecordStatus] ASC,
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##RecordStatusName]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##RecordStatusName] ON [dbo].[Plan]
(
	[RecordStatus] ASC,
	[SortName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Plan##ZipPlanCode]    Script Date: 08/01/2021 2:45:04 AM ******/
CREATE NONCLUSTERED INDEX [Plan##ZipPlanCode] ON [dbo].[Plan]
(
	[RecordStatus] ASC,
	[DNZip] ASC,
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


