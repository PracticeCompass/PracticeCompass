USE [Medman]
GO
/****** Object:  StoredProcedure [dbo].[uspERAPaymentDetailsGet]    Script Date: 12/8/2021 1:24:27 PM ******/
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
	select * from (
select convert(varchar,ERSChargeServiceInfo.ERSChargeSID) as GridID, 'Charge' as type,ERSClaimData.ERSClaimSID ,ERSChargeServiceInfo.ERSChargeSID,PayerClaimControlNumber,claim.ClaimNumber,ERSClaimName.NameLastOrOrgName,(ERSClaimName.NameLastOrOrgName+', '+ERSClaimName.NameFirst) as NameFirst,
 ERSChargeServiceInfo.ProcedureModifier01
,ERSChargeServiceInfo.ProcedureModifier02,ERSChargeServiceInfo.ProductServiceID , 
CONVERT(varchar,[ERSChargeDate].ServiceDate,101) as ServiceDate,
ERSChargeServiceInfo.LineItemChargeAmt , ERSChargeServiceInfo.LineItemProviderPaymentAmt,
sum([ERSChargeClaimAdjustment].AdjustmentAmt) as ChargeClaimAdjustmentAmt ,
''  as ChargeClaimAdjustmentReason,
sum(ERSClaimAdjustment.AdjustmentAmt) as ClaimAdjustmentAmt , '' as ERSClaimAdjustmentreason,
sum(ERSPmtProvLevelAdj.ProviderAdjustmentAmt) as ProviderAdjustmentAmt , '' as PmtProvLevelAdjReason ,
dbo.FuncERAMatchingGet(ERSChargeServiceInfo.ERSChargeSID,ERSClaimData.ERSClaimSID ,ERSPaymentHeader.RecordStatus) as comment,
'' as comment_,
'' as AlertCode

 from ERSClaimData
inner join ERSClaimName on ERSClaimName.ERSClaimSID = ERSClaimData.ERSClaimSID and ERSClaimName.EntityIDCode='QC'
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
group by ERSClaimData.ERSClaimSID ,ERSChargeServiceInfo.ERSChargeSID,PayerClaimControlNumber
,claim.ClaimNumber,ERSClaimName.NameLastOrOrgName,ERSClaimName.NameFirst, ERSChargeServiceInfo.ProcedureModifier01
,ERSChargeServiceInfo.ProcedureModifier02,ERSChargeServiceInfo.ProductServiceID,[ERSChargeDate].ServiceDate,
ERSChargeServiceInfo.LineItemChargeAmt,ERSChargeServiceInfo.LineItemProviderPaymentAmt,ERSPaymentHeader.RecordStatus


union all 
select convert(varchar,ERSChargeServiceInfo.ERSChargeSID)+convert(varchar,[ERSChargeClaimAdjustment].ClaimAdjustmentGroupCode)+convert(varchar,[ERSChargeClaimAdjustment].AdjustmentReasonCode)  as GridID,'Detail' as type,
ERSClaimData.ERSClaimSID ,ERSChargeServiceInfo.ERSChargeSID,PayerClaimControlNumber,'' as ClaimNumber,'' as NameLastOrOrgName,
'' as NameFirst,
'' asProcedureModifier01
,'' as ProcedureModifier02,'' as ProductServiceID , 
'' as ServiceDate,
null as LineItemChargeAmt , null as LineItemProviderPaymentAmt,
[ERSChargeClaimAdjustment].AdjustmentAmt as ChargeClaimAdjustmentAmt ,
ERSChargeClaimAdjustment.ClaimAdjustmentGroupCode +' - '+[ERSChargeClaimAdjustment].AdjustmentReasonCode   as ChargeClaimAdjustmentReason,
ERSClaimAdjustment.AdjustmentAmt as ClaimAdjustmentAmt , ERSClaimAdjustment.AdjustmentReasonCode as ERSClaimAdjustmentreason,
ERSPmtProvLevelAdj.ProviderAdjustmentAmt , ERSPmtProvLevelAdj.AdjustmentReasonCode as PmtProvLevelAdjReason ,
ERADenialAlert.ShortDescription as comment,ERADenialAlert.LongDescription as comment_,
case when [ERADenialAlert].[AlertCode]='Phys' then 'Physician Responsibility'
     when [ERADenialAlert].[AlertCode]='Pat' then 'Patient responsibility'
	 when [ERADenialAlert].[AlertCode]='Move' then 'Move responsibility to the next level. Secondary/tertiary insurance or patient.'
	 when [ERADenialAlert].[AlertCode]='Manual' then 'Manual Processing'
	 else '' end as AlertCode

from ERSClaimData
inner join ERSChargeServiceInfo on ERSChargeServiceInfo.ERSClaimSID = ERSClaimData.ERSClaimSID
left outer join
 [dbo].[ERSChargeClaimAdjustment] on [ERSChargeClaimAdjustment].ERSChargeSID = ERSChargeServiceInfo.ERSChargeSID
left outer join [dbo].ERSClaimAdjustment on ERSClaimAdjustment.ERSClaimSID = ERSChargeServiceInfo.ERSClaimSID
left outer join [dbo].ERSPmtProvLevelAdj on ERSPmtProvLevelAdj.ERSPaymentSID = ERSClaimData.ERSPaymentSID
left outer join dbo.ERSPaymentHeader on ERSPaymentHeader.ERSPaymentSID = ERSClaimData.ERSPaymentSID
left outer join [dbo].[ERADenialAlert] on [dbo].[ERADenialAlert].[GroupCode] = ERSChargeClaimAdjustment.ClaimAdjustmentGroupCode 
and [dbo].[ERADenialAlert].[CodeNumber]= [ERSChargeClaimAdjustment].AdjustmentReasonCode
where ERSClaimData.ERSPaymentSID=@ERSPaymentSID)m
Order by m.ERSClaimSID , m.ERSChargeSID , m.type

END