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
 CONSTRAINT [PK_ERADenialAlert] PRIMARY KEY CLUSTERED 
(
	[ERACodeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ERADenialAlert] ON 
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask]) VALUES (1, N'CO', 45, N'Phys', NULL)
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask]) VALUES (2, N'PR', 2, N'move', NULL)
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask]) VALUES (3, N'CO', 253, N'Phys', NULL)
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask]) VALUES (4, N'PR', 3, N'Pat', NULL)
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask]) VALUES (5, N'PR', 1, N'Pat', NULL)
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask]) VALUES (6, N'CO', 29, N'Manual', NULL)
GO
INSERT [dbo].[ERADenialAlert] ([ERACodeID], [GroupCode], [CodeNumber], [AlertCode], [AutomatedTask]) VALUES (7, N'CO', 16, N'Manual', NULL)
GO
SET IDENTITY_INSERT [dbo].[ERADenialAlert] OFF
GO
