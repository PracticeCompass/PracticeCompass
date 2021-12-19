USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspInsurancePaymentGetforApply]    Script Date: 09/05/2021 9:36:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--exec uspInsurancePaymentGetforApply @DOSType=0,@DOSvalue=N'',@InsuranceID=0,@ClaimIcnNumber=N'0',@GuarantorID=0 =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspInsurancePaymentGetforApply] 
@GuarantorID int, 
@DOSType int,
@DOSvalue varchar(12),
@InsuranceID int,
@ClaimIcnNumber varchar(40)
AS
BEGIN
	SET NOCOUNT ON;
	Declare  @SQL varchar(max), @DOSfilter varchar(50)  , @insurancefilter varchar(200)

	 	set @DOSfilter=Case @DOSType 
		when 1 then 'and (ProcedureEvent.FromServiceDate =  '''+@DOSvalue+''' )'
		when 2 then 'and (ProcedureEvent.FromServiceDate < '''+@DOSvalue+''' )'
		when 3 then 'and (ProcedureEvent.FromServiceDate > '''+@DOSvalue+''' )'
		else ''
		end

		set @insurancefilter=Case @InsuranceID 
		when 0 then ''
		else 'and ((PlanClaim.PlanID= '+convert(varchar, @InsuranceID,10)+'  ))'
		END

set @SQL= 'select distinct Charge.ChargeSID ,CONVERT(varchar,ProcedureEvent.FromServiceDate,101) As FromServiceDate, 
 ProcedureEvent.ProcedureCode , [Procedure].Description AS ProcedureDescription ,
 Mod1.[Modifier] as Modifier1 ,  Diag1.DiagnosisCode as Diag1,
(Charge.Amount - Charge.Adjustments - Charge.GuarantorReceipts - Charge.InsuranceReceipts) as ChargeBalance,
(Charge.Amount) as Amount   ,
(charge.InsuranceReceipts) as InsurancePaid, PlanClaim1.PlanID as Plan1,PlanClaim2.PlanID as Plan2,PlanClaim3.PlanID as Plan3,PlanClaim4.PlanID as Plan4,Claim.PracticeID  as PracticeID,
(Charge.Adjustments ) as Adjustments, ClaimCharge.ClaimSID 
 from ProcedureEvent
inner join [Procedure] on [Procedure].ProcedureCode = ProcedureEvent.ProcedureCode
inner join Charge on ProcedureEvent.ChargeSID = charge.ChargeSID
left outer join ProcedureEventModifier as Mod1 on Mod1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Mod1.[Order]=1
left outer join ProcedureEventDiag as Diag1 on Diag1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag1.[Order]=1
inner join ClaimCharge on ClaimCharge.ChargeSID = Charge.ChargeSID
inner join PlanClaim on PlanClaim.ClaimSID = ClaimCharge.ClaimSID
left outer join PlanClaim as PlanClaim1 on PlanClaim1.ClaimSID = ClaimCharge.ClaimSID and PlanClaim1.CoverageOrder = 1 
left outer join PlanClaim as PlanClaim2 on PlanClaim2.ClaimSID = ClaimCharge.ClaimSID and PlanClaim2.CoverageOrder = 2
left outer join PlanClaim as PlanClaim3 on PlanClaim3.ClaimSID = ClaimCharge.ClaimSID and PlanClaim3.CoverageOrder = 3
left outer join PlanClaim as PlanClaim4 on PlanClaim4.ClaimSID = ClaimCharge.ClaimSID and PlanClaim4.CoverageOrder = 4
inner join Claim on Claim.ClaimSID = ClaimCharge.ClaimSID
where  
('''+ @ClaimIcnNumber +'''=''0'' or  Claim.ClaimNumber = '''+ @ClaimIcnNumber+''' )
and
('+ convert(varchar, @GuarantorID,10) + '= 0  or Charge.PatientID='+convert(varchar, @GuarantorID,10)+')'

set @SQL = @SQL + @DOsfilter  + @insurancefilter + 'Order by Charge.ChargeSID'  
print @SQL
 exec(@SQL)

END