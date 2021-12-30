USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimGridGet]    Script Date: 09/05/2021 9:36:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--exec uspClaimGridGet @PatientID=0,@PracticeID=0,@PhysicianID=0,@DOSType=0,@DOSvalue=N'',@PatientClass=N'',@InsuranceType=0,@InsuranceID=0,@BillNumber=N'',@ClaimIcnNumber=N'0',@Age=0,@InsuranceStatus=N'',@CoverageOrder=N'',@TotalClaimAmount=0,@Batch=N'',@GuarantorID=0,@IncludeCompletedClaims=0,@IncludeCashClaims=0,@Skip=0,@SortColumn=N'dos',@SortDirection=N'desc',@IncludeVoidedClaims=0-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspClaimGridGet] 
@PatientID int, 
@PracticeID int, 
@PhysicianID int,
@DOSType int,
@DOSvalue varchar(12),
@PatientClass varchar(12),
@InsuranceType int,
@InsuranceID int,
@BillNumber varchar(40),
@ClaimIcnNumber varchar(40),
@Age int,
@InsuranceStatus varchar(18),
@CoverageOrder varchar(18),
@TotalClaimAmount decimal,
@Batch varchar(50),
@GuarantorID int,
@IncludeCompletedClaims int,
@IncludeCashClaims int,
@IncludeVoidedClaims int,
@Rejections int,
@PastDue int,
@Denials int,
@Skip int=0,
@SortColumn varchar(50)='',
@SortDirection varchar(50)=''

AS
BEGIN
	SET NOCOUNT ON;

	Declare  @SQL varchar(max), @DOSfilter varchar(50) , @insurancefilter varchar(300) , @completedclaimsfilter varchar(300),@sortClaimsfilter varchar(300), @cashclaimsfilter varchar(300),@voidedclaimsfilter varchar(300)

	 	set @DOSfilter=Case @DOSType 
		when 1 then ' and (PlanClaim.FromDate =  '''+@DOSvalue+''' )'
		when 2 then ' and (PlanClaim.FromDate < '''+@DOSvalue+''' )'
		when 3 then ' and (PlanClaim.FromDate > '''+@DOSvalue+''' )'
		else ''
		end


		set @insurancefilter=Case @InsuranceType 
		when 1 then ' and ((PlanClaim.PlanID =  '+convert(varchar, @InsuranceID,10)+') ) ) and (PlanClaim.CoverageOrder = 1))'
		when 2 then ' and ((PlanClaim.PlanID =  '+convert(varchar, @InsuranceID,10)+' ) )) and (PlanClaim.CoverageOrder = 2))'
		when 3 then ' and ((PlanClaim.PlanID =  '+convert(varchar, @InsuranceID,10)+' ) )) and (PlanClaim.CoverageOrder = 3))'
		else ''
		end

		set @completedclaimsfilter=Case @IncludeCompletedClaims
		when 0 then ' and dbo.FuncGetClaimOutStandingBalance(Claim.ClaimSID,@IncludeVoidedClaims) > 0  and Claim.LowestRespCoverageOrder != 99'
		when 1 then ''
		else ''
		end

		set @cashclaimsfilter=Case @IncludeCashClaims
		when 0 then ' and Claim.LowestRespCoverageOrder != 0'
		when 1 then ''
		else ''
		end

		set @voidedclaimsfilter=Case @IncludeVoidedClaims
		when 0 then ' and Min(Charge.RecordStatus) != ''V'''
		when 1 then ''
		else ''
		end

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
	
set @SQL= 'Declare @IncludeVoidedClaims int
set @IncludeVoidedClaims = '+Convert(varchar,@IncludeVoidedClaims)+'
select distinct COUNT(*) OVER() as totalCount,Patient.PatientID as PatientID,
   convert(varchar,Claim.ClaimSID,10) as GridID,
   Claim.ClaimSID,Claim.ClaimNumber,cast(max(PlanClaim.TotalClaimAmount)as money) as TotalClaimAmount, 
  dbo.FuncGetClaimOutStandingBalance(Claim.ClaimSID,@IncludeVoidedClaims) AS OutStandingBalanace
