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
+ ''$'' +  Convert(varchar(50),cast((Charge.Amount - Charge.Adjustments - Charge.GuarantorReceipts - Charge.InsuranceReceipts)as money),1) as ChargeBalance,
+ ''$'' +  Convert(varchar(50),cast(Charge.Amount as money),1) as Amount   ,
 + ''$'' +  Convert(varchar(50),cast(charge.InsuranceReceipts as money),1) as InsurancePaid, 
 + ''$'' +  Convert(varchar(50),cast(Charge.Adjustments as money),1) as Adjustments, ClaimCharge.ClaimSID 
 from ProcedureEvent
inner join [Procedure] on [Procedure].ProcedureCode = ProcedureEvent.ProcedureCode
inner join Charge on ProcedureEvent.ChargeSID = charge.ChargeSID
left outer join ProcedureEventModifier as Mod1 on Mod1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Mod1.[Order]=1
left outer join ProcedureEventDiag as Diag1 on Diag1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag1.[Order]=1
inner join ClaimCharge on ClaimCharge.ChargeSID = Charge.ChargeSID
inner join PlanClaim on 
PlanClaim.ClaimSID = 
ClaimCharge.ClaimSID
inner join Claim on 
Claim.ClaimSID = ClaimCharge.ClaimSID
where  
('''+ @ClaimIcnNumber +'''=''0'' or  Claim.ClaimNumber = '''+ @ClaimIcnNumber+''' )
and
('+ convert(varchar, @GuarantorID,10) + '= 0  or Charge.PatientID='+convert(varchar, @GuarantorID,10)+')'

set @SQL = @SQL + @DOsfilter  + @insurancefilter + 'Order by Charge.ChargeSID'  
print @SQL
 exec(@SQL)

END