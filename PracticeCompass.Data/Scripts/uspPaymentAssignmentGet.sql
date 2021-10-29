USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPaymentAssignmentGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Payment Assignment Grid Data
-- exec [uspPaymentAssignmentGet] @PaymentSID =431073 
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspPaymentAssignmentGet] 
	-- Add the parameters for the stored procedure here
    @PaymentSID int 
AS
BEGIN

Select PaymentSID,ChargeSID,ActivityCount,PaymentAssignment.AccountSID , Entity.SortName  , CONVERT(varchar,PostDate,101) as PostDate,Amount,PatientBilled,PatientStatement
from PaymentAssignment inner join Account on PaymentAssignment.AccountSID = Account.AccountSID
inner join Entity on Account.GuarantorID = Entity.EntitySID
where PaymentSID=@PaymentSID order by PaymentAssignment.ActivityCount

END
