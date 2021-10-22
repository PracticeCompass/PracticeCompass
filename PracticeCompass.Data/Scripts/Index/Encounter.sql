USE [medman]
GO

/****** Object:  Index [Encounter##AccountSID]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##AccountSID] ON [dbo].[Encounter]
(
	[AccountSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##ClinicalStatus]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##ClinicalStatus] ON [dbo].[Encounter]
(
	[ClinicalStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##CLWTemplateID]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##CLWTemplateID] ON [dbo].[Encounter]
(
	[CLWTemplateSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##DuplicatePatEncounter]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##DuplicatePatEncounter] ON [dbo].[Encounter]
(
	[DuplicatePatEncounterSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##EncounterNoteCatalogSID]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##EncounterNoteCatalogSID] ON [dbo].[Encounter]
(
	[EncounterNoteCatalogSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##EncounterPK]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##EncounterPK] ON [dbo].[Encounter]
(
	[EncounterSID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##EncounterStatus]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##EncounterStatus] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[EncounterStatus] ASC,
	[EncounterNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##OccurDate#EncounterSID#PracticeID#SignUser]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##OccurDate#EncounterSID#PracticeID#SignUser] ON [dbo].[Encounter]
(
	[OccurDate] ASC
)
INCLUDE([EncounterSID],[PracticeID],[SignUser]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##OccurDate#EncounterStatus#EncounterSID]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##OccurDate#EncounterStatus#EncounterSID] ON [dbo].[Encounter]
(
	[OccurDate] ASC,
	[EncounterStatus] ASC
)
INCLUDE([EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##Occurence]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##Occurence] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[OccurDate] DESC,
	[OccurTime] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##PatientIDInclude]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PatientIDInclude] ON [dbo].[Encounter]
(
	[PatientID] ASC
)
INCLUDE([EncounterSID],[PracticeID],[OccurDate]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##PracDateServiceCtr]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracDateServiceCtr] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[OccurDate] ASC,
	[ServiceCenterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##PracPatEncounter]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracPatEncounter] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[EncounterNumber] ASC,
	[OccurDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##PracPatSortEncounter]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracPatSortEncounter] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[DNSortEncounterNumber] ASC,
	[OccurDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##PracPatStatus]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracPatStatus] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[EncounterStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##PracServiceDate]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracServiceDate] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[ServiceCenterID] ASC,
	[OccurDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##PracSignStamp]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracSignStamp] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[SignStamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##PracStaffClinStatus]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracStaffClinStatus] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[StaffID] ASC,
	[ClinicalStatus] ASC,
	[OccurDate] ASC,
	[OccurTime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##PracStatusTypeDatePat]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracStatusTypeDatePat] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[EncounterStatus] ASC,
	[EncounterType] ASC,
	[OccurDate] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##PracticeEncounter]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracticeEncounter] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[EncounterNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##PracticeID#SignUser#OccurDate#EncounterSID]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##PracticeID#SignUser#OccurDate#EncounterSID] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[SignUser] ASC,
	[OccurDate] ASC
)
INCLUDE([EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##ReasonCode]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##ReasonCode] ON [dbo].[Encounter]
(
	[ReasonCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##ReasonCode#OccurDate]    Script Date: 08/01/2021 2:37:05 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##ReasonCode#OccurDate] ON [dbo].[Encounter]
(
	[ReasonCode] ASC,
	[OccurDate] ASC
)
INCLUDE([EncounterSID],[PatientID],[SignUser]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##ReminderSnapshotStatus]    Script Date: 08/01/2021 2:37:06 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##ReminderSnapshotStatus] ON [dbo].[Encounter]
(
	[ReminderSnapshotStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Encounter##Room]    Script Date: 08/01/2021 2:37:06 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##Room] ON [dbo].[Encounter]
(
	[ServiceCenterID] ASC,
	[RoomCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##SignUser]    Script Date: 08/01/2021 2:37:06 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##SignUser] ON [dbo].[Encounter]
(
	[SignUser] ASC
)
INCLUDE([EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##StaffID#OccurDate]    Script Date: 08/01/2021 2:37:06 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##StaffID#OccurDate] ON [dbo].[Encounter]
(
	[StaffID] ASC,
	[OccurDate] ASC
)
INCLUDE([EncounterSID],[ServiceCenterID],[PatientID],[ReasonCode]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

/****** Object:  Index [Encounter##StaffOccurrence]    Script Date: 08/01/2021 2:37:06 AM ******/
CREATE NONCLUSTERED INDEX [Encounter##StaffOccurrence] ON [dbo].[Encounter]
(
	[PracticeID] ASC,
	[StaffID] ASC,
	[OccurDate] DESC,
	[OccurTime] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Encounte__CE877834EF29B5BB]    Script Date: 08/01/2021 2:37:06 AM ******/
ALTER TABLE [dbo].[Encounter] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


