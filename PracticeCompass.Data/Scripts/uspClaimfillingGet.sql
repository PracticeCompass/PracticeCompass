USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimfillingGet]    Script Date: 8/6/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Claim Filling Grid Data
-- exec [uspClaimfillingGet] 594018
-- =============================================

Create or Alter   PROCEDURE [dbo].[uspClaimfillingGet] 
	-- Add the parameters for the stored procedure here
    @ClaimSID int 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

select case when coverageorder=1 then 'Primary'
            when coverageorder=2 then 'Secondary'
			when coverageorder=3 then 'Tertiary'
			else '' END as coverageorder ,CurrentStatus, TotalClaimAmount , PlanID , adj.amount as adj_amount , n.amount as PMT_amount,
			PlanClaim.CreateStamp , PlanClaim.pro2created , adj.adj_first,adj.adj_last,PMT_first,PMT_last
			from PlanClaim 
			left outer join 
			(select SourceID, ActivityType , sum(amount)*-1 as amount,  max(pro2created) as adj_last , min(pro2created) as adj_first  from ChargeActivity  where ChargeSID in  (select Charge.ChargeSID  from ClaimCharge 
			inner join Charge on charge.ChargeSID = ClaimCharge.ChargeSID where ClaimSID=@ClaimSID
) and ActivityType='ADJ'  group by SourceID , ActivityType having sum(amount) < 0) as adj  on adj.SourceID = PlanClaim.PlanID

left outer join

			(select SourceID, ActivityType , sum(amount)*-1 as amount , max(pro2created) as PMT_last , min(pro2created) PMT_first from ChargeActivity where ChargeSID in  (select Charge.ChargeSID  from ClaimCharge 
			inner join Charge on charge.ChargeSID = ClaimCharge.ChargeSID where ClaimSID=@ClaimSID
) and ActivityType='PMT'  group by SourceID , ActivityType having sum(amount) < 0) n on n.SourceID = PlanClaim.PlanID

where ClaimSID=@ClaimSID order by coverageorder

END