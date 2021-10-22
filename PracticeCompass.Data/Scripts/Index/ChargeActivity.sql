USE [medman]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##AccountActivity]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##AccountActivity] ON [dbo].[ChargeActivity]
(
	[AccountSID] ASC,
	[ActivityType] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ChargeActivity##AccountPost]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##AccountPost] ON [dbo].[ChargeActivity]
(
	[AccountSID] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##AccountStatement]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##AccountStatement] ON [dbo].[ChargeActivity]
(
	[AccountSID] ASC,
	[PatientStatement] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##ActivityCount]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##ActivityCount] ON [dbo].[ChargeActivity]
(
	[ChargeSID] ASC,
	[ActivityType] ASC,
	[ActivityCount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##ActivityType#PostDate]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##ActivityType#PostDate] ON [dbo].[ChargeActivity]
(
	[ActivityType] ASC,
	[PostDate] ASC
)
INCLUDE([ChargeSID],[Amount]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##ActivityType#SourceType#PostDate]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##ActivityType#SourceType#PostDate] ON [dbo].[ChargeActivity]
(
	[ActivityType] ASC,
	[SourceType] ASC,
	[PostDate] ASC
)
INCLUDE([prrowid],[ChargeSID],[ActivityCount],[SourceID],[JournalSID],[Amount],[TimeStamp],[LastUser],[CreateStamp],[CreateUser],[AccountSID],[PatientStatement],[DisplayText],[CreateMethod],[DNPracticeID],[Pro2SrcPDB],[pro2created],[pro2modified]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##ActivityTypePostDate]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##ActivityTypePostDate] ON [dbo].[ChargeActivity]
(
	[DNPracticeID] ASC,
	[ActivityType] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ChargeActivity##ChargeActivityPK]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##ChargeActivityPK] ON [dbo].[ChargeActivity]
(
	[ChargeSID] ASC,
	[ActivityCount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ChargeActivity##ChargePostCount]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##ChargePostCount] ON [dbo].[ChargeActivity]
(
	[ChargeSID] ASC,
	[PostDate] ASC,
	[ActivityCount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##ChargeSID]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##ChargeSID] ON [dbo].[ChargeActivity]
(
	[ChargeSID] ASC,
	[ActivityType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##CreateStamp]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##CreateStamp] ON [dbo].[ChargeActivity]
(
	[CreateStamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##Journal]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##Journal] ON [dbo].[ChargeActivity]
(
	[DNPracticeID] ASC,
	[PostDate] DESC,
	[JournalSID] ASC,
	[CreateStamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ChargeActivity##JournalPostDateType]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##JournalPostDateType] ON [dbo].[ChargeActivity]
(
	[JournalSID] ASC,
	[PostDate] ASC,
	[ActivityType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ChargeActivity##PostDate]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [ChargeActivity##PostDate] ON [dbo].[ChargeActivity]
(
	[PostDate] ASC
)
INCLUDE([ChargeSID],[ActivityCount],[ActivityType],[SourceType],[SourceID],[Amount]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [NonClusteredIndex-20191121-131721]    Script Date: 08/01/2021 2:33:07 AM ******/
CREATE NONCLUSTERED INDEX [NonClusteredIndex-20191121-131721] ON [dbo].[ChargeActivity]
(
	[CreateStamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__ChargeAc__CE877834BC191A76]    Script Date: 08/01/2021 2:33:07 AM ******/
ALTER TABLE [dbo].[ChargeActivity] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


