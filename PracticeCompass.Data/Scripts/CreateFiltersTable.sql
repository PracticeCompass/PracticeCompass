USE [medman]
GO

/****** Object:  Table [dbo].[Filters]    Script Date: 7/11/2021 12:36:31 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Filters]') AND type in (N'U'))
DROP TABLE [dbo].[Filters]
GO

/****** Object:  Table [dbo].[Filters]    Script Date: 7/11/2021 12:36:31 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE TABLE [dbo].[Filters](
	[FilterID] [int] IDENTITY(1,1) NOT NULL,
	[DisplayName] [nvarchar](50) NOT NULL,
	[Body] [nvarchar](max) NOT NULL,
	[Entity] [nvarchar](50) NOT NULL,
	[Order] [int] NULL,
	[CreationDate] [datetime] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[LastEditDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK_Filters] PRIMARY KEY CLUSTERED 
(
	[FilterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


