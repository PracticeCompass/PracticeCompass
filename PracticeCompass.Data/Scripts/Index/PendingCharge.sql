USE [medman]
GO

/****** Object:  Index [PendingCharge##AilmentSID]    Script Date: 08/01/2021 2:43:27 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##AilmentSID] ON [dbo].[PendingCharge]
(
	[AilmentSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##ChargeSID]    Script Date: 08/01/2021 2:43:27 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##ChargeSID] ON [dbo].[PendingCharge]
(
	[ChargeSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##EncounterSID]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##EncounterSID] ON [dbo].[PendingCharge]
(
	[EncounterSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##FinanceCenter]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##FinanceCenter] ON [dbo].[PendingCharge]
(
	[FinanceCenterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PendingCharge##HL7Status]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##HL7Status] ON [dbo].[PendingCharge]
(
	[HL7Status] ASC,
	[PracticeID] ASC,
	[PatientID] ASC,
	[AilmentSID] ASC,
	[PerformingProviderID] ASC,
	[EncounterSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##PendingChargePK]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##PendingChargePK] ON [dbo].[PendingCharge]
(
	[PendingChargeSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##PendingEncounter]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##PendingEncounter] ON [dbo].[PendingCharge]
(
	[PendingEncounterSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##PracServDate]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##PracServDate] ON [dbo].[PendingCharge]
(
	[PracticeID] ASC,
	[FromServiceDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##PracticeEncounter]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##PracticeEncounter] ON [dbo].[PendingCharge]
(
	[PracticeID] ASC,
	[EncounterSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [PendingCharge##PracticePatient]    Script Date: 08/01/2021 2:43:28 AM ******/
CREATE NONCLUSTERED INDEX [PendingCharge##PracticePatient] ON [dbo].[PendingCharge]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[FromServiceDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__PendingC__CE877834E2E56BC7]    Script Date: 08/01/2021 2:43:28 AM ******/
ALTER TABLE [dbo].[PendingCharge] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


