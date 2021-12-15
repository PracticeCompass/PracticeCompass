USE [medman]
GO

/****** Object:  Table [dbo].[ERAFileManager]    Script Date: 12/10/2021 3:24:28 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ERAFileManager]') AND type in (N'U'))
DROP TABLE [dbo].[ERAFileManager]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE  TABLE [dbo].[ERAFileManager](
	[FileID] [int] IDENTITY(1,1) NOT NULL,
	[FileName] [nvarchar](250) NOT NULL,
	[Path] [nvarchar](250) NOT NULL,
	[FileDate] [datetime] NOT NULL,
	[IsProcessed] [bit] NULL,
	[Notes] [nvarchar](250) NULL,
 CONSTRAINT [PK_ERAFileManager] PRIMARY KEY CLUSTERED 
(
	[FileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


