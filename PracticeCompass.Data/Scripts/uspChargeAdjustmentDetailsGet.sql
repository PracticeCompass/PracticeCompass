USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPayClassGet]    Script Date: 2022-01-03 5:10:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- exec uspChargeAdjustmentDetailsGet 
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspChargeAdjustmentDetailsGet] 
	-- Add the parameters for the stored procedure here
@ChargeSID int,
@ClaimSID int,
@PlanId int
AS
BEGIN
select CONVERT(varchar,ChargeSID,50) +CONVERT(varchar,ClaimSID,50)+CONVERT(varchar,PlanId,50)+AdjustmentReasonCode+ClaimAdjustmentGroupCode  as gridId, ChargeSID  as chargeSid,ClaimSID as claimSid,  AdjustmentAmount,AdjustmentReasonCode,ClaimAdjustmentGroupCode from PlanClaimChargeRemitAdj where ChargeSID=@ChargeSID and ClaimSID =@ClaimSID and PlanId=@PlanId order by AdjustmentAmount
END