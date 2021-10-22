USE [medman]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Procedur__CE8778340A01B398]    Script Date: 08/01/2021 2:50:35 AM ******/
ALTER TABLE [dbo].[ProcedureEvent] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##AilmentSID]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##AilmentSID] ON [dbo].[ProcedureEvent]
(
	[AilmentSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##Charge]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##Charge] ON [dbo].[ProcedureEvent]
(
	[ChargeSID] ASC
)
INCLUDE([StaffID],[ProcedureCode]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##Encounter]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##Encounter] ON [dbo].[ProcedureEvent]
(
	[EncounterSID] ASC
)
INCLUDE([ChargeSID],[ProcedureCode],[ProcedureEventSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##FromServiceDateInclude]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##FromServiceDateInclude] ON [dbo].[ProcedureEvent]
(
	[FromServiceDate] ASC
)
INCLUDE([ChargeSID],[ProcedureCode],[EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##PatientID]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##PatientID] ON [dbo].[ProcedureEvent]
(
	[PatientID] ASC
)
INCLUDE([ProcedureCode],[PracticeID],[FromServiceDate]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##PatientProcedures]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##PatientProcedures] ON [dbo].[ProcedureEvent]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[FromServiceDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##PerformingProvider]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##PerformingProvider] ON [dbo].[ProcedureEvent]
(
	[StaffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##PracSCServDate]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##PracSCServDate] ON [dbo].[ProcedureEvent]
(
	[PracticeID] ASC,
	[ServiceCenterID] ASC,
	[FromServiceDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ProcedureEvent##PracServDateProc]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##PracServDateProc] ON [dbo].[ProcedureEvent]
(
	[PracticeID] ASC,
	[FromServiceDate] ASC,
	[ProcedureCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##PracStaffServDate]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##PracStaffServDate] ON [dbo].[ProcedureEvent]
(
	[PracticeID] ASC,
	[StaffID] ASC,
	[FromServiceDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ProcedureEvent##ProcedureCode]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##ProcedureCode] ON [dbo].[ProcedureEvent]
(
	[ProcedureCode] ASC,
	[FromServiceDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##ProcedureEventPK]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##ProcedureEventPK] ON [dbo].[ProcedureEvent]
(
	[ProcedureEventSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##ProcedureEventSID#ChargeSID]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##ProcedureEventSID#ChargeSID] ON [dbo].[ProcedureEvent]
(
	[ProcedureEventSID] ASC
)
INCLUDE([ChargeSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##ReferralSID]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##ReferralSID] ON [dbo].[ProcedureEvent]
(
	[ReferralSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ProcedureEvent##ServiceCenter]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##ServiceCenter] ON [dbo].[ProcedureEvent]
(
	[ServiceCenterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [ProcedureEvent##ServiceDate]    Script Date: 08/01/2021 2:50:36 AM ******/
CREATE NONCLUSTERED INDEX [ProcedureEvent##ServiceDate] ON [dbo].[ProcedureEvent]
(
	[FromServiceDate] ASC,
	[ProcedureCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


