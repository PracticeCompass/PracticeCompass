USE [medman]
GO

/****** Object:  Index [Appointment##Appointment]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##Appointment] ON [dbo].[Appointment]
(
	[ApptSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##AppointmentDate]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##AppointmentDate] ON [dbo].[Appointment]
(
	[PracticeID] ASC,
	[ApptDate] DESC,
	[ApptTime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##AppointmentPK]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##AppointmentPK] ON [dbo].[Appointment]
(
	[ApptSID] ASC,
	[PracticeID] ASC,
	[ServiceCenterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptDateApptStatus]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptDateApptStatus] ON [dbo].[Appointment]
(
	[ApptDate] ASC,
	[ApptStatus] ASC
)
INCLUDE([ApptSID],[PracticeID],[ServiceCenterID],[PatientID],[ReasonCode]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##ApptDateINCLUDE]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptDateINCLUDE] ON [dbo].[Appointment]
(
	[ApptDate] ASC
)
INCLUDE([ApptSID],[PracticeID],[ServiceCenterID],[EncounterSID],[PatientID],[ApptClass],[ReasonCode],[ApptStatus],[CreateStamp],[RescheduledApptSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus##ApptDate##CreateStamp]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus##ApptDate##CreateStamp] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[ApptDate] ASC,
	[CreateStamp] ASC
)
INCLUDE([prrowid],[ApptSID],[PracticeID],[PatientID],[ApptTime],[ReasonCode],[Note]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus#ApptDate#INCLUDE]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus#ApptDate#INCLUDE] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[ApptDate] ASC
)
INCLUDE([ApptSID],[ServiceCenterID],[EncounterSID],[PatientID],[ApptTime],[ReasonCode]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus#ApptDate#ReasonCode]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus#ApptDate#ReasonCode] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[ApptDate] ASC,
	[ReasonCode] ASC
)
INCLUDE([ApptSID],[PracticeID],[ServiceCenterID],[PatientID],[ApptTime]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus#ApptDate#ReasonCode##INCLUDE]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus#ApptDate#ReasonCode##INCLUDE] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[ApptDate] ASC,
	[ReasonCode] ASC
)
INCLUDE([ApptSID],[ServiceCenterID],[PatientID],[ApptTime]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus#ApptDate#ReasonCode#INCLUDE]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus#ApptDate#ReasonCode#INCLUDE] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[ApptDate] ASC,
	[ReasonCode] ASC
)
INCLUDE([prrowid],[ApptSID],[PracticeID],[ServiceCenterID],[PatientID],[ApptTime]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus#ApptSID#EncounterSID]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus#ApptSID#EncounterSID] ON [dbo].[Appointment]
(
	[ApptStatus] ASC
)
INCLUDE([ApptSID],[EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus#CreateStamp]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus#CreateStamp] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[CreateStamp] ASC
)
INCLUDE([ApptSID],[PatientID],[ReasonCode],[CreateUser]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatus#ReasonCode]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatus#ReasonCode] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[ReasonCode] ASC
)
INCLUDE([PatientID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatusApptDateReasonCodeCreateStamp]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatusApptDateReasonCodeCreateStamp] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[ApptDate] ASC,
	[ReasonCode] ASC,
	[CreateStamp] ASC
)
INCLUDE([PracticeID],[PatientID],[ApptTime]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ApptStatusPatientIDApptDate]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ApptStatusPatientIDApptDate] ON [dbo].[Appointment]
(
	[ApptStatus] ASC,
	[PatientID] ASC,
	[ApptDate] ASC
)
INCLUDE([ApptSID],[ReasonCode],[ServiceCenterID],[EncounterSID],[Note]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##DatePracSvcCtr]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##DatePracSvcCtr] ON [dbo].[Appointment]
(
	[ApptDate] ASC,
	[PracticeID] ASC,
	[ServiceCenterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##DateSCStatusReason]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##DateSCStatusReason] ON [dbo].[Appointment]
(
	[ServiceCenterID] ASC,
	[ApptDate] ASC,
	[ReasonCode] ASC,
	[ApptStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##Encounter]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##Encounter] ON [dbo].[Appointment]
(
	[EncounterSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ForDialers]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ForDialers] ON [dbo].[Appointment]
(
	[ApptDate] ASC,
	[ApptStatus] ASC,
	[ReasonCode] ASC,
	[prrowid] ASC
)
INCLUDE([ApptSID],[PatientID],[PracticeID],[ServiceCenterID],[ApptTime],[Note]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##Patient]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##Patient] ON [dbo].[Appointment]
(
	[PatientID] ASC,
	[ApptDate] ASC,
	[ApptTime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##PatientStatusDate]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##PatientStatusDate] ON [dbo].[Appointment]
(
	[PatientID] ASC,
	[ApptDate] ASC,
	[ApptStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##PracticePatient]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##PracticePatient] ON [dbo].[Appointment]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[ApptDate] ASC,
	[ApptTime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ReasonCode]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ReasonCode] ON [dbo].[Appointment]
(
	[ReasonCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ReasonCode#ApptSID#ServiceCenterID#EncounterSID]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ReasonCode#ApptSID#ServiceCenterID#EncounterSID] ON [dbo].[Appointment]
(
	[ReasonCode] ASC
)
INCLUDE([ApptSID],[ServiceCenterID],[EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ReasonCode#ApptStatus#ApptDate]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ReasonCode#ApptStatus#ApptDate] ON [dbo].[Appointment]
(
	[ReasonCode] ASC,
	[ApptStatus] ASC,
	[ApptDate] ASC
)
INCLUDE([prrowid],[ApptSID],[PatientID],[PracticeID],[ApptTime],[ServiceCenterID],[EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ReasonCode#ApptStatus#ApptDate#ApptTime]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ReasonCode#ApptStatus#ApptDate#ApptTime] ON [dbo].[Appointment]
(
	[ReasonCode] ASC,
	[ApptStatus] ASC,
	[ApptDate] ASC,
	[ApptTime] ASC
)
INCLUDE([prrowid],[ApptSID],[PatientID],[PracticeID],[ServiceCenterID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##Referral]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##Referral] ON [dbo].[Appointment]
(
	[ReferralSID] ASC,
	[ApptDate] ASC,
	[ApptTime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Appointment##RescheduledApptSID]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##RescheduledApptSID] ON [dbo].[Appointment]
(
	[RescheduledApptSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##SCStatusDateReason]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##SCStatusDateReason] ON [dbo].[Appointment]
(
	[ServiceCenterID] ASC,
	[ApptDate] ASC,
	[ReasonCode] ASC,
	[ApptStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##ServiceCenterID#ApptStatus#ApptDate]    Script Date: 08/01/2021 2:31:07 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##ServiceCenterID#ApptStatus#ApptDate] ON [dbo].[Appointment]
(
	[ServiceCenterID] ASC,
	[ApptStatus] ASC,
	[ApptDate] ASC
)
INCLUDE([prrowid],[ApptSID],[PracticeID],[PatientID],[ApptTime],[ReasonCode]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##StatusDateReasonCode]    Script Date: 08/01/2021 2:31:08 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##StatusDateReasonCode] ON [dbo].[Appointment]
(
	[ApptDate] ASC,
	[ReasonCode] ASC,
	[ApptStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment##StatusDateReasonCodePracticeServiceCenter]    Script Date: 08/01/2021 2:31:08 AM ******/
CREATE NONCLUSTERED INDEX [Appointment##StatusDateReasonCodePracticeServiceCenter] ON [dbo].[Appointment]
(
	[PracticeID] ASC,
	[ServiceCenterID] ASC,
	[ApptDate] ASC,
	[ReasonCode] ASC,
	[ApptStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Appointment#ApptStatus]    Script Date: 08/01/2021 2:31:08 AM ******/
CREATE NONCLUSTERED INDEX [Appointment#ApptStatus] ON [dbo].[Appointment]
(
	[ApptStatus] ASC
)
INCLUDE([EncounterSID]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Appointm__CE877834C1685176]    Script Date: 08/01/2021 2:31:08 AM ******/
ALTER TABLE [dbo].[Appointment] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


