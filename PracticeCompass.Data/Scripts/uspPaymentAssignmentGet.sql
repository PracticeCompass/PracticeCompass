USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPaymentAssignmentGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Payment Assignment Grid Data
-- exec [uspPaymentAssignmentGet] @PaymentSID =637 
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspPaymentAssignmentGet] 
	-- Add the parameters for the stored procedure here
    @PaymentSID int 
AS
BEGIN

Select PaymentSID,PaymentAssignment.ChargeSID,ActivityCount,PaymentAssignment.AccountSID ,Account.AccountNumber,Entity.SortName  , CONVERT(varchar,PaymentAssignment.PostDate,101) as PostDate,
+ '$' +  Convert(varchar(50),cast(PaymentAssignment.Amount as money),1) AS Amount,PaymentAssignment.PatientBilled,PaymentAssignment.PatientStatement,
'$' +  Convert(varchar(50),isnull((Charge.Amount - Charge.Adjustments - Charge.GuarantorReceipts - Charge.InsuranceReceipts),0)) as ChargeBalance
from PaymentAssignment inner join Account on PaymentAssignment.AccountSID = Account.AccountSID
inner join Entity on Account.GuarantorID = Entity.EntitySID
left outer join Charge on PaymentAssignment.ChargeSID = Charge.ChargeSID
where PaymentSID=@PaymentSID order by PaymentAssignment.ActivityCount

END
