USE [medman]
GO

/****** Object:  Index [AccountBill##AccountBillPK]    Script Date: 08/01/2021 2:28:45 AM ******/
CREATE NONCLUSTERED INDEX [AccountBill##AccountBillPK] ON [dbo].[AccountBill]
(
	[AccountSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [AccountBill##Report]    Script Date: 08/01/2021 2:28:46 AM ******/
CREATE NONCLUSTERED INDEX [AccountBill##Report] ON [dbo].[AccountBill]
(
	[ReportSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__AccountB__CE87783427405C36]    Script Date: 08/01/2021 2:28:46 AM ******/
ALTER TABLE [dbo].[AccountBill] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


