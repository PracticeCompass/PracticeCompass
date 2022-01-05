USE [medman]
GO

/****** Object:  Table [dbo].[ClaimStatus]    Script Date: 11/18/2021 12:58:30 AM ******/
--IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ClaimStatus]') AND type in (N'U'))
----DROP TABLE [dbo].[ClaimStatus]
--GO

/****** Object:  Table [dbo].[ClaimStatus]    Script Date: 11/18/2021 1:02:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF Not EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ClaimStatus]') AND type in (N'U'))
Begin
CREATE TABLE [dbo].[ClaimStatus](
	[ClaimStatusSID] [int] IDENTITY(1,1) NOT NULL,
	[ClaimSID] [int]  NOT NULL,
	[ClaimNumber] [varchar](50) ,
	[Status] [varchar](50) NOT NULL,
	[PlanID] [int] NOT NULL,
	[CoverageOrder] [int] NOT NULL,
	[PolicyNumber] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ClaimStatus] PRIMARY KEY CLUSTERED 
(
	[ClaimStatusSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
SET IDENTITY_INSERT [dbo].[ClaimStatus] ON 
End
--- Create Index
CREATE NONCLUSTERED INDEX [Claim##ClaimStatus] ON [dbo].[ClaimStatus]
(
	[ClaimSID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [Plan##ClaimStatus] ON [dbo].[ClaimStatus]
(
	[PlanID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [Policy##ClaimStatus] ON [dbo].[ClaimStatus]
(
	[PolicyNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [Coverage##ClaimStatus] ON [dbo].[ClaimStatus]
(
	[CoverageOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [ClaimStatus##PlanPolicyClaim] ON [dbo].[ClaimStatus]
(
	[PlanID] ASC,
	[PolicyNumber] ASC,
	[ClaimSID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [ClaimStatus##PlanPolicyCovrageClaim] ON [dbo].[ClaimStatus]
(
	[PlanID] ASC,
	[PolicyNumber] ASC,
	[CoverageOrder] ASC,
	[ClaimSID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [ClaimStatus##PlanPolicyCovrageClaimStatus] ON [dbo].[ClaimStatus]
(
	[PlanID] ASC,
	[PolicyNumber] ASC,
	[CoverageOrder] ASC,
	[Status] ASC,
	[ClaimSID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
----------------------------------------------------------------------------------------
--USE [Medman]
--GO
--/****** Object:  UserDefinedFunction [dbo].[FuncNextApptGet]    Script Date: 12/30/2021 2:09:34 AM ******/
--SET ANSI_NULLS ON
--GO
--SET QUOTED_IDENTIFIER ON
--GO

----Select  dbo.FuncClaimRejectionStatus(58094,4270) as status

--Create or ALTER   FUNCTION [dbo].[FuncTempData]
--(
--	@ClaimSID int,
--	@PlanSID int,
--	@PolicyNumber varchar(50)
--)
--RETURNS varchar(max)
--AS
--BEGIN
--	-- Declare the return variable here
--	DECLARE @Status varchar(max),@RejectStatus varchar(max),@DeniedStatus varchar(max),@lastStatus int,@MaxRemit int

--	Select @lastStatus = Max(StatusCount) from Medman.dbo.PlanClaimStatus where ClaimSID = @ClaimSID  and PlanID = @PlanSID and PolicyNumber = @PolicyNumber

--	-- Add the T-SQL statements to compute the return value here
		 
--		SELECT  Top 1 @RejectStatus = 'Rejected'
--		FROM medman.dbo.PlanClaim PCM 
--		INNER JOIN medman.dbo.ClaimCharge CC WITH(NOLOCK) ON CC.ClaimSID=PCM.ClaimSID
--		INNER JOIN medman.dbo.ProcedureEvent PE WITH(NOLOCK) ON PE.ChargeSID=CC.ChargeSID
--		INNER JOIN Medman.dbo.PlanClaimStatus PCS WITH(NOLOCK) ON PCS.ClaimSID=PCM.ClaimSID AND 
--		PCS.PlanID=PCM.PlanID AND (PCS.StatusCategory IN ('A3','A6' ,'A7', 'A8','P3') OR PCS.ErrorRejectReason IS NOT NULL)
--	WHERE		
--	PE.Voided='N' and PCM.ClaimSID = @ClaimSID  and PCM.PlanID = @PlanSID  and PCS.StatusCount = @lastStatus and PCS.PolicyNumber = @PolicyNumber

