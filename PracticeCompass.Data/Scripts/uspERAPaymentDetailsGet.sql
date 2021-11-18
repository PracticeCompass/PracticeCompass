USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimDetailsGet]    Script Date: 8/6/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get ERAPaymentDetails Grid Data on Payment Header Grid select
-- exec uspERAPaymentDetailsGet 1971933
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspERAPaymentDetailsGet] 
	-- Add the parameters for the stored procedure here
    @ERSPaymentSID int 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
select ERSClaimData.ERSClaimSID ,ERSChargeServiceInfo.ERSChargeSID,PayerClaimControlNumber,claim.ClaimNumber,ERSClaimName.NameLastOrOrgName,(ERSClaimName.NameLastOrOrgName+', '+ERSClaimName.NameFirst) as NameFirst,
 ERSChargeServiceInfo.ProcedureModifier01
,ERSChargeServiceInfo.ProcedureModifier02,ERSChargeServiceInfo.ProductServiceID , 
CONVERT(varchar,[ERSChargeDate].ServiceDate,101) as ServiceDate,
ERSChargeServiceInfo.LineItemChargeAmt , ERSChargeServiceInfo.LineItemProviderPaymentAmt,
[ERSChargeClaimAdjustment].AdjustmentAmt as ChargeClaimAdjustmentAmt ,
ERSChargeClaimAdjustment.ClaimAdjustmentGroupCode +' - '+[ERSChargeClaimAdjustment].AdjustmentReasonCode  as ChargeClaimAdjustmentReason,
ERSClaimAdjustment.AdjustmentAmt as ClaimAdjustmentAmt , ERSClaimAdjustment.AdjustmentReasonCode as ERSClaimAdjustmentreason,
ERSPmtProvLevelAdj.ProviderAdjustmentAmt , ERSPmtProvLevelAdj.AdjustmentReasonCode as PmtProvLevelAdjReason ,
dbo.FuncERAMatchingGet(ERSChargeServiceInfo.ERSChargeSID,ERSClaimData.ERSClaimSID ,ERSPaymentHeader.RecordStatus) as comment,
case when [ERADenialAlert].[AlertCode]='Phys' then 'Physician Responsibility'
     when [ERADenialAlert].[AlertCode]='Pat' then 'Patient responsibility'
	 when [ERADenialAlert].[AlertCode]='Move' then 'Move responsibility to the next level. Secondary/tertiary insurance or patient.'
	 when [ERADenialAlert].[AlertCode]='Manual' then 'Manual Processing'
	 else '' end as AlertCode

 from ERSClaimData
inner join ERSClaimName on ERSClaimName.ERSClaimSID = ERSClaimData.ERSClaimSID
inner join ERSChargeServiceInfo on ERSChargeServiceInfo.ERSClaimSID = ERSClaimData.ERSClaimSID
inner join [dbo].[ERSChargeDate] on ERSChargeDate.ERSChargeSID = ERSChargeServiceInfo.ERSChargeSID and DateTimeQualifier=472
left outer join PlanClaim on PlanClaim.PlanICN = ERSClaimData.PayerClaimControlNumber
left outer join claim on Claim.ClaimSID = PlanClaim.ClaimSID
left outer join [dbo].[ERSChargeClaimAdjustment] on [ERSChargeClaimAdjustment].ERSChargeSID = ERSChargeServiceInfo.ERSChargeSID
left outer join [dbo].ERSClaimAdjustment on ERSClaimAdjustment.ERSClaimSID = ERSChargeServiceInfo.ERSClaimSID
left outer join [dbo].ERSPmtProvLevelAdj on ERSPmtProvLevelAdj.ERSPaymentSID = ERSClaimData.ERSPaymentSID
left outer join dbo.ERSPaymentHeader on ERSPaymentHeader.ERSPaymentSID = ERSClaimData.ERSPaymentSID
left outer join [dbo].[ERADenialAlert] on [dbo].[ERADenialAlert].[GroupCode] = ERSChargeClaimAdjustment.ClaimAdjustmentGroupCode and [dbo].[ERADenialAlert].[CodeNumber]= [ERSChargeClaimAdjustment].AdjustmentReasonCode
where ERSClaimData.ERSPaymentSID=@ERSPaymentSID
order by  claim.ClaimNumber,ERSClaimName.NameLastOrOrgName,ERSClaimName.NameFirst

END