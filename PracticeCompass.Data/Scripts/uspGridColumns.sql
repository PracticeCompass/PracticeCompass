use medman

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GridColumns]') AND type in (N'U'))
DROP TABLE [dbo].[GridColumns]
GO
/****** Object:  Table [dbo].[GridColumns]    Script Date: 10/11/2021 12:36:31 AM ******/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

BEGIN
   CREATE TABLE [dbo].[GridColumns] (
    ID int IDENTITY(1,1),
    Name varchar(max) Not null,
	UserId int Not null,
    Columns varchar(max) Not null,
 CONSTRAINT [PK_GridColumns] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
End
GO
CREATE OR ALTER      PROCEDURE [dbo].[uspGetGridColumns] 
@Name varchar(max),
@UserId int

AS
BEGIN
	SET NOCOUNT ON;

  select Name,columns from GridColumns where Name=@Name and UserId = @UserId
END

GO
CREATE OR ALTER      PROCEDURE [dbo].[uspGridColumnsSave] 
@Name varchar(max),
@Columns varchar(max),
@UserId int
AS
BEGIN
	SET NOCOUNT ON;
	IF EXISTS(select * from GridColumns where Name=@Name and UserId = @UserId)
	BEGIN
	  update GridColumns set columns=@columns where Name=@Name and UserId = @UserId
	END
	ELSE
	BEGIN
	 insert into GridColumns (Name,Columns,UserId) values(@Name,@columns,@UserId)
	END
	select Name,Columns from GridColumns where Name=@Name and UserId = @UserId
END