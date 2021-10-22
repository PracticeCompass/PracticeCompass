USE [medman]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##AccountCharges]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##AccountCharges] ON [dbo].[Charge]
(
	[AccountSID] ASC,
	[RecordStatus] ASC,
	[DateSatisfied] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##AccountPost]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##AccountPost] ON [dbo].[Charge]
(
	[AccountSID] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##AdminChargeCode]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##AdminChargeCode] ON [dbo].[Charge]
(
	[PracticeID] ASC,
	[AdminChargeCode] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##ChargeDepartment]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##ChargeDepartment] ON [dbo].[Charge]
(
	[DepartmentCode] ASC,
	[ChargeSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##ChargePK]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##ChargePK] ON [dbo].[Charge]
(
	[ChargeSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##ChargeTypePostDate]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##ChargeTypePostDate] ON [dbo].[Charge]
(
	[PracticeID] ASC,
	[ChargeType] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##CreditedProvider]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##CreditedProvider] ON [dbo].[Charge]
(
	[PracticeID] ASC,
	[StaffID] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##FinanceCenter]    Script Date: 08/01/2021 2:32:30 AM ******/
CREATE NONCLUSTERED INDEX [Charge##FinanceCenter] ON [dbo].[Charge]
(
	[FinanceCenterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##GuarantorRespDate]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##GuarantorRespDate] ON [dbo].[Charge]
(
	[GuarantorRespDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##Journal]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##Journal] ON [dbo].[Charge]
(
	[PostDate] DESC,
	[JournalSID] ASC,
	[CreateStamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##PatientAcctPost]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PatientAcctPost] ON [dbo].[Charge]
(
	[PatientID] ASC,
	[AccountSID] ASC,
	[PostDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##PatientCharges]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PatientCharges] ON [dbo].[Charge]
(
	[PracticeID] ASC,
	[PatientID] ASC,
	[DateSatisfied] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##PatientStatementCharges]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PatientStatementCharges] ON [dbo].[Charge]
(
	[PatientStatement] ASC,
	[PatientID] ASC,
	[AccountSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##PolicyIdx]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PolicyIdx] ON [dbo].[Charge]
(
	[RespPartyID] ASC,
	[PolicyNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [Charge##PostDate]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PostDate] ON [dbo].[Charge]
(
	[PostDate] ASC
)
INCLUDE([ChargeSID],[AccountSID],[Amount],[ApprovedAmount],[GuarantorRespDate],[RecordStatus],[GuarantorReceipts],[InsuranceReceipts],[RespCoverageOrder]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##PostDateRecordStatus]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PostDateRecordStatus] ON [dbo].[Charge]
(
	[PostDate] ASC,
	[RecordStatus] ASC
)
INCLUDE([ChargeSID],[PracticeID],[Amount]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##PracSevTwoRuleBillingHold]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PracSevTwoRuleBillingHold] ON [dbo].[Charge]
(
	[PracticeID] ASC,
	[SevTwoRuleBillingHold] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##PracStatusAccount]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##PracStatusAccount] ON [dbo].[Charge]
(
	[PracticeID] ASC,
	[RecordStatus] ASC,
	[AccountSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##RecordStatus]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##RecordStatus] ON [dbo].[Charge]
(
	[RecordStatus] ASC
)
INCLUDE([ChargeSID],[PracticeID],[PatientID],[AccountSID],[PostDate],[Amount],[ApprovedAmount]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##RecordStatus#RespCoverageOrder]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##RecordStatus#RespCoverageOrder] ON [dbo].[Charge]
(
	[RecordStatus] ASC,
	[RespCoverageOrder] ASC
)
INCLUDE([ChargeSID],[PracticeID],[PatientID],[PostDate],[Amount],[ApprovedAmount],[DateSatisfied],[GuarantorRespDate],[GuarantorReceipts],[InsuranceReceipts],[Adjustments]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [Charge##RespParty]    Script Date: 08/01/2021 2:32:31 AM ******/
CREATE NONCLUSTERED INDEX [Charge##RespParty] ON [dbo].[Charge]
(
	[PracticeID] ASC,
	[RespPartyType] ASC,
	[RespPartyID] ASC,
	[RecordStatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__Charge__CE877834E7FB561F]    Script Date: 08/01/2021 2:32:31 AM ******/
ALTER TABLE [dbo].[Charge] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


