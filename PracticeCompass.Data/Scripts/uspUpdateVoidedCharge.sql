USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspUpdateVoidedCharge]    Script Date: 1/13/2022 10:29:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Description:	Update Voided status in Charge, ProcedureEvent, and ClaimCharge
-- exec [uspChargeDetailsUpdate] 
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'uspUpdateVoidedCharge') 
DROP PROCEDURE uspUpdateVoidedCharge  
GO

CREATE PROCEDURE [dbo].[uspUpdateVoidedCharge] 
	-- Add the parameters for the stored procedure here
     @ChargeSID int
AS
BEGIN
	BEGIN TRANSACTION;  
		UPDATE [dbo].[Charge]
			SET [RecordStatus] = 'V'
		WHERE ChargeSID=@ChargeSID

		UPDATE [dbo].[ProcedureEvent]
			SET [Voided] = 'Y'
		WHERE ChargeSID=@ChargeSID

		UPDATE [dbo].[ClaimCharge]
			SET [CurrentStatus] = 'V'
		WHERE ChargeSID=@ChargeSID
	ROLLBACK;
END
