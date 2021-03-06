USE [medman]
GO

/****** Object:  Index [ClaimCharge##ChargeClaim]    Script Date: 08/01/2021 2:34:28 AM ******/
CREATE NONCLUSTERED INDEX [ClaimCharge##ChargeClaim] ON [dbo].[ClaimCharge]
(
	[ChargeSID] ASC,
	[ClaimSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ClaimCharge##ChargeSID]    Script Date: 08/01/2021 2:34:28 AM ******/
CREATE NONCLUSTERED INDEX [ClaimCharge##ChargeSID] ON [dbo].[ClaimCharge]
(
	[ChargeSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

/****** Object:  Index [ClaimCharge##ClaimLineItemPK]    Script Date: 08/01/2021 2:34:28 AM ******/
CREATE NONCLUSTERED INDEX [ClaimCharge##ClaimLineItemPK] ON [dbo].[ClaimCharge]
(
	[ClaimSID] ASC,
	[ChargeSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [PK__ClaimCha__CE877834D912155B]    Script Date: 08/01/2021 2:34:28 AM ******/
ALTER TABLE [dbo].[ClaimCharge] ADD PRIMARY KEY NONCLUSTERED 
(
	[prrowid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO


