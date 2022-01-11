USE [Medman]
GO
If Not EXISTS (SELECT * FROM sys.indexes WHERE name='PlanClaim##ClaimCoverage' AND object_id = OBJECT_ID('dbo.PlanClaim'))
BEGIN
/****** Object:  Index [NonClusteredIndex-20220105-181930]    Script Date: 01/05/2022 6:53:48 PM ******/
CREATE NONCLUSTERED INDEX [PlanClaim##ClaimCoverage] ON [dbo].[PlanClaim]
(
	[ClaimSID] ASC,
	[CoverageOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
END


