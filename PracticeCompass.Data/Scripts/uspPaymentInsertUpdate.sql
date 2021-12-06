USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspInsurancePaymentGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Insurance Payment Grid Data
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspPaymentInsertUpdate] 
	-- Add the parameters for the stored procedure here
@prrowid varchar(36),@PaymentSID int,@PracticeID int,@PostDate datetime,@Source varchar(2),@PayorID int,@Class varchar(12),@Amount decimal(18,2)
,@Method varchar(2),@CreditCard varchar(4),@AuthorizationCode varchar(29),@Voucher varchar(69)
,@LastUser int,@CreateUser int,@CreateMethod varchar(2),@CreateStamp varchar(50),@TimeStamp varchar(50)

AS
BEGIN

if @PaymentSID=0
BEGIN
SELECT @PaymentSID = MAX(PaymentSID) from [Payment] 
INSERT INTO [dbo].[Payment]
           ([prrowid],[PaymentSID],[PracticeID],[PostDate],[Source],[PayorID],[Class],[Amount],[Method],[FullyApplied],[CreditCard],[AuthorizationCode]
           ,[Voucher],[RecordStatus],[TimeStamp],[LastUser],[CreateStamp],[CreateUser],[CreateMethod],[Pro2SrcPDB]
           ,[pro2created],[pro2modified])
     VALUES
           (@prrowid,@PaymentSID + 1 ,@PracticeID,@PostDate,@Source,@PayorID,@Class,@Amount,@Method,'N',@CreditCard,@AuthorizationCode
           ,@Voucher,'A',@TimeStamp,@LastUser,@CreateStamp,@CreateUser,@CreateMethod,'medman'
           ,GETDATE(),GETDATE())

END
ELSE
BEGIN
		   UPDATE [dbo].[Payment]
   SET [PracticeID] = @PracticeID
      ,[PostDate] = @PostDate
      ,[PayorID] = @PayorID
      ,[Class] = @Class
      ,[Amount] = @Amount
      ,[Method] = @Method
      ,[CreditCard] = @CreditCard
      ,[AuthorizationCode] = @AuthorizationCode
      ,[Voucher] = @Voucher
      ,[TimeStamp] = @TimeStamp
      ,[LastUser] = @LastUser
      ,[CreateMethod] = @CreateMethod
      ,[pro2modified] = GETDATE()
 WHERE paymentSID = @PaymentSID
END

 END


