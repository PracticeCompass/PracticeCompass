USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspLookupCode]    Script Date: 2021-12-18 2:14:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspUserLookupCodeSave] 
@CreateStamp varchar(150),
@CreateUser varchar(150),
@RecordStatus varchar(150),
@Description  varchar(250),
@LookupCode  varchar(150),
@LookupType  varchar(150),
@order int,
@LastUser varchar(150),
@pro2created varchar(150),
@pro2modified varchar(150),
@Pro2SrcPDB varchar(150),
@prrowid varchar(150),
@TimeStamp varchar(150),
@IsAdd bit,
@gridId  varchar(250)


AS
BEGIN
IF(@IsAdd = 1)
BEGIN
INSERT INTO [dbo].userLookupCode
           (CreateStamp,CreateUser,[Description],LastUser,LookupCode,LookupType,[Order],pro2created,pro2modified,Pro2SrcPDB,prrowid,RecordStatus,[TimeStamp])
     VALUES
           (@CreateStamp,@CreateUser,@Description,@LastUser,@LookupCode,@LookupType,@order,@pro2created,@pro2modified,@Pro2SrcPDB,@prrowid,@RecordStatus,@TimeStamp)
		   END
else 
		   BEGIN
		    update userLookupCode set [Description]=@Description,LookupCode=@LookupCode,RecordStatus=@RecordStatus where (LookupType+ LookupCode)  =@gridId

END

END
