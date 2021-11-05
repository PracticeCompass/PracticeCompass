USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspERAPaymentHeaderGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Insurance Payment Grid Data
-- exec [uspERAPaymentHeaderGet] @PracticeID =0 , @Amount=0,@CheckNumber='' , @IsPosted='r' , @AmountType=''
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspERAPaymentHeaderGet] 
	-- Add the parameters for the stored procedure here
@PracticeID int , @IsPosted varchar(1), 
@Amount float,
@CheckNumber varchar(50),
@AmountType varchar(20),
@SenderAccount varchar(20),
@ReceiverAccount varchar(20),
@PostDate varchar(20),
@Days  int
AS
BEGIN

Declare @CheckIssueDatefrom datetime, @CheckIssueDateto datetime
set @CheckIssueDatefrom = @PostDate+@Days
set @CheckIssueDateto = @PostDate-@Days



SELECT 
	[ERSPaymentHeader].PracticeID,
       [ERSPaymentHeader].ERSPaymentSID
	   ,[CheckTraceNbr]
      ,[TransHandlingCode]
      ,[TotalActualProviderPaymentAmt]
      ,[PaymentMethodCode]
      ,[PaymentFormatCode]
      ,[SenderBankAcctNbr]
      ,[RemitPayerIdent]
      ,[ReceiverAcctNbr]
	  ,CONVERT(varchar,CheckIssueDate,101) as CheckIssueDate
      ,[PayerNameText]
	  ,Practice.SortName as PracticeName
	  ,case when Payment.PaymentSID is null then 0
	        else 1 ENd as PaymentFound
  FROM [dbo].[ERSPaymentHeader] inner join Practice on Practice.PracticeID = [ERSPaymentHeader].PracticeID
        left outer join Payment on payment.Voucher = [ERSPaymentHeader].CheckTraceNbr
		where
		((@IsPosted = '' or [ERSPaymentHeader].RecordStatus=@IsPosted)and 
		(@PracticeID=0 or  [ERSPaymentHeader].PracticeID= @PracticeID) and
		(@CheckNumber='' or [ERSPaymentHeader].CheckTraceNbr=@CheckNumber )and
		(@Amount=0 or [ERSPaymentHeader].TotalActualProviderPaymentAmt = @Amount )) and
		(@SenderAccount='' or ERSPaymentHeader.SenderBankAcctNbr = @SenderAccount) and 
		(@ReceiverAccount='' or ERSPaymentHeader.ReceiverAcctNbr= @ReceiverAccount) 
		--(@PostDate='' or CheckIssueDate between @CheckIssueDatefrom and @CheckIssueDateto )
		Order by [ERSPaymentHeader].ERSPaymentSID

		

END


