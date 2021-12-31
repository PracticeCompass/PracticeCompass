USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspLookupCodeSave]    Script Date: 2021-12-18 9:20:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE OR ALTER     PROCEDURE [dbo].[uspUserLookupTypeSave] 
@CreateStamp varchar(150),
@CreateUser varchar(150),
@LookupType varchar(150),
@Description  varchar(250),
@DescriptionLabel  varchar(150),
@Length int,
@LastUser varchar(150),
@pro2created varchar(150),
@pro2modified varchar(150),
@Pro2SrcPDB varchar(150),
@prrowid varchar(150),
@TimeStamp varchar(150)
--@IsAdd bit,
--@gridId  varchar(250)


AS
BEGIN
--IF(@IsAdd = 1)
BEGIN

INSERT INTO [dbo].UserLookupType
           (CreateStamp,CreateUser,[Description],LastUser,[DescriptionLabel],LookupType,[Length],pro2created,pro2modified,Pro2SrcPDB,prrowid,[TimeStamp])
     VALUES
           (@CreateStamp,@CreateUser,@Description,@LastUser,@DescriptionLabel,@LookupType,@Length,@pro2created,@pro2modified,@Pro2SrcPDB,@prrowid,@TimeStamp)
		   END
--else 
--		   BEGIN
--		    update LookupType set [Description]=@Description,[DescriptionLabel]=@DescriptionLabel,Class=@Class, where (LookupType+ LookupCode)  =@gridId

--END

END
