USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPatientPaymentGetforApply]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Patient Payment Grid Data used in Apply Payment
-- exec uspPatientPaymentGetforApply @PatientID =56959
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspPatientPaymentGetforApply] 
	-- Add the parameters for the stored procedure here
    @PatientID int 
AS
BEGIN
select Charge.ChargeSID ,CONVERT(varchar,ProcedureEvent.FromServiceDate,101) As FromServiceDate, 
 ProcedureEvent.ProcedureCode , [Procedure].Description AS ProcedureDescription ,
 Mod1.[Modifier] as Modifier1 ,  Diag1.DiagnosisCode as Diag1,
 + '$' +  Convert(varchar(50),(Charge.Amount - Charge.Adjustments - Charge.GuarantorReceipts - Charge.InsuranceReceipts)) as ChargeBalance,
 + '$' +  Convert(varchar(50),Charge.Amount) as Amount,   
 charge.GuarantorReceipts as PatientPaid, Charge.Adjustments , Charge.PatientID
 from ProcedureEvent
inner join [Procedure] on [Procedure].ProcedureCode = ProcedureEvent.ProcedureCode
inner join Charge on ProcedureEvent.ChargeSID = charge.ChargeSID
left outer join ProcedureEventModifier as Mod1 on Mod1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Mod1.[Order]=1
left outer join ProcedureEventDiag as Diag1 on Diag1.ProcedureEventSID = ProcedureEvent.ProcedureEventSID and Diag1.[Order]=1
where  (Charge.Amount - Charge.Adjustments - Charge.GuarantorReceipts - Charge.InsuranceReceipts) > 0 and Charge.PatientID=@PatientID  
Order by Charge.ChargeSID

END