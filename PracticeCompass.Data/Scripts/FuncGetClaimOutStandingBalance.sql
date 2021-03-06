USE [Medman]
GO
/****** Object:  UserDefinedFunction [dbo].[FuncClaimDestGet]    Script Date: 12/01/2021 5:15:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



create or ALTER     FUNCTION [dbo].[FuncGetClaimOutStandingBalance]
(
	@calimID int,
	@IncludeVoidedClaims int
)
RETURNS decimal
AS
BEGIN

	-- Declare the return variable here
	DECLARE @OutStandingBalance decimal


		   select @OutStandingBalance = (SUM(Charge.Amount) - (SUM(Charge.InsuranceReceipts) + SUM(Charge.GuarantorReceipts) + SUM(Charge.Adjustments)))
		   from ClaimCharge inner join Charge on Charge.ChargeSID = ClaimCharge.ChargeSID
			where ClaimSID=@calimID 
			and (@IncludeVoidedClaims = 1 or  charge.CurrentStatus != 'V')

	-- Return the result of the function
	RETURN @OutStandingBalance

END
