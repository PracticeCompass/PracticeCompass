USE [Medman]
GO
/****** Object:  UserDefinedFunction [dbo].[FuncClaimDestGet]    Script Date: 12/01/2021 5:15:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create or ALTER     FUNCTION [dbo].[FuncGetChargeStatus]
(
	@calimID int
)
RETURNS @chargeStatus Table ([ClaimSID] Int ,[ChargeSID] Int , [SourceID] Int , [Amount] Decimal , [CurrentStatus] Varchar(50) )
AS
BEGIN
		Insert Into @chargeStatus select ClaimSID,ChargeActivity.ChargeSID,SourceID,Amount,CurrentStatus from 
		  ClaimCharge inner join ChargeActivity on ClaimCharge.ChargeSID = ChargeActivity.ChargeSID where 
		  SourceType ='I' and ActivityType = 'PMT' and ClaimCharge.ClaimSID = @calimID 

		  	RETURN 
	-- Return the result of the function

END
