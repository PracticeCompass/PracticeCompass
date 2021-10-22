USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspChargeDetailsGet]    Script Date: 7/11/2021 11:01:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- EXEC [uspChargeDetailsGet] 103211=============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspChargeDetailsGet] 
  @ChargeSID int
AS
BEGIN
	SET NOCOUNT ON;

select distinct top 1 Charge.ChargeSID ,  ProcedureEvent.ProcedureCode , [Procedure].Description AS ProcedureDescription ,ProcedureEvent.Units,Charge.RecordStatus,charge.CurrentStatus,
Charge.Amount , CONVERT(varchar,ProcedureEvent.FromServiceDate,101) As FromServiceDate , CONVERT(varchar,ProcedureEvent.ToServiceDate,101) As ToServiceDate ,[Procedure].TOSCode,
Mod1.[Modifier] as Modifier1 , Mod2.Modifier as Modifier2 , Mod3.Modifier as Modifier3
, Mod4.Modifier as Modifier4 , Diag1.DiagnosisCode as Diag1
, Diag2.DiagnosisCode as Diag2, Diag3.DiagnosisCode as Diag3, Diag4.DiagnosisCode as Diag4
, Diag5.DiagnosisCode as Diag5, Diag6.DiagnosisCode as Diag6, Diag7.DiagnosisCode as Diag7
, Diag8.DiagnosisCode as Diag8 , Ailment.AuthorizationNumber , ProcedureEvent.StaffID as RenderingID ,
[Provider].SortName as RenderingName , SupervisingStaff.StaffID as SupervisingID,
SupervisingProvider.SortName as SupervisingName ,
Charge.ApprovedAmount , (charge.Amount - Charge.ApprovedAmount) as PatientPortion , 
charge.GuarantorReceipts as PatientPaid ,
charge.InsuranceReceipts as InsurancePaid ,
(Charge.Amount - Charge.Adjustments - Charge.GuarantorReceipts - Charge.InsuranceReceipts) as ChargeBalance
 from ProcedureEvent
inner join [Procedure] on [Procedure].ProcedureCode = ProcedureEvent.ProcedureCode
inner join Charge on ProcedureEvent.ChargeSID = charge.ChargeSID
left outer join ProcedureEventModifier as Mod1 on Mod1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Mod1.[Order]=1
left outer join ProcedureEventModifier as Mod2 on Mod2.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Mod2.[Order]=2
left outer join ProcedureEventModifier as Mod3 on Mod3.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Mod3.[Order]=3
left outer join ProcedureEventModifier as Mod4 on Mod4.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Mod4.[Order]=4
left outer join ProcedureEventDiag as Diag1 on Diag1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag1.[Order]=1
left outer join ProcedureEventDiag as Diag2 on Diag2.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag2.[Order]=2
left outer join ProcedureEventDiag as Diag3 on Diag3.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag3.[Order]=3
left outer join ProcedureEventDiag as Diag4 on Diag4.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag4.[Order]=4
left outer join ProcedureEventDiag as Diag5 on Diag5.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag5.[Order]=5
left outer join ProcedureEventDiag as Diag6 on Diag6.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag6.[Order]=6
left outer join ProcedureEventDiag as Diag7 on Diag7.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag7.[Order]=7
left outer join ProcedureEventDiag as Diag8 on Diag8.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag8.[Order]=8
left outer join ClaimCharge on ClaimCharge.ChargeSID = Charge.ChargeSID
left outer join Claim on Claim.ClaimSID = ClaimCharge.ClaimSID
left outer join Ailment on Claim.AilmentSID = Ailment.AilmentSID
left outer join Staff as RenderingStaff on ProcedureEvent.PracticeID = RenderingStaff.PracticeID 
and ProcedureEvent.StaffID = RenderingStaff.StaffID
left outer join [Provider] on [Provider].[ProviderID] = RenderingStaff.StaffID
left outer join Staff as SupervisingStaff on  ProcedureEvent.PracticeID = SupervisingStaff.PracticeID 
and ProcedureEvent.SupervisingStaffID =  SupervisingStaff.StaffID
left outer join [Provider] as SupervisingProvider on SupervisingProvider.[ProviderID] = SupervisingStaff.StaffID

where Charge.ChargeSID = @ChargeSID
END
GO


