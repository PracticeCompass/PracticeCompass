USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspChargeActivityGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Charge Activity on Charge Grid select
-- exec uspChargeActivityGet @ChargeSID =42
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspChargeActivityGet] 
	-- Add the parameters for the stored procedure here
    @ChargeSID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   select ChargeActivity.prrowid as GridID,ActivityCount,Case ActivityType 
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
		end As ActivityType
   ,Case SourceType 
		when 'M' then 'Manual'
		when 'I' then 'Insurance'
		when 'G' then 'Guarantor'
		when 'P' then 'Practice'
		else  SourceType
		end As SourceType
		,CONVERT(varchar,ChargeActivity.PostDate,101) as PostDate,ChargeActivity.Amount as Amount, Charge.Amount as ChargeAmount,DisplayText,ProcedureEvent.ProcedureCode
   from ChargeActivity inner join Charge on ChargeActivity.ChargeSID = Charge.ChargeSID 
   inner join ProcedureEvent on Charge.ChargeSID = ProcedureEvent.ChargeSID 
   --inner join [Procedure] on ProcedureEvent.ProcedureCode = [Procedure].ProcedureCode
   where ChargeActivity.ChargeSID = @ChargeSID
   order by ActivityCount
END
