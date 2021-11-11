USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimDetailsUpdate]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Update Claim Details
-- exec [uspClaimDetailsUpdate] 
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspClaimDetailsUpdate] 
	-- Add the parameters for the stored procedure here
     @ClaimSID int,
	 @ClaimNumber varchar(40),
	 @PracticeID int,
     @OriginalCRN int,
     @AccidentRelated varchar(2),
     @PrimaryStatus varchar(18),
     @PrimaryBilledDate datetime,
     @SeconadryStatus varchar(18),
     @SeconadryBilledDate datetime,
     @TertiaryStatus varchar(18),
     @TertiaryBilledDate datetime,
     @userID int
AS
BEGIN

UPDATE [dbo].[Claim]
   SET PracticeID = @PracticeID
      ,[ClaimNumber] = @ClaimNumber
      ,[TimeStamp] = Getdate()
      ,[LastUser] = @userID
      ,[ParentClaimSID] = @OriginalCRN
      ,[pro2modified] = Getdate()
 WHERE ClaimSID=@ClaimSID

 update PlanClaim set BilledDate = @PrimaryBilledDate , CurrentStatus = @PrimaryStatus
                     , [TimeStamp]=getdate(),LastUser=@userID, pro2modified=GETDATE()
                 where @ClaimSID=@ClaimSID and CoverageOrder=1

update PlanClaim set BilledDate = @SeconadryBilledDate , CurrentStatus = @SeconadryStatus
    , [TimeStamp]=getdate(),LastUser=@userID, pro2modified=GETDATE()
where @ClaimSID=@ClaimSID and CoverageOrder=2

update PlanClaim set BilledDate = @TertiaryBilledDate , CurrentStatus = @TertiaryStatus
    , [TimeStamp]=getdate(),LastUser=@userID , pro2modified=GETDATE()
where @ClaimSID=@ClaimSID and CoverageOrder=3


update Ailment set AccidentRelated=@AccidentRelated where AilmentSID = (select AilmentSID from Claim where ClaimSID=@ClaimSID)

END

