USE [medman]
GO
/****** Object:  UserDefinedFunction [dbo].[FuncGetMAXprrowid]    Script Date: 11/16/2021 2:10:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER   function  [dbo].[FuncGetMAXprrowid]
(
	@TableName nvarchar(100)
)
RETURNS nvarchar(36)
AS
BEGIN
	 DECLARE @MAXprrowid varchar(36)
	DECLARE @out int
DECLARE @sql nvarchar(max) =N'select @out_param=(SELECT MAX(CONVERT(INT, CONVERT(VARBINARY, prrowid,1)))+1) from '+@TableName
EXEC sp_executesql @sql,
                   N'@out_param int OUTPUT',
                     @out_param=@out OUTPUT
	 set @MAXprrowid='0x'+FORMAT(@out,'x16')
	return  @MAXprrowid

END