,Practice.SortName as practiceName,Practice.PracticeID as PracticeID,Person.SortName as patientName , dbo.FuncClaimDestGet(Claim.ClaimSID) as Destination 
,Provider.SortName as ProviderName , convert(varchar,Max(ProcedureEvent.FromServiceDate),101) as DOS , convert(Date,Max(ProcedureEvent.FromServiceDate),101) as DOSDate ,
PlanClaimPrimary.CurrentStatus as PrimaryStatus ,PlanClaimPrimary.PlanID as Plan1,
PlanClaimSeconadry.CurrentStatus as SeconadryStatus ,PlanClaimSeconadry.PlanID as Plan2,
PlanClaimTertiary.CurrentStatus as TertiaryStatus ,PlanClaimTertiary.PlanID as Plan3,
dbo.FuncClaimRejectionStatus(Claim.ClaimSID,PlanClaimPrimary.PlanID) as PrimaryClaimStatus,
dbo.FuncClaimRejectionStatus(Claim.ClaimSID,PlanClaimSeconadry.PlanID) as SecondaryClaimStatus,
dbo.FuncClaimRejectionStatus(Claim.ClaimSID,PlanClaimTertiary.PlanID) as TertiaryClaimStatus,
dbo.FuncGetClaimPastDue(Claim.ClaimSID) as ClaimPastDue
from 
Claim inner join PatientAccount on Claim.PracticeID = PatientAccount.PracticeID and Claim.PatientID = PatientAccount.PatientID and Claim.AccountSID = PatientAccount.AccountSID
inner join PlanClaim on PlanClaim.ClaimSID = Claim.ClaimSID
inner join patient on PatientAccount.PracticeID = Patient.PracticeID and PatientAccount.PatientID = Patient.PatientID
left outer join Account on PatientAccount.AccountSID = Account.AccountSID
inner join Practice on Practice.PracticeID=Patient.PracticeID
inner join Person on Person.PersonID=Patient.PatientID
inner join ClaimCharge on Claim.ClaimSID = ClaimCharge.ClaimSID
inner join Charge on Charge.ChargeSID = ClaimCharge.ChargeSID
inner join ProcedureEvent on ProcedureEvent.ChargeSID = Charge.ChargeSID
left outer join Provider on PlanClaim.PerformingProviderID = Provider.ProviderID
left outer join PlanClaim as PlanClaimPrimary on PlanClaimPrimary.ClaimSID = Claim.ClaimSID and PlanClaimPrimary.CoverageOrder=1
left outer join PlanClaim as PlanClaimSeconadry on PlanClaimSeconadry.ClaimSID = Claim.ClaimSID and PlanClaimSeconadry.CoverageOrder=2
left outer join PlanClaim as PlanClaimTertiary on PlanClaimTertiary.ClaimSID = Claim.ClaimSID and PlanClaimTertiary.CoverageOrder=3
where

('''+@InsuranceStatus+''' =''''  or ( PlanClaim.CurrentStatus = '''+@InsuranceStatus+''') )
and
('''+@CoverageOrder+'''=''''   or ( PlanClaim.CoverageOrder = '''+@CoverageOrder+''') )
and
('+ convert(varchar, @PatientID,10) + '=0  or Patient.PatientID='+convert(varchar, @PatientID,10)+')
and
('+ convert(varchar, @TotalClaimAmount,10) +'=0 or PlanClaim.TotalClaimAmount >'+  convert(varchar, @TotalClaimAmount,10) +')
and
('+ convert(varchar, @GuarantorID,10) +'=0 or Account.GuarantorID='+ convert(varchar, @GuarantorID,10) +')
and
('''+ @BillNumber +'''='''' or  Claim.ClaimNumber= '''+ @BillNumber+''' )
and
('''+ @ClaimIcnNumber +'''=''0'' or  PlanClaim.PlanICN= '''+ @ClaimIcnNumber+''' )
and 
('+ convert(varchar, @Age,10) +'=0 or DATEDIFF(DAY, CONVERT(Date, SUBSTRING(Claim.CreateStamp, 1, charindex(''-'',Claim.CreateStamp)-1), 100),CAST( GETDATE() AS Date )) > '+ convert(varchar, @Age,10) + ')
and
('+ convert(varchar, @PracticeID,10) +'=0 or Patient.PracticeID= '+ convert(varchar, @PracticeID,10) +')
and
('+ convert(varchar, @PhysicianID,10) +'=0 or PlanClaim.PerformingProviderID= '+ convert(varchar, @PhysicianID,10) +')'

set @SQL = @SQL + @DOsfilter  + @insurancefilter + @completedclaimsfilter + @cashclaimsfilter + ' group by Claim.ClaimSID ,Claim.ClaimNumber, Practice.SortName , Practice.PracticeID, Person.SortName , Provider.SortName, PlanClaimPrimary.CurrentStatus ,PlanClaimSeconadry.CurrentStatus,PlanClaimTertiary.CurrentStatus,PlanClaimPrimary.PlanID ,PlanClaimSeconadry.PlanID,PlanClaimTertiary.PlanID,Patient.PatientID '+@sortClaimsfilter+ ' OFFSET '+convert(varchar, @Skip,10)+' ROWS FETCH NEXT  '+convert(varchar,500,10)+' ROWS ONLY'
print @SQL
 exec(@SQL)

 

END
