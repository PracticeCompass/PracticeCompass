USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimSubmissionHistoryGet]    Script Date: 10/09/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Claim Submission History on Claim Grid select
-- exec uspClaimSubmissionHistoryGet @claimsid =268458
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspClaimSubmissionHistoryGet] 
	-- Add the parameters for the stored procedure here
    @ClaimSID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   select convert(varchar,PlanClaimStatus.PlanID,10) + convert(varchar,ClaimSID,10) + convert(varchar,StatusCount,10)  as GridId ,PlanClaimStatus.PlanID,[Plan].SortName as PlanName, ClaimSID,ReportType,StatusCategory,StatusCount,CCStatusCode.Description as StatusCategory_,
   StatusSource, StatusSource.Description as StatusSource_ ,CONVERT(varchar,CONVERT(Date,SUBSTRING(StatusDateStamp, 1, charindex('-',StatusDateStamp)-1),101),101) as StatusDate,
   ClaimStatus, Convert(varchar(50),AmountPaid ,1) as AmountPaid ,PayerClaimID,ErrorMessage 
   from PlanClaimStatus 
   inner join [Plan] on PlanClaimStatus.PlanID = [Plan].PlanID
   left outer join CCStatusCode on PlanClaimStatus.StatusCategory = CCStatusCode.StatusCode and CCStatusCode.StatusType = 'P'
   left outer join CCStatusCode as StatusSource on PlanClaimStatus.StatusSource = StatusSource.StatusCode and StatusSource.StatusType = 'C'
   where ClaimSID = @ClaimSID 
   order by PlanClaimStatus.PlanID, StatusCount
END
