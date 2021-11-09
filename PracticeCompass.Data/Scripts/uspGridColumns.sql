use medman


IF (Not EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'medman' 
                 AND  TABLE_NAME = 'GridColumns'))
BEGIN
   CREATE TABLE GridColumns (
    ID int IDENTITY(1,1),
    Name varchar(max),
    Columns varchar(max),
	PRIMARY KEY (ID)
);
END
GO
CREATE OR ALTER      PROCEDURE [dbo].[uspGetGridColumns] 
@Name varchar(max)
AS
BEGIN
	SET NOCOUNT ON;

  select Name,columns from GridColumns where Name=@Name
END

GO
CREATE OR ALTER      PROCEDURE [dbo].[uspGridColumnsSave] 
@Name varchar(max),
@Columns varchar(max)
AS
BEGIN
	SET NOCOUNT ON;
	IF EXISTS(select * from GridColumns where Name=@Name)
	BEGIN
	  update GridColumns set columns=@columns where Name=@Name
	END
	ELSE
	BEGIN
	 insert into GridColumns (Name,Columns) values(@Name,@columns)
	END
	select Name,Columns from GridColumns where Name=@Name
END