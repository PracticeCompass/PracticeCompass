USE [medman]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Staff__CE877834E7DDD88A]    Script Date: 08/01/2021 2:51:44 AM ******/
ALTER TABLE [dbo].[Staff] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Staff##BillingLocationID]    Script Date: 08/01/2021 2:51:44 AM ******/
CREATE NONCLUSTERED INDEX [Staff##BillingLocationID] ON [dbo].[Staff]
(
	[BillingLocationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Staff##Class]    Script Date: 08/01/2021 2:51:44 AM ******/
CREATE NONCLUSTERED INDEX [Staff##Class] ON [dbo].[Staff]
(
	[Class] ASC,
	[StaffCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Staff##PracPositionCode]    Script Date: 08/01/2021 2:51:44 AM ******/
CREATE NONCLUSTERED INDEX [Staff##PracPositionCode] ON [dbo].[Staff]
(
	[PracticeID] ASC,
	[PositionCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Staff##PracticeUser]    Script Date: 08/01/2021 2:51:44 AM ******/
CREATE NONCLUSTERED INDEX [Staff##PracticeUser] ON [dbo].[Staff]
(
	[PracticeID] ASC,
	[MMUserSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Staff##ProviderType]    Script Date: 08/01/2021 2:51:44 AM ******/
CREATE NONCLUSTERED INDEX [Staff##ProviderType] ON [dbo].[Staff]
(
	[PracticeID] ASC,
	[ProviderType] ASC,
	[StaffCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Staff##RecordStatus]    Script Date: 08/01/2021 2:51:45 AM ******/
CREATE NONCLUSTERED INDEX [Staff##RecordStatus] ON [dbo].[Staff]
(
	[PracticeID] ASC,
	[RecordStatus] ASC,
	[StaffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Staff##SpecialtyCode]    Script Date: 08/01/2021 2:51:45 AM ******/
CREATE NONCLUSTERED INDEX [Staff##SpecialtyCode] ON [dbo].[Staff]
(
	[DefaultSpecialtyCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Staff##StaffCode]    Script Date: 08/01/2021 2:51:45 AM ******/
CREATE NONCLUSTERED INDEX [Staff##StaffCode] ON [dbo].[Staff]
(
	[PracticeID] ASC,
	[StaffCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Staff##StaffID]    Script Date: 08/01/2021 2:51:45 AM ******/
CREATE NONCLUSTERED INDEX [Staff##StaffID] ON [dbo].[Staff]
(
	[StaffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Staff##StaffPK]    Script Date: 08/01/2021 2:51:45 AM ******/
CREATE NONCLUSTERED INDEX [Staff##StaffPK] ON [dbo].[Staff]
(
	[PracticeID] ASC,
	[StaffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


