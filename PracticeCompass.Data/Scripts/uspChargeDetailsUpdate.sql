USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspChargeDetailsUpdate]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Update Claim Details
-- exec [uspChargeDetailsUpdate] 
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspChargeDetailsUpdate] 
	-- Add the parameters for the stored procedure here
     @ChargeSID int,
    @ProcedureCode varchar(21),
    @Units decimal(18,3),
    @Amount decimal(17,2),
    @FromServiceDate datetime,
    @ToServiceDate datetime,
    @RecordStatus varchar(2),
    @Modifier1 varchar(4),
    @Modifier2 varchar(4),
    @Modifier3 varchar(4),
    @Modifier4 varchar(4),
    @CurrentStatus varchar(16),
    @Diag1 varchar(20),
    @Diag2 varchar(20),
    @Diag3 varchar(20),
    @Diag4 varchar(20),
    @Diag5 varchar(20),
    @Diag6 varchar(20),
    @Diag7 varchar(20),
    @Diag8 varchar(20),
    @AuthorizationNumber varchar(60),
    @RenderingID int,
    @SupervisingID int,
    @ApprovedAmount decimal(17,2),
    @PatientPaid decimal(17,2),
    @InsurancePaid decimal(17,2),
     @userID int
AS
BEGIN

UPDATE [dbo].[Charge]
   SET [Amount] = @Amount
      ,[ApprovedAmount] = @ApprovedAmount
      ,[CurrentStatus] = @CurrentStatus
      ,[RecordStatus] = @RecordStatus
      ,[TimeStamp] = getdate()
      ,[LastUser] = @userID
      ,[GuarantorReceipts] = @PatientPaid
      ,[InsuranceReceipts] = @InsurancePaid
      ,[pro2modified] = getdate()
 WHERE ChargeSID=@ChargeSID

UPDATE [dbo].[ProcedureEvent]
   SET [ProcedureCode] = @ProcedureCode
      ,[StaffID] = @RenderingID
      ,[SupervisingStaffID] = @SupervisingID
      ,[Units] = @Units
      ,[FromServiceDate] = @FromServiceDate
      ,[ToServiceDate] = @ToServiceDate
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ChargeSID=@ChargeSID

 Declare @ProcedureEventSID int 
 select @ProcedureEventSID=ProcedureEventSID from ProcedureEvent where ChargeSID=@ChargeSID

if exists (select Modifier from ProcedureEventModifier where ProcedureEventSID=@ProcedureEventSID and [Order]=1)
Begin
INSERT INTO [dbo].[ProcedureEventModifier]
           ([prrowid],[ProcedureEventSID],[Order],[Modifier],[TimeStamp],[LastUser],[CreateStamp]
           ,[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventModifier'),@ProcedureEventSID,1,@Modifier1,GETDATE(),@userID,GETDATE()
           ,@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventModifier]
   SET [Modifier] = @Modifier1
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=1
 
 end

 if exists (select Modifier from ProcedureEventModifier where ProcedureEventSID=@ProcedureEventSID and [Order]=2)
Begin
INSERT INTO [dbo].[ProcedureEventModifier]
           ([prrowid],[ProcedureEventSID],[Order],[Modifier],[TimeStamp],[LastUser],[CreateStamp]
           ,[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventModifier'),@ProcedureEventSID,2,@Modifier2,GETDATE(),@userID,GETDATE()
           ,@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventModifier]
   SET [Modifier] = @Modifier2
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=2
 
 end

 if exists (select Modifier from ProcedureEventModifier where ProcedureEventSID=@ProcedureEventSID and [Order]=3)
Begin
INSERT INTO [dbo].[ProcedureEventModifier]
           ([prrowid],[ProcedureEventSID],[Order],[Modifier],[TimeStamp],[LastUser],[CreateStamp]
           ,[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventModifier'),@ProcedureEventSID,3,@Modifier3,GETDATE(),@userID,GETDATE()
           ,@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventModifier]
   SET [Modifier] = @Modifier3
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=3
 
 end

 if exists (select Modifier from ProcedureEventModifier where ProcedureEventSID=@ProcedureEventSID and [Order]=4)
Begin
INSERT INTO [dbo].[ProcedureEventModifier]
           ([prrowid],[ProcedureEventSID],[Order],[Modifier],[TimeStamp],[LastUser],[CreateStamp]
           ,[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventModifier'),@ProcedureEventSID,4,@Modifier4,GETDATE(),@userID,GETDATE()
           ,@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventModifier]
   SET [Modifier] = @Modifier4
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=4
 
 end

 if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=1)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag1,1,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag1
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=1
 end

  if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=2)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag2,2,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag2
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=2
 end

   if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=3)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag3,3,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag3
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=3
 end
   if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=4)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag4,4,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag4
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=4
 end
   if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=5)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag5,5,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag4
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=5
 end
   if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=6)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag6,6,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag6
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=6
 end
   if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=7)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag7,7,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag7
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=7
 end
   if exists (select DiagnosisCode from ProcedureEventDiag where ProcedureEventSID=@ProcedureEventSID and [Order]=8)
Begin
INSERT INTO [dbo].[ProcedureEventDiag]
           ([prrowid],[ProcedureEventSID],[DiagnosisCode],[Order],[TimeStamp],[LastUser]
           ,[CreateStamp],[CreateUser],[Pro2SrcPDB],[pro2created],[pro2modified])
     VALUES
           (dbo.FuncGetMAXprrowid('ProcedureEventDiag'),@ProcedureEventSID,@Diag8,8,GETDATE(),@userID
           ,GETDATE(),@userID,'medman',GETDATE(),GETDATE())
end
else
begin
UPDATE [dbo].[ProcedureEventDiag]
   SET [DiagnosisCode] = @Diag8
      ,[TimeStamp] = GETDATE()
      ,[LastUser] = @userID
      ,[pro2modified] = GETDATE()
 WHERE ProcedureEventSID=@ProcedureEventSID and [Order]=8
 end

 update Ailment set AuthorizationNumber =@AuthorizationNumber where AilmentSID = (select top 1 AilmentSID from Claim
 inner join ClaimCharge on Claim.ClaimSID = ClaimCharge.ClaimSID where ClaimCharge.ChargeSID=@ChargeSID
 )

END