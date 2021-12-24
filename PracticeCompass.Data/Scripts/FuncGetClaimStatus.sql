USE [Medman]

GO
/****** Object:  UserDefinedFunction [dbo].[FuncGetClaimStatus]    Script Date: 12/01/2021 5:15:20 AM ******/
--Select * from FuncGetClaimStatus(908960)
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create or ALTER     FUNCTION [dbo].[FuncGetClaimStatus]
(
	@calimID int
)
RETURNS @ClaimStatus Table ([Transmitted] Int , [Rejected] varchar(max) ,[Denied] varchar(max), [CoverageOrder] INT , [ClaimNumber] VARCHAR(100),[SatisfiedDate] DATETIME ,
							[Code] VARCHAR(100) , [PlanName] VARCHAR(MAX) , [FromServiceDate] DATETIME,[ProcedureCode] VARCHAR(100),[ChargeSID] int )
AS
BEGIN

	Insert Into @ClaimStatus select * from 
		(
		SELECT
		CASE WHEN (
			SELECT COUNT(*)
			FROM medman.dbo.BatchRun BR WITH(NOLOCK)
			INNER JOIN medman.dbo.BatchRunClaim BRC WITH(NOLOCK) ON
					BRC.PracticeID = BR.PracticeID
					AND BRC.BatchCode = BR.BatchCode
					AND BRC.RunNumber = BR.RunNumber
					AND BRC.BatchCount = BR.BatchCount
					AND BRC.ClaimSID=CLM.ClaimSID
					AND BRC.PlanID=PCM.PlanID
		) > 0 THEN 1 ELSE 0 END Transmitted,
		(SELECT STRING_AGG(PCS.ErrorMessage, CHAR(10)+CHAR(13))
			FROM medman.dbo.PlanClaimStatus PCS WITH(NOLOCK)
			WHERE
				PCS.ClaimSID=CLM.ClaimSID AND 
				PCS.PlanID=PCM.PlanID AND
				(PCS.StatusCategory IN ('A3','A6' ,'A7', 'A8') OR PCS.ErrorRejectReason IS NOT NULL)
		) Rejected,
		(
			SELECT STRING_AGG(AR.AdjustmentReason, CHAR(10)+CHAR(13))
			FROM medman.dbo.PlanClaimChargeRemitAdj PCCRA WITH(NOLOCK)
			LEFT OUTER JOIN Reports.dbo.AdjustmentReason AR WITH(NOLOCK) ON AR.AdjustmentCode=PCCRA.AdjustmentReasonCode
			WHERE
				PCCRA.ClaimSID=CLM.ClaimSID AND 
				PCCRA.PlanID=PCM.PlanID AND
				PCCRA.ClaimAdjustmentGroupCode+PCCRA.AdjustmentReasonCode IN(
				'CO252','PI252','CO16','PI50','OA16','CO50','CO97','OA97','PR26','OAB7','OA242','PR242','OA183','OA18','CO24','197','PR198','OA197','CO197','PR197','OA15','PI204','PR97','OA4','OA47','PR27','OA198',
				'CO18','N706','OA109','CO107','CO206','CO29','PR227','CO236','CO4','PR204','OA100')
		) Denied,
		PCM.CoverageOrder,CLM.ClaimNumber,CLM.SatisfiedDate,PLN.Code,PLN.SortName PlanName,PE.FromServiceDate,PE.ProcedureCode,PE.ChargeSID
	FROM medman.dbo.Claim CLM WITH(NOLOCK)
		INNER JOIN medman.dbo.ClaimCharge CC WITH(NOLOCK) ON CC.ClaimSID=CLM.ClaimSID
		INNER JOIN medman.dbo.PlanClaim PCM WITH(NOLOCK) ON PCM.ClaimSID=CLM.ClaimSID
		INNER JOIN medman.dbo.[Plan] PLN WITH(NOLOCK) ON PLN.PlanID=PCM.PlanID
		INNER JOIN medman.dbo.ProcedureEvent PE WITH(NOLOCK) ON PE.ChargeSID=CC.ChargeSID

	WHERE		PE.Voided='N' and CLM.ClaimSID = @calimID ) As ClaimStatus

	Return
	-- Return the result of the function
END
