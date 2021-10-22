USE [medman]
GO

/****** Object:  Index [AccountBillItem##AccountBillItemPK]    Script Date: 08/01/2021 2:29:35 AM ******/
CREATE NONCLUSTERED INDEX [AccountBillItem##AccountBillItemPK] ON [dbo].[AccountBillItem]
(
	[AccountSID] ASC,
	[ActivityType] ASC,
	[ActivitySID] ASC,
	[ActivityCount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [AccountBillItem##AccountPatientBillItem]    Script Date: 08/01/2021 2:29:35 AM ******/
CREATE NONCLUSTERED INDEX [AccountBillItem##AccountPatientBillItem] ON [dbo].[AccountBillItem]
(
	[AccountSID] ASC,
	[PatientID] ASC,
	[ActivityType] ASC,
	[ActivitySID] ASC,
	[ActivityCount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__AccountB__CE877834821F415D]    Script Date: 08/01/2021 2:29:35 AM ******/
ALTER TABLE [dbo].[AccountBillItem] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


