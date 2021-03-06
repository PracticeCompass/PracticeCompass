USE [medman]
GO

/****** Object:  Index [Account##AccountPK]    Script Date: 08/01/2021 2:27:51 AM ******/
CREATE NONCLUSTERED INDEX [Account##AccountPK] ON [dbo].[Account]
(
	[AccountSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##AccountStatus]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##AccountStatus] ON [dbo].[Account]
(
	[AccountStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##AccountType]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##AccountType] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[NonPatientAccount] ASC,
	[AccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##ClassAccount]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##ClassAccount] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[AcctFinanceGroup] ASC,
	[AccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##DiscountAdjCode]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##DiscountAdjCode] ON [dbo].[Account]
(
	[DiscountAdjCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Account##Guarantor]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##Guarantor] ON [dbo].[Account]
(
	[GuarantorID] ASC,
	[PracticeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##GuarantorAccount]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##GuarantorAccount] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[GuarantorID] ASC,
	[AccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##PracClass]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##PracClass] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[Class] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##PracDNGuarName]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##PracDNGuarName] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[DNGuarLastName] ASC,
	[DNGuarFirstName] ASC,
	[DNGuarMiddleName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##PracIndustrial]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##PracIndustrial] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[IndustrialAccount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##PracStatusDNGuarName]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##PracStatusDNGuarName] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[RecordStatus] ASC,
	[DNGuarLastName] ASC,
	[DNGuarFirstName] ASC,
	[DNGuarMiddleName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##PracStatusDNSortNumber]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##PracStatusDNSortNumber] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[RecordStatus] ASC,
	[DNSortAccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##PracticeAccount]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##PracticeAccount] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[AccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##PracticeSortNumber]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##PracticeSortNumber] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[DNSortAccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##RecordStatus]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##RecordStatus] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[RecordStatus] ASC,
	[AccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Account##StatusAccount]    Script Date: 08/01/2021 2:27:52 AM ******/
CREATE NONCLUSTERED INDEX [Account##StatusAccount] ON [dbo].[Account]
(
	[PracticeID] ASC,
	[AccountStatus] ASC,
	[AccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Account__CE8778344A556578]    Script Date: 08/01/2021 2:27:52 AM ******/
ALTER TABLE [dbo].[Account] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


