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
RETURNS @chargeStatus Table ([ChargeSID] Int , [Plan1] Decimal(17,2) , [Plan2] Decimal(17,2),[Patient] Decimal(17,2) )
AS
BEGIN
		Insert Into @chargeStatus 	select *
from 
(
  select ChargeActivity.ChargeSID, CoverageOrder, Amount
  from ClaimCharge inner join ChargeActivity on ClaimCharge.ChargeSID = ChargeActivity.ChargeSID
		  inner join PlanClaim on ClaimCharge.ClaimSID = PlanClaim.ClaimSID and ChargeActivity.SourceID = PlanID
		  where SourceType ='I' and ActivityType = 'PMT' and ClaimCharge.ClaimSID = @calimID 
		  union all 
		  select ChargeActivity.ChargeSID, 99 as CoverageOrder , Amount
  from ClaimCharge inner join ChargeActivity on ClaimCharge.ChargeSID = ChargeActivity.ChargeSID
		  where SourceType ='G' and ActivityType = 'PMT' and ClaimCharge.ClaimSID = @calimID 
) src
pivot
(
  sum(Amount)
  for CoverageOrder in ([1], [2],[99])
) piv;



		  	RETURN 
	-- Return the result of the function
END
