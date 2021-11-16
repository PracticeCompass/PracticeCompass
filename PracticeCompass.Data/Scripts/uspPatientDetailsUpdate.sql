USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPatientDetailsUpdate]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Update Patient Details
-- exec [uspPatientDetailsUpdate] 
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspPatientDetailsUpdate] 
	-- Add the parameters for the stored procedure here
     @PatientID int,
     @DNLastName varchar(42),
     @DNFirstName varchar(37),
     @DNMiddleName varchar(31),
     @DNNameSuffix varchar(42),
     @StateCode varchar(6),
     @City varchar(63),
     @GenderCode varchar(2),
     @PracticeCode int,
     @Address1 varchar(84),
     @Address2 varchar(80),
     @DNDOB datetime,
     @MaritalStatusCode varchar(2),
     @Zip varchar(21),
     @DNSSN varchar(22),
     @HomePhone varchar(42),
     @WorkPhone varchar(42),
     @WorkPhoneExt varchar(14),
     @MobilePhone varchar(42),
     @userID int
AS
BEGIN

UPDATE [dbo].[Person]
   SET [LastName] = @DNLastName
      ,[FirstName] = @DNFirstName
      ,[MiddleName] = @DNMiddleName
      ,[NameSuffix] = @DNNameSuffix
      ,[SortName] = @DNLastName +', '+@DNFirstName
      ,[SSN] = @DNSSN
      ,[Sex] = @GenderCode
      ,[DOB] = @DNDOB
	  ,MaritalStatus = @MaritalStatusCode
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE PersonID = @PatientID

 Update Patient set PracticeID = @PracticeCode where PatientID=@PatientID and PracticeID=@PracticeCode


 if not exists (select [EntitySID] from Address where EntitySID=@PatientID)
 begin 
INSERT INTO [dbo].[Address]
           ([prrowid],[EntitySID],[Class],[Line1],[Line2],[City],[State],[Country],[Zip]
           ,[Attention],[TimeStamp],[LastUser],[CreateStamp],[CreateUser],[HL7Updated],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('Address'),@PatientID,'H',@Address1,@Address2,@City,@StateCode,'US',@Zip
           ,'',GETDATE(),@userID,GETDATE(),@userID,'','medman',GETDATE(),GETDATE())
END
ELSE
BEGIN

UPDATE [dbo].[Address]
   SET [Line1] = @Address1
      ,[Line2] = @Address2
      ,[City] = @City
      ,[State] = @StateCode
      ,[Zip] = @Zip
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE EntitySID=@PatientID
END


 if not exists (select [EntitySID] from [Phone] where EntitySID=@PatientID and  Class='H')
 begin 
INSERT INTO [dbo].[Phone]
           ([prrowid],[EntitySID],[Class],[Number],[Contact],[Extension],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[HL7Updated],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('phone'),@PatientID,'H',@HomePhone,'','',GETDATE(),@userID
           ,GETDATE(),@userID,'','medman',GETDATE(),GETDATE())
END
ELSE
BEGIN

UPDATE [dbo].[Phone]
   SET [Number] = @HomePhone
      ,[TimeStamp] = GETDATE()
      ,[LastUser] =@userID
      ,[pro2modified] = GETDATE()
 WHERE EntitySID = @PatientID and Class='H'

 END

  if not exists (select [EntitySID] from [Phone] where EntitySID=@PatientID and  Class='W')
 begin 
INSERT INTO [dbo].[Phone]
           ([prrowid],[EntitySID],[Class],[Number],[Contact],[Extension],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[HL7Updated],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('phone'),@PatientID,'W',@WorkPhone,'',@WorkPhoneExt,GETDATE(),@userID
           ,GETDATE(),@userID,'','medman',GETDATE(),GETDATE())
END
ELSE
BEGIN

UPDATE [dbo].[Phone]
   SET [Number] = @WorkPhone
      ,[TimeStamp] = GETDATE()
      ,[LastUser] =@userID
      ,[pro2modified] = GETDATE()
 WHERE EntitySID = @PatientID and Class='W'

 END

   if not exists (select [EntitySID] from [Phone] where EntitySID=@PatientID and  Class='M')
 begin 
INSERT INTO [dbo].[Phone]
           ([prrowid],[EntitySID],[Class],[Number],[Contact],[Extension],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[HL7Updated],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('phone'),@PatientID,'M',@WorkPhone,'',@WorkPhoneExt,GETDATE(),@userID
           ,GETDATE(),@userID,'','medman',GETDATE(),GETDATE())
END
ELSE
BEGIN

UPDATE [dbo].[Phone]
   SET [Number] = @WorkPhone
      ,[TimeStamp] = GETDATE()
      ,[LastUser] =@userID
      ,[pro2modified] = GETDATE()
 WHERE EntitySID = @PatientID and Class='M'

 END




END


