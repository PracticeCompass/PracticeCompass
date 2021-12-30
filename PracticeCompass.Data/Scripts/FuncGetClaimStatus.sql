USE [Medman]
GO
/****** Object:  UserDefinedFunction [dbo].[FuncNextApptGet]    Script Date: 12/30/2021 2:09:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Select  dbo.FuncClaimRejectionStatus(58094,4270) as status

Create or ALTER   FUNCTION [dbo].[FuncGetClaimStatus]
(
	@ClaimSID int,
	@PlanSID int
)
RETURNS varchar(max)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @Status varchar(max),@RejectStatus varchar(max),@DeniedStatus varchar(max),@lastStatus int,@MaxRemit int

	Select @lastStatus = Max(StatusCount) from Medman.dbo.PlanClaimStatus where ClaimSID = @ClaimSID  and PlanID = @PlanSID

	-- Add the T-SQL statements to compute the return value here
		 
		SELECT  Top 1 @RejectStatus = 'Rejected$$'+   PCS.ErrorMessage
		FROM medman.dbo.PlanClaim PCM 
		INNER JOIN medman.dbo.ClaimCharge CC WITH(NOLOCK) ON CC.ClaimSID=PCM.ClaimSID
		INNER JOIN medman.dbo.ProcedureEvent PE WITH(NOLOCK) ON PE.ChargeSID=CC.ChargeSID
		INNER JOIN Medman.dbo.PlanClaimStatus PCS WITH(NOLOCK) ON PCS.ClaimSID=PCM.ClaimSID AND 
		PCS.PlanID=PCM.PlanID AND (PCS.StatusCategory IN ('A3','A6' ,'A7', 'A8','P3') OR PCS.ErrorRejectReason IS NOT NULL)
	WHERE		
	PE.Voided='N' and PCM.ClaimSID = @ClaimSID  and PCM.PlanID = @PlanSID  and PCS.StatusCount = @lastStatus

	Select @MaxRemit  = Max(RemitCount) from Medman.dbo.PlanClaimChargeRemit where ClaimSID = @ClaimSID  and PlanID = @PlanSID

	SELECT Top 1 @DeniedStatus = 'Denied$$'+ AR.AdjustmentReason
			FROM medman.dbo.PlanClaim PCM			 
		INNER JOIN medman.dbo.ClaimCharge CC WITH(NOLOCK) ON CC.ClaimSID=PCM.ClaimSID
		INNER JOIN medman.dbo.ProcedureEvent PE WITH(NOLOCK) ON PE.ChargeSID=CC.ChargeSID
		LEFT OUTER JOIN medman.dbo.PlanClaimChargeRemitAdj PCCRA WITH(NOLOCK) on PCCRA.ClaimSID=PCM.ClaimSID AND PCCRA.PlanID=PCM.PlanID AND
				PCCRA.ClaimAdjustmentGroupCode+PCCRA.AdjustmentReasonCode IN(
				'CO252','PI252','CO16','PI50','OA16','CO50','CO97','OA97','PR26','OAB7','OA242','PR242','OA183','OA18','CO24','197','PR198','OA197','CO197','PR197','OA15','PI204','PR97',
				'OA4','OA47','PR27','OA198','CO18','N706','OA109','CO107','CO206','CO29','PR227','CO236','CO4','PR204','OA100')
		LEFT OUTER JOIN Reports.dbo.AdjustmentReason AR WITH(NOLOCK) ON AR.AdjustmentCode=PCCRA.AdjustmentReasonCode  
		
	WHERE		
	PE.Voided='N' and PCM.ClaimSID = @ClaimSID  and PCM.PlanID = @PlanSID  and RemitCount = @MaxRemit
	-- Return the result of the function
	If @RejectStatus is not null 
		begin
		set @Status = @RejectStatus
		end 
	else
		begin
		set @Status = @DeniedStatus
		end 
	RETURN @Status 

END
