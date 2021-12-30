USE [Medman]
GO
/****** Object:  UserDefinedFunction [dbo].[FuncGetClaimPastDue]    Script Date: 12/30/2021 4:44:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


Create or ALTER   FUNCTION [dbo].[FuncGetClaimPastDue]
(
	@ClaimSID int
)
RETURNS int
AS
BEGIN
	-- Declare the return variable here
	DECLARE @PastDue int

	-- Add the T-SQL statements to compute the return value here
	select  @PastDue = DATEDIFF(day, max(AdjudicationDate), GETDATE() ) from PlanClaimChargeRemit
			where ClaimSID = @ClaimSID 

	-- Return the result of the function
	RETURN @PastDue

END
