USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimGridGet]    Script Date: 09/05/2021 9:36:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--exec uspClaimGridGet @PatientID=0,@PracticeID=0,@PhysicianID=0,@DOSType=0,@DOSvalue=N'',@PatientClass=N'',@InsuranceType=0,@InsuranceID=0,@BillNumber=N'0',@ClaimIcnNumber=N'0',@Age=0,@TotalClaimAmount=0,@Batch=N'',@GuarantorID=0,@InsuranceStatus=N'',@CoverageOrder=N'',@IncludeCompletedClaims = 0-- =============================================
-- =============================================
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
@Skip int=0,
@SortColumn varchar(50)='',
@SortDirection varchar(50)=''

AS
BEGIN
	SET NOCOUNT ON;

	Declare  @SQL varchar(max), @DOSfilter varchar(50) , @insurancefilter varchar(200) , @completedclaimsfilter varchar(200),@sortClaimsfilter varchar(200)

	 	set @DOSfilter=Case @DOSType 
		when 1 then 'and (PlanClaim.FromDate =  '''+@DOSvalue+''' )'
		when 2 then 'and (PlanClaim.FromDate < '''+@DOSvalue+''' )'
		when 3 then 'and (PlanClaim.FromDate > '''+@DOSvalue+''' )'
		else ''
		end


		set @insurancefilter=Case @InsuranceType 
		when 1 then 'and ((PlanClaim.PlanID= '+convert(varchar, @InsuranceID,10)+'  )and (PlanClaim.CoverageOrder = 1))'
		when 2 then 'and ((PlanClaim.PlanID = '+convert(varchar, @InsuranceID,10)+'  )and (PlanClaim.CoverageOrder = 2))'
		when 3 then 'and ((PlanClaim.PlanID = '+convert(varchar, @InsuranceID,10)+'  )and (PlanClaim.CoverageOrder = 3))'
		else ''
		end
		set @completedclaimsfilter=Case @IncludeCompletedClaims
		when 0 then 'and (Charge.Amount - (Charge.InsuranceReceipts + Charge.GuarantorReceipts + Charge.Adjustments) > 0) and (charge.CurrentStatus != ''V'' OR charge.CurrentStatus != ''P'')'
		when 1 then ''
		else ''
		end
		set  @sortClaimsfilter= Case @SortColumn
		when 'dos' then 'order by convert(Date,Max(ProcedureEvent.FromServiceDate),101) '+@SortDirection+''
		when 'patientName' then 'order by Person.SortName '+@SortDirection+''
		when 'totalClaimAmount' then 'order by cast(max(PlanClaim.TotalClaimAmount)as money) '+@SortDirection+''
		when 'outStandingBalanace' then 'order by cast((SUM(Charge.Amount) - (SUM(Charge.InsuranceReceipts) + SUM(Charge.GuarantorReceipts) + SUM(Charge.Adjustments))) as Money) '+@SortDirection+''
		when 'practiceName' then 'order by Practice.SortName '+@SortDirection+''
		when 'providerName' then 'order by Provider.SortName '+@SortDirection+''
		when 'primaryStatus' then 'order by PlanClaimPrimary.CurrentStatus '+@SortDirection+''
		when 'seconadryStatus' then 'order by PlanClaimSeconadry.CurrentStatus '+@SortDirection+''
		when 'tertiaryStatus' then 'order by PlanClaimTertiary.CurrentStatus '+@SortDirection+''
		when 'destination' then 'order by Destination '+@SortDirection+''
		when 'notes' then 'order by Claim.ClaimSID '+@SortDirection+''
		else 'order by Claim.ClaimSID'
		end
	
set @SQL= 'select distinct COUNT(*) OVER() as totalCount,
   convert(varchar,Claim.ClaimSID,10) as GridID,
   Claim.ClaimSID, ' + '''$ ''' + ' + Convert(varchar(50),cast(max(PlanClaim.TotalClaimAmount)as money),1) as TotalClaimAmount ,cast(max(PlanClaim.TotalClaimAmount)as money) as TotalClaimAmountValue,' + '''$ ''' + ' + Convert(varchar(50),cast((SUM(Charge.Amount) - (SUM(Charge.InsuranceReceipts) + SUM(Charge.GuarantorReceipts) + SUM(Charge.Adjustments))) as Money),1) AS OutStandingBalanace , 
   cast((SUM(Charge.Amount) - (SUM(Charge.InsuranceReceipts) + SUM(Charge.GuarantorReceipts) + SUM(Charge.Adjustments))) as Money) AS OutStandingBalanaceValue
,Practice.SortName as practiceName,Practice.PracticeID as PracticeID,Person.SortName as patientName , dbo.FuncClaimDestGet(Claim.ClaimSID) as Destination 
,Provider.SortName as ProviderName , convert(varchar,Max(ProcedureEvent.FromServiceDate),101) as DOS , convert(Date,Max(ProcedureEvent.FromServiceDate),101) as DOSDate ,
PlanClaimPrimary.CurrentStatus as PrimaryStatus ,
PlanClaimSeconadry.CurrentStatus as SeconadryStatus ,
PlanClaimTertiary.CurrentStatus as TertiaryStatus 
from 
Claim inner join PatientAccount on 
Claim.PracticeID = 
PatientAccount.PracticeID and
Claim.PatientID = 
PatientAccount.PatientID and
Claim.AccountSID = 
PatientAccount.AccountSID
inner join PlanClaim on 
PlanClaim.ClaimSID = 
Claim.ClaimSID
inner join patient on 
PatientAccount.PracticeID = 
Patient.PracticeID and
PatientAccount.PatientID = 
Patient.PatientID
left outer join Account on PatientAccount.AccountSID = 
Account.AccountSID
inner join Practice on Practice.PracticeID=Patient.PracticeID
inner join Person on Person.PersonID=Patient.PatientID
inner join ClaimCharge on Claim.ClaimSID = ClaimCharge.ClaimSID
inner join Charge on Charge.ChargeSID = ClaimCharge.ChargeSID
inner join ProcedureEvent on ProcedureEvent.ChargeSID = Charge.ChargeSID
left outer join Provider on
PlanClaim.PerformingProviderID = Provider.ProviderID
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
('''+ @BillNumber +'''=''0'' or  Claim.ClaimNumber= '''+ @BillNumber+''' )
and
('''+ @ClaimIcnNumber +'''=''0'' or  PlanClaim.PlanICN= '''+ @ClaimIcnNumber+''' )
and 
('+ convert(varchar, @Age,10) +'=0 or DATEDIFF(DAY, CONVERT(Date, SUBSTRING(Claim.CreateStamp, 1, charindex(''-'',Claim.CreateStamp)-1), 100),CAST( GETDATE() AS Date )) > '+ convert(varchar, @Age,10) + ')
and
('+ convert(varchar, @PracticeID,10) +'=0 or Patient.PracticeID= '+ convert(varchar, @PracticeID,10) +')
and
('+ convert(varchar, @PhysicianID,10) +'=0 or PlanClaim.PerformingProviderID= '+ convert(varchar, @PhysicianID,10) +')'

print @SQL
set @SQL = @SQL + @DOsfilter  + @insurancefilter + @completedclaimsfilter + 'group by Claim.ClaimSID , Practice.SortName , Practice.PracticeID, Person.SortName , Provider.SortName, PlanClaimPrimary.CurrentStatus ,PlanClaimSeconadry.CurrentStatus,PlanClaimTertiary.CurrentStatus '+@sortClaimsfilter+ ' OFFSET '+convert(varchar, @Skip,10)+' ROWS FETCH NEXT  '+convert(varchar,500,10)+' ROWS ONLY'
print @SQL
 exec(@SQL)

 

END
