USE [medman]
GO

/****** Object:  Index [PatientAccount##AccountPatient]    Script Date: 08/01/2021 2:42:41 AM ******/
CREATE NONCLUSTERED INDEX [PatientAccount##AccountPatient] ON [dbo].[PatientAccount]
(
	[AccountSID] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PatientAccount##PatientAccountPK]    Script Date: 08/01/2021 2:42:42 AM ******/
CREATE NONCLUSTERED INDEX [PatientAccount##PatientAccountPK] ON [dbo].[PatientAccount]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[AccountSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PatientAccount##RecordStatus]    Script Date: 08/01/2021 2:42:42 AM ******/
CREATE NONCLUSTERED INDEX [PatientAccount##RecordStatus] ON [dbo].[PatientAccount]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[RecordStatus] ASC,
	[AccountSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__PatientA__CE8778345AA2F428]    Script Date: 08/01/2021 2:42:42 AM ******/
ALTER TABLE [dbo].[PatientAccount] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


