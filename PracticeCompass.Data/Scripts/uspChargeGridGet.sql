USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspChargeGridGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- exec uspChargeGridGet 6904  =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspChargeGridGet] 
@ClaimSID int
AS
BEGIN
	SET NOCOUNT ON;
	
select ClaimCharge.ChargeSID , CONVERT(varchar,ProcedureEvent.FromServiceDate,101) AS FromServiceDate, ProcedureEvent.ProcedureCode , Charge.Amount,
Charge.Amount - (Charge.InsuranceReceipts + Charge.GuarantorReceipts + Charge.Adjustments) as OutStandingBalance,
Mod1.[Modifier] as Mod1 , Mod2.[Modifier] as Mod2 , Dag1.[DiagnosisCode] as Diag1 , Dag2.[DiagnosisCode] as Diag2,ProcedureEvent.StaffID as RenderingID,[Provider].SortName as ProviderName,
ProcedureEvent.Units , Charge.RespCoverageOrder,
--case when Charge.RespCoverageOrder=1 then 'Active' END as Prim,
--case when Charge.RespCoverageOrder=2 then 'Active' END as SeC, 
--case when Charge.RespCoverageOrder=99 then 'Active' END as Patient,
--,Provider.SortName as ProviderName
Charge.RecordStatus,charge.CurrentStatus,
case when Charge.RecordStatus = 'O' then 'Open' 
	when Charge.RecordStatus = 'P' then 'Satisfied' 
 when Charge.RecordStatus = 'S' then 'Voided'  
 when Charge.RecordStatus = 'V' then 'Over Paid' 
 End as RecordStatus_,
case when Charge.CurrentStatus = 'G' then 'Guarantor responsible charge' 
 when Charge.CurrentStatus = 'GA' then 'Responsibility automatically transferred to guarantor' 
 when Charge.CurrentStatus = 'GT' then 'Responsibility manually transferred to guarantor' 
 when Charge.CurrentStatus = 'I' then 'Insurance responsible charge' 
 when Charge.CurrentStatus = 'IF' then 'Responsibility forwarded to insurance' 
 when Charge.CurrentStatus = 'IR' then 'IR' 
 when Charge.CurrentStatus = 'IT' then 'Responsibility manually transferred to insurance' 
 when Charge.CurrentStatus = 'IU' then 'Unbilled insurance responsible charge'
End as CurrentStatus_ ,ChargeStatus.Plan1, ChargeStatus.Plan2,ChargeStatus.Patient as PatientPaid
from ClaimCharge
inner join ProcedureEvent on ProcedureEvent.ChargeSID = ClaimCharge.ChargeSID
inner join Charge on Charge.ChargeSID = ClaimCharge.ChargeSID
left outer join [dbo].[ProcedureEventModifier] as Mod1 on Mod1.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Mod1.[Order]=1
left outer join [dbo].[ProcedureEventModifier] as Mod2 on Mod2.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Mod2.[Order]=2
left outer join [dbo].ProcedureEventDiag as Dag1 on Dag1.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Dag1.[Order]=1
left outer join [dbo].ProcedureEventDiag as Dag2 on Dag2.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Dag2.[Order]=2
left outer join Staff as RenderingStaff on ProcedureEvent.PracticeID = RenderingStaff.PracticeID 
and ProcedureEvent.StaffID = RenderingStaff.StaffID
left outer join [Provider] on [Provider].[ProviderID] = RenderingStaff.StaffID
left outer Join dbo.FuncGetChargeStatus(@ClaimSID) As ChargeStatus on ClaimCharge.ChargeSID = ChargeStatus.ChargeSID
--left outer join PendingCharge on ProcedureEvent.EncounterSID = PendingCharge.EncounterSID
--left outer join Provider on Provider.ProviderID = PendingCharge.PerformingProviderID
where ClaimCharge.ClaimSID=@ClaimSID
Order by  ClaimCharge.ChargeSID 

END
GO


