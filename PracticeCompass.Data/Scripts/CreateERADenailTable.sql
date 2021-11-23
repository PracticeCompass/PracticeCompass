USE [medman]
GO

/****** Object:  Table [dbo].[ERADenialAlert]    Script Date: 11/18/2021 12:58:30 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ERADenialAlert]') AND type in (N'U'))
DROP TABLE [dbo].[ERADenialAlert]
GO

/****** Object:  Table [dbo].[ERADenialAlert]    Script Date: 11/18/2021 1:02:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ERADenialAlert](
	[ERACodeID] [int] IDENTITY(1,1) NOT NULL,
	[GroupCode] [varchar](5) NOT NULL,
	[CodeNumber] [int] NOT NULL,
	[AlertCode] [varchar](50) NOT NULL,
	[AutomatedTask] [varchar](250) NULL,
	[ShortDescription] [varchar](50) NULL,
	[LongDescription] [varchar](max) NULL,
 CONSTRAINT [PK_ERADenialAlert] PRIMARY KEY CLUSTERED 
(
	[ERACodeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ERADenialAlert] ON 
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask], [ShortDescription], [LongDescription]) VALUES (1, N'CO', 45, N'Phys', NULL, N'Charge exceeds fee schedule', N'Charge exceeds fee schedule/maximum allowable or contracted/legislated fee arrangement. Usage: This adjustment amount cannot equal the total service or claim charge amount; and must not duplicate provider adjustment amounts (payments and contractual reductions) that have resulted from prior payer(s) adjudication. (Use only with Group Codes PR or CO depending upon liability)')
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask], [ShortDescription], [LongDescription]) VALUES (2, N'PR', 2, N'move', NULL, N'Coinsurance Amount
', N'Coinsurance Amount
')
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask], [ShortDescription], [LongDescription]) VALUES (3, N'CO', 253, N'Phys', NULL, N'Sequestration - reduction in federal payment
', N'Sequestration - reduction in federal payment
')
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask], [ShortDescription], [LongDescription]) VALUES (4, N'PR', 3, N'Pat', NULL, N'Co-payment Amount
', N'Co-payment Amount
')
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask], [ShortDescription], [LongDescription]) VALUES (5, N'PR', 1, N'Pat', NULL, N'Deductible Amount
', N'Deductible Amount
')
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask], [ShortDescription], [LongDescription]) VALUES (6, N'CO', 29, N'Manual', NULL, N'The time limit for filing has expired.
', N'The time limit for filing has expired.
')
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask], [ShortDescription], [LongDescription]) VALUES (7, N'CO', 16, N'Manual', NULL, N'Claim/service lacks information ', N'Claim/service lacks information or has submission/billing error(s). Usage: Do not use this code for claims attachment(s)/other documentation. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.) Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.
')
GO
SET IDENTITY_INSERT [dbo].[ERADenialAlert] OFF
GO
