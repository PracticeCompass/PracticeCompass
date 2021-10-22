USE [medman]
GO

/****** Object:  Table [dbo].[Filters]    Script Date: 7/11/2021 12:36:31 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Trends]') AND type in (N'U'))
DROP TABLE [dbo].[Trends]
GO

/****** Object:  Table [dbo].[Filters]    Script Date: 7/11/2021 12:36:31 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Trends](
	[TrendID] [int] IDENTITY(1,1) NOT NULL,
	[EntityName] [nvarchar](50) NOT NULL,
	[EntityValueID] [nvarchar](100) NOT NULL,
	[UserID] [int] NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[LastEditDate] [datetime] NOT NULL,
	[searchcount] [int] NOT NULL,
 CONSTRAINT [PK_Trends] PRIMARY KEY CLUSTERED 
(
	[TrendID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) 
GO


INSERT INTO Trends
        (EntityName, EntityValueID, UserID,Timestamp,LastEditDate,searchcount)
    SELECT
        distinct  'CPT', ProcedureCode, 5,GETDATE(),GETDATE(),0
        FROM ProcedureEvent

		GO
