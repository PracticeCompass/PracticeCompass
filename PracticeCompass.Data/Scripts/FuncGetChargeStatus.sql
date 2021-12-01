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
RETURNS @chargeStatus Table ([ChargeSID] Int , [SourceID] Int , [Amount] Decimal , [CoverageOrder] Int )
AS
BEGIN
		Insert Into @chargeStatus select ChargeActivity.ChargeSID,SourceID,Amount,CoverageOrder from 
		  ClaimCharge inner join ChargeActivity on ClaimCharge.ChargeSID = ChargeActivity.ChargeSID
		  inner join PlanClaim on ClaimCharge.ClaimSID = PlanClaim.ClaimSID and ChargeActivity.SourceID = PlanID
		  where SourceType ='I' and ActivityType = 'PMT' and ClaimCharge.ClaimSID = @calimID 

		  	RETURN 
	-- Return the result of the function

END
