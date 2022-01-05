USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimGridGetByStatus]    Script Date: 09/05/2021 9:36:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--exec uspClaimGridGetByStatus @Skip=0,@SortColumn=N'dos',@SortDirection=N'desc',@Rejections=1,@PastDue=0,@Denials=0,@TimelyFilling=0
CREATE OR ALTER PROCEDURE [dbo].[uspClaimGridGetByStatus] 
@Skip int=0,
@SortColumn varchar(50)='',
@SortDirection varchar(50)='',
@Rejections int,
@PastDue int,
@Denials int,
@TimelyFilling int

AS
BEGIN
	SET NOCOUNT ON;

	Declare  @SQL varchar(max),@sortClaimsfilter varchar(max),@ClaimStatus varchar(50)

If @Rejections = 1 
set @ClaimStatus ='''Rejected'''
else if @Denials = 1
set @ClaimStatus ='''Denied'''

		

		set  @sortClaimsfilter= Case @SortColumn
		when 'dos' then 'order by convert(Date,Max(ProcedureEvent.FromServiceDate),101) '+@SortDirection+''
		when 'patientName' then 'order by Person.SortName '+@SortDirection+''
		when 'claimNumber' then 'order by Claim.ClaimNumber '+@SortDirection+''
		when 'totalClaimAmount' then 'order by TotalClaimAmount '+@SortDirection+''
		when 'outStandingBalanace' then 'order by OutStandingBalanace '+@SortDirection+''
		when 'practiceName' then 'order by Practice.SortName '+@SortDirection+''
		when 'providerName' then 'order by Provider.SortName '+@SortDirection+''
		when 'primaryStatus' then 'order by PlanClaimPrimary.CurrentStatus '+@SortDirection+''
		when 'seconadryStatus' then 'order by PlanClaimSeconadry.CurrentStatus '+@SortDirection+''
		when 'tertiaryStatus' then 'order by PlanClaimTertiary.CurrentStatus '+@SortDirection+''
		when 'destination' then 'order by Destination '+@SortDirection+''
		when 'notes' then 'order by Claim.ClaimSID '+@SortDirection+''
		else ''
		end
	
set @SQL= 'select distinct COUNT(*) OVER() as totalCount,Person.PersonID as PatientID,
   convert(varchar,Claim.ClaimSID,10) as GridID,
   Claim.ClaimSID,Claim.ClaimNumber,cast(max(PlanClaim.TotalClaimAmount)as money) as TotalClaimAmount, 
  dbo.FuncGetClaimOutStandingBalance(Claim.ClaimSID,0) AS OutStandingBalanace
,Practice.SortName as practiceName,Practice.PracticeID as PracticeID,Person.SortName as patientName , dbo.FuncClaimDestGet(Claim.ClaimSID) as Destination 
,Provider.SortName as ProviderName , convert(varchar,Max(ProcedureEvent.FromServiceDate),101) as DOS , convert(Date,Max(ProcedureEvent.FromServiceDate),101) as DOSDate ,
PlanClaimPrimary.CurrentStatus as PrimaryStatus ,PlanClaimPrimary.PlanID as Plan1,
PlanClaimSeconadry.CurrentStatus as SeconadryStatus ,PlanClaimSeconadry.PlanID as Plan2,
PlanClaimTertiary.CurrentStatus as TertiaryStatus ,PlanClaimTertiary.PlanID as Plan3,
ClaimStatusPrimary.Status as PrimaryClaimStatus,
ClaimStatusSeconadry.Status as SecondaryClaimStatus,
ClaimStatusTertiary.Status as TertiaryClaimStatus,
DATEDIFF(day, Max(ProcedureEvent.FromServiceDate), GETDATE() ) - 30  as ClaimPastDue
from 
Claim inner join PatientAccount on Claim.PracticeID = PatientAccount.PracticeID and Claim.PatientID = PatientAccount.PatientID and Claim.AccountSID = PatientAccount.AccountSID
inner join PlanClaim on PlanClaim.ClaimSID = Claim.ClaimSID
left outer join Account on PatientAccount.AccountSID = Account.AccountSID
inner join Practice on Practice.PracticeID=PatientAccount.PracticeID
inner join Person on Person.PersonID=PatientAccount.PatientID
inner join ClaimCharge on Claim.ClaimSID = ClaimCharge.ClaimSID
inner join Charge on Charge.ChargeSID = ClaimCharge.ChargeSID
inner join ProcedureEvent on ProcedureEvent.ChargeSID = Charge.ChargeSID 
left outer join Provider on PlanClaim.PerformingProviderID = Provider.ProviderID
left outer join PlanClaim as PlanClaimPrimary on PlanClaimPrimary.ClaimSID = Claim.ClaimSID and PlanClaimPrimary.CoverageOrder=1
left outer join PlanClaim as PlanClaimSeconadry on PlanClaimSeconadry.ClaimSID = Claim.ClaimSID and PlanClaimSeconadry.CoverageOrder=2
left outer join PlanClaim as PlanClaimTertiary on PlanClaimTertiary.ClaimSID = Claim.ClaimSID and PlanClaimTertiary.CoverageOrder=3
left outer join ClaimStatus as ClaimStatusPrimary on Claim.ClaimSID = ClaimStatusPrimary.ClaimSID and ClaimStatusPrimary.PlanID = PlanClaim.PlanID and ClaimStatusPrimary.PolicyNumber= PlanClaim.PolicyNumber and ClaimStatusPrimary.CoverageOrder=1 
left outer join ClaimStatus as ClaimStatusSeconadry on Claim.ClaimSID = ClaimStatusSeconadry.ClaimSID and ClaimStatusSeconadry.PlanID = PlanClaim.PlanID and ClaimStatusSeconadry.PolicyNumber= PlanClaim.PolicyNumber and ClaimStatusSeconadry.CoverageOrder=2 
left outer join ClaimStatus as ClaimStatusTertiary on Claim.ClaimSID = ClaimStatusTertiary.ClaimSID and ClaimStatusTertiary.PlanID = PlanClaim.PlanID and ClaimStatusTertiary.PolicyNumber= PlanClaim.PolicyNumber and ClaimStatusTertiary.CoverageOrder=3 
Where (ClaimStatusPrimary.status = '+@ClaimStatus+' or ClaimStatusSeconadry.status = '+@ClaimStatus+' or ClaimStatusTertiary.status = '+@ClaimStatus+' ) and Claim.LowestRespCoverageOrder != 99 '

set @SQL = @SQL +  ' group by Claim.ClaimSID ,Claim.ClaimNumber, Practice.SortName , Practice.PracticeID, Person.SortName , Provider.SortName, PlanClaimPrimary.CurrentStatus ,PlanClaimSeconadry.CurrentStatus,PlanClaimTertiary.CurrentStatus
,PlanClaimPrimary.PlanID ,PlanClaimSeconadry.PlanID,PlanClaimTertiary.PlanID,Person.PersonID,ClaimStatusPrimary.Status,ClaimStatusSeconadry.Status,ClaimStatusTertiary.Status '+@sortClaimsfilter+ ' OFFSET '+convert(varchar, @Skip,10)+' ROWS FETCH NEXT  '+convert(varchar,500,10)+' ROWS ONLY'
print @SQL
 exec(@SQL)

 

END
