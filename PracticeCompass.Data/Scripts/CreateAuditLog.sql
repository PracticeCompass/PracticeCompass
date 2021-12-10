USE [medman]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AuditLog]') AND type in (N'U'))
ALTER TABLE [dbo].[AuditLog] DROP CONSTRAINT [DF_Audit_Log_Audit_Date]
GO

/****** Object:  Table [dbo].[AuditLog]    Script Date: 9/27/2021 11:27:03 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AuditLog]') AND type in (N'U'))
DROP TABLE [dbo].[AuditLog]
GO

/****** Object:  Table [dbo].[AuditLog]    Script Date: 9/27/2021 11:27:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON

GO

CREATE TABLE [dbo].[AuditLog](
	[AuditID] [int] IDENTITY(1,1) NOT NULL,
	[Audit_PatientID] [varchar](28) NULL,
	[Audit_PatientName] [varchar](120) NULL,
	[Audit_EncounterSID] [int] NULL,
	[Audit_ProcedureEventSID] [int] NULL,
	[Audit_ProcedureName] [varchar](150) NULL,
	[Audit_UserName] [varchar](50) NULL,
	[Audit_Date] [datetime] NULL,
	[Audit_Type] [varchar](50) NULL,
	[Audit_Location] [varchar](50) NULL,
	[Audit_Module] [varchar](50) NULL,
	[Audit_Practice] [varchar](120) NULL,
	[Audit_Comment] [varchar](1000) NULL,
 CONSTRAINT [AuditID] PRIMARY KEY CLUSTERED 
(
	[AuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AuditLog] ADD  CONSTRAINT [DF_Audit_Log_Audit_Date]  DEFAULT (getdate()) FOR [Audit_Date]
GO


