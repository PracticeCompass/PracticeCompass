USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspLedgerGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Ledger Grid Data
-- exec uspLedgerGet @PatientID =1118
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspLedgerGet] 
	-- Add the parameters for the stored procedure here
    @PatientID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	  select * from 
	  (select 'Claim' as ActivityType , convert(varchar, CONVERT(DATETIME, SUBSTRING( CreateStamp,0,9)),101) as Date  , Claim.ClaimSID , 0 as sortorder ,ClaimNumber , 
	  case when  LowestRespCoverageOrder =1 then 'Primary'
	       when  LowestRespCoverageOrder =2 then 'Secondary'
		   when  LowestRespCoverageOrder =3 then 'Tertiary'
		   when  LowestRespCoverageOrder =99 then 'Patient'
		    ELSE  '' END
	  as LowestRespCoverageOrder , '' as chargetype , -NULL as Amount , NULL as approvedamount , '' as CurrentStatus , '' as patientstatment 
	  ,'' as  procedurecode , '' as description, ''as mod1 ,'' as mod2 , '' as mod3 , '' as mod4 , '' as diag1 , '' as diag2 , ''as diag3 , '' as diag4 , 0 as ActivityCount , 0 as ChargeSID
	  from Claim where PatientID = @PatientID


	  union all
	  
	select  'Charge Details' as ActivityType, convert(varchar, CONVERT(DATETIME, SUBSTRING( charge.CreateStamp,0,9)),101) as Date, ClaimCharge.ClaimSID, 1 as sortorder, ''as ClaimNumber,'' as LowestRespCoverageOrder,
		  case when  Charge.ChargeType ='P' then 'Procedure'
	       when  Charge.ChargeType ='I' then 'Admin'
		   when  Charge.ChargeType ='A' then 'Interest'
		    ELSE  '' END
	  as ChargeType
	,Charge.Amount,charge.ApprovedAmount,
	  case when  Charge.CurrentStatus ='G' then 'guarantor responsible charge'
	       when  Charge.CurrentStatus ='GT' then 'responsibility manually transferred to guarantor'
		   when  Charge.CurrentStatus ='GA' then 'responsibility automatically transferred to guarantor'
		   when  Charge.CurrentStatus ='I' then 'insurance responsible charge'
		   when  Charge.CurrentStatus ='IU' then 'unbilled insurance responsible charge'
		   when  Charge.CurrentStatus ='IT' then 'responsibility manually transferred to insurance'
		   when  Charge.CurrentStatus ='IF' then 'responsibility forwarded to insurance'
		    ELSE  '' END
	  as CurrentStatus,Charge.PatientStatement,ProcedureEvent.ProcedureCode, [Procedure].Description,
	  Mod1.Modifier as Mod1 , Mod2.Modifier as mod2 , Mod3.Modifier as Mod3 , Mod4.Modifier as Mod4
	  ,Diag1.DiagnosisCode as Diag1,Diag2.DiagnosisCode as Diag2,Diag3.DiagnosisCode as Diag3,Diag4.DiagnosisCode as Diag4 , 0 as ActivityCount , Charge.ChargeSID
	 from ClaimCharge inner join  Charge on ClaimCharge.ChargeSID = Charge.ChargeSID inner join ProcedureEvent on
	 ProcedureEvent.ChargeSID = charge.ChargeSID
	 inner join [Procedure] on [Procedure].ProcedureCode = ProcedureEvent.ProcedureCode
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
	where Charge.PatientID=@PatientID
	union all
	
	  select  'Txn' as ActivityType , convert(varchar, CONVERT(DATETIME, SUBSTRING( ChargeActivity.CreateStamp,0,9)),101) as Date , ClaimCharge.ClaimSID , 2 as sortorder , '' as claimnumber ,
	  '' as LowestRespCoverageOrder , '' as chargetype ,
	  ChargeActivity.Amount,
	   NULL as approvedamount , '' as CurrentStatus , '' as patientstatment
	  , ChargeActivity.ActivityType as procedurecode ,
	  Case ActivityType 
		when 'ADJ' then 'Adjustment'
		when 'CHG' then 'Create Charge'
		when 'CVD' then 'Charge Void'
		when 'EDT' then 'Edit Charge After Billed'
		when 'IBL' then 'Insurance Bill' 
		when 'PMT' then 'Payment Assignment' 
		when 'PRV' then 'Payment Reversal' 
		when 'PVD' then 'Payment Void' 
		when 'RBL' then 'Insurance Rebill' 
		when 'UBL' then 'Insurance Unbill' 
		when 'UNC' then 'Unapplied Credit Assignment' 
		when 'URV' then 'Unapplied Credit Reversal' 
		when 'XFR' then 'Transfer'
		else '' 
		end As description,
		 ''as mod1 ,'' as mod2 , '' as mod3 , '' as mod4 , '' as diag1 , '' as diag2 , ''as diag3 , '' as diag4 , ChargeActivity.ActivityCount , Charge.ChargeSID
	  from ChargeActivity 
	  inner join Charge on Charge.ChargeSID = ChargeActivity.ChargeSID
	  inner join ClaimCharge  on ClaimCharge.ChargeSID = Charge.ChargeSID 
		where Charge.PatientID=@PatientID
	)m order by m.ClaimSID ,m.ChargeSID  , m.sortorder , m.ActivityCount

	END