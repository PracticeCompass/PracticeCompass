USE [medman]
GO

/****** Object:  Index [Patient##AssignedProvider]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##AssignedProvider] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[StaffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##BackImageFileID]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##BackImageFileID] ON [dbo].[Patient]
(
	[BackImageFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##BackImageSID]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##BackImageSID] ON [dbo].[Patient]
(
	[BackImageSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##ChartNumber]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##ChartNumber] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[ChartNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##Class]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##Class] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[Class] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##ClinicalChangeTimeStamp]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##ClinicalChangeTimeStamp] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[ClinicalChangeTimeStamp] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##CreateStamp##PracticeID#PatientID#ReferralSource#RegistrationComplete]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##CreateStamp##PracticeID#PatientID#ReferralSource#RegistrationComplete] ON [dbo].[Patient]
(
	[CreateStamp] ASC
)
INCLUDE([PracticeID],[PatientID],[ReferralSource],[RegistrationComplete]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##CreateStamp#PatientID#ReferralSource#RegistrationComplete]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##CreateStamp#PatientID#ReferralSource#RegistrationComplete] ON [dbo].[Patient]
(
	[CreateStamp] ASC
)
INCLUDE([PatientID],[ReferralSource],[RegistrationComplete]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##CreateStamp#PracticeID#PatientID#Class#ReferralSource#DNDOB]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##CreateStamp#PracticeID#PatientID#Class#ReferralSource#DNDOB] ON [dbo].[Patient]
(
	[CreateStamp] ASC
)
INCLUDE([PracticeID],[PatientID],[Class],[ReferralSource],[DNDOB]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##CreateStamp#PracticeID#PatientID#Class#RegistrationComplete]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##CreateStamp#PracticeID#PatientID#Class#RegistrationComplete] ON [dbo].[Patient]
(
	[CreateStamp] ASC
)
INCLUDE([PracticeID],[PatientID],[Class],[RegistrationComplete]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##DOB]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##DOB] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNDOB] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##DOBName]    Script Date: 08/01/2021 2:42:14 AM ******/
CREATE NONCLUSTERED INDEX [Patient##DOBName] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNDOB] ASC,
	[DNLastName] ASC,
	[DNFirstName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##DuplicatePersonID]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##DuplicatePersonID] ON [dbo].[Patient]
(
	[DuplicatePersonID] ASC,
	[PracticeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##FavoritePharmacy]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##FavoritePharmacy] ON [dbo].[Patient]
(
	[FavoritePharmacyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##FormularyPlan]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##FormularyPlan] ON [dbo].[Patient]
(
	[FormularyPlanID] ASC,
	[FormularyGroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##FrontImageFileID]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##FrontImageFileID] ON [dbo].[Patient]
(
	[FrontImageFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##FrontImageSID]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##FrontImageSID] ON [dbo].[Patient]
(
	[FrontImageSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##MobilePhone]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##MobilePhone] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNMobilePhone] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##Name]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##Name] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNLastName] ASC,
	[DNFirstName] ASC,
	[DNMiddleName] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##PatientChartScanned]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PatientChartScanned] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[ChartScanned] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##PatientID]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PatientID] ON [dbo].[Patient]
(
	[PatientID] ASC,
	[PracticeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##PatientNumber]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PatientNumber] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNPersonNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##Phone]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##Phone] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNHomePhone] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##PracCareCoordinatorID]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PracCareCoordinatorID] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[CareCoordinatorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##PracExemptPatient]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PracExemptPatient] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[ExemptFromReporting] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##PracRegCompStamp]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PracRegCompStamp] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[RegistrationComplete] ASC,
	[CreateStamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##PracSortChartNumber]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PracSortChartNumber] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNSortChartNumber] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##PracSortPatientNumber]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PracSortPatientNumber] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNSortPersonNumber] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##PracticePatientPK]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PracticePatientPK] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##PracticeRecordStatus]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PracticeRecordStatus] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[RecordStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##PrimaryCarePracticeID]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##PrimaryCarePracticeID] ON [dbo].[Patient]
(
	[PrimaryCareProviderID] ASC,
	[PracticeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##ReferralSource]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##ReferralSource] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[ReferralSource] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##RefProvider]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##RefProvider] ON [dbo].[Patient]
(
	[RefDoctorID] ASC,
	[PracticeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Patient##RegistrationDate]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##RegistrationDate] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[RegistrationDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Patient##SSN]    Script Date: 08/01/2021 2:42:15 AM ******/
CREATE NONCLUSTERED INDEX [Patient##SSN] ON [dbo].[Patient]
(
	[PracticeID] ASC,
	[DNSSN] ASC,
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Patient__CE87783438C90CCE]    Script Date: 08/01/2021 2:42:15 AM ******/
ALTER TABLE [dbo].[Patient] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


