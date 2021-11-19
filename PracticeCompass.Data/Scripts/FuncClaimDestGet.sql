USE [medman]
GO

/****** Object:  UserDefinedFunction [dbo].[FuncClaimDestGet]    Script Date: 8/25/2021 1:51:48 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE OR ALTER   FUNCTION [dbo].[FuncClaimDestGet]
(
	@calimID int
)
RETURNS varchar(50)
AS
BEGIN

	-- Declare the return variable here
	DECLARE @Dest varchar(50)
	--, @Primarystatus varchar(50),
	--       @Secstatus varchar(50) , @Thirdstatus varchar(50), @maxCoverage int


		   select @Dest = case when LowestRespCoverageOrder=1 then 'Primary'
		                       when LowestRespCoverageOrder=2 then 'Secondary'
							   when LowestRespCoverageOrder=3 then 'Tertiary'
							   when LowestRespCoverageOrder=99 then 'Patient'
							   when LowestRespCoverageOrder=0 then '0'
							   when LowestRespCoverageOrder=4 then 'Quaternary'
		                     ELSE  '' END
		   from Claim where ClaimSID=@calimID

	---- Add the T-SQL statements to compute the return value here
	--select  @Primarystatus=CurrentStatus from PlanClaim where ClaimSID = @calimID and CoverageOrder=1
	--select  @Secstatus=CurrentStatus from PlanClaim where ClaimSID = @calimID and CoverageOrder=2
	--select  @Thirdstatus=CurrentStatus from PlanClaim where ClaimSID = @calimID and CoverageOrder=3
	--select @maxCoverage=MAX(CoverageOrder) from PlanClaim  where ClaimSID = @calimID

	--if @Primarystatus != 'BILLED'
	--begin
	--set @Dest = 'Primary'
	--Return @Dest;
	--End
	--if  @Primarystatus ='BILLED' 
	--Begin
	--set @Dest = 'Secondary'
	--End
	--if @Primarystatus ='BILLED' and @maxCoverage=1
	--Begin
	--set @Dest = '' --patient 
	--End

	--if @Secstatus ='BILLED' 
	--Begin
	--set @Dest = 'Tertiary' 
	--End
	--if @Secstatus ='BILLED' and @maxCoverage=2
	--Begin
	--set @Dest = '' -- Patient
	--End
	--if @Secstatus !='BILLED' and @Secstatus is not null
	--Begin
	--set @Dest = 'Secondary' 
	--End

	--if  @Thirdstatus ='BILLED' 
	--Begin
	--set @Dest = '' -- Patient
	--End
	--if @Thirdstatus !='BILLED' and @Thirdstatus is not null
	--Begin
	--set @Dest = 'Secondary' 
	--End


	-- Return the result of the function
	RETURN @Dest

END
GO