--	Select @MaxRemit  = Max(RemitCount) from Medman.dbo.PlanClaimChargeRemit where ClaimSID = @ClaimSID  and PlanID = @PlanSID and PolicyNumber = @PolicyNumber

--	SELECT Top 1 @DeniedStatus = 'Denied'
--			FROM medman.dbo.PlanClaim PCM			 
--		INNER JOIN medman.dbo.ClaimCharge CC WITH(NOLOCK) ON CC.ClaimSID=PCM.ClaimSID
--		INNER JOIN medman.dbo.ProcedureEvent PE WITH(NOLOCK) ON PE.ChargeSID=CC.ChargeSID
--		LEFT OUTER JOIN medman.dbo.PlanClaimChargeRemitAdj PCCRA WITH(NOLOCK) on PCCRA.ClaimSID=PCM.ClaimSID AND PCCRA.PlanID=PCM.PlanID AND
--				PCCRA.ClaimAdjustmentGroupCode+PCCRA.AdjustmentReasonCode IN(
--				'CO252','PI252','CO16','PI50','OA16','CO50','CO97','OA97','PR26','OAB7','OA242','PR242','OA183','OA18','CO24','197','PR198','OA197','CO197','PR197','OA15','PI204','PR97',
--				'OA4','OA47','PR27','OA198','CO18','N706','OA109','CO107','CO206','CO29','PR227','CO236','CO4','PR204','OA100')
--		LEFT OUTER JOIN Reports.dbo.AdjustmentReason AR WITH(NOLOCK) ON AR.AdjustmentCode=PCCRA.AdjustmentReasonCode  
		
--	WHERE		
--	PE.Voided='N' and PCM.ClaimSID = @ClaimSID  and PCM.PlanID = @PlanSID  and RemitCount = @MaxRemit and PCM.PolicyNumber = @PolicyNumber
--	-- Return the result of the function
--	If @RejectStatus is not null 
--		begin
--		set @Status = @RejectStatus
--		end 
--	else
--		begin
--		set @Status = @DeniedStatus
--		end 
--	RETURN @Status 

--END

------------------------------------------------------------------------------------
--DECLARE @ClaimSID int
--DECLARE @PlanID int
--DECLARE @CoverageOrder int
--DECLARE @PolicyNumber VARCHAR(50) 
--DECLARE @Status VARCHAR(50) 

--DECLARE db_cursor CURSOR FOR 
--SELECT ClaimSID,PlanID,PolicyNumber,CoverageOrder
--FROM PlanClaim 

--OPEN db_cursor  
--FETCH NEXT FROM db_cursor INTO @ClaimSID, @PlanID,@PolicyNumber,@CoverageOrder

--WHILE @@FETCH_STATUS = 0  
--BEGIN  
--Select @Status = [dbo].[FuncTempData](@ClaimSID, @PlanID,@PolicyNumber)
--if @Status = 'Rejected' or @Status = 'Denied' begin
--INSERT INTO [dbo].[ClaimStatus]
--           ([ClaimSID]
--           ,[Status]
--           ,[PlanID]
--           ,[PolicyNumber],[CoverageOrder])
--     VALUES
--           (@ClaimSID
--           ,@Status
--           ,@PlanID
--           ,@PolicyNumber,@CoverageOrder)
--		   end
--      FETCH NEXT FROM db_cursor INTO @ClaimSID, @PlanID,@PolicyNumber ,@CoverageOrder
--END 

--CLOSE db_cursor  
--DEALLOCATE db_cursor 