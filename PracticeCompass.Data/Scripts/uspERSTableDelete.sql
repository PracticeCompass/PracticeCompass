USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspERSTableDelete]    Script Date: 8/6/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Cleanup ERS Table for Certain Payment
-- exec uspERSTableDelete '893119286'
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspERSTableDelete] 
	-- Add the parameters for the stored procedure here
    @CheckTraceNbr varchar(250) 
AS
BEGIN
Declare  @ERSPaymentSID int 

select @ERSPaymentSID=ERSPaymentSID from ERSPaymentHeader  where CheckTraceNbr=@CheckTraceNbr

delete from ERSPaymentHeader  where CheckTraceNbr=@CheckTraceNbr

delete from ERSPaymentParty where ERSPaymentSID=@ERSPaymentSID and EntityIDCode in ('PR','PE')

delete from ERSClaimData where ERSPaymentSID=@ERSPaymentSID 

delete from ERSClaimContact where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )


delete from ERSClaimContactNbr where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from ERSClaimName where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from ERSClaimDate  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )
 
delete from [dbo].[ERSChargeServiceInfo]  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from ERSChargeIndustryCode where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))

delete from ERSMedicareOutpatAdj  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from ERSClaimAdjustment where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from ERSClaimMonetaryAmt where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from ERSClaimReference where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ) 

delete from ERSPmtProvLevelAdj where ERSPaymentSID=@ERSPaymentSID

delete from ERSMedicareOutpatAdj  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from ERSChargeClaimAdjustment  where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))

delete from [dbo].[ERSChargeMsgCode] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))

delete from [dbo].[ERSChargeReference] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))

delete from [dbo].[ERSChargeMonetaryAmt] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))

delete from [dbo].[ERSClaimMsgCode]  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from [dbo].[ERSClaimQuantity] where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )

delete from  [dbo].[ERSPmtPartyContact]  where ERSPaymentSID=@ERSPaymentSID

delete from [dbo].[ERSPmtPartyContactNbr] where ERSPaymentSID=@ERSPaymentSID

delete from [dbo].[ERSPmtPartyReference] where ERSPaymentSID=@ERSPaymentSID

delete from [dbo].[ERSRemitReference] where RemittanceSID in (select RemittanceSID
from ERSPaymentHeader  where CheckTraceNbr=@CheckTraceNbr)

delete from [dbo].[ERSRemittanceDate] where RemittanceSID in (select RemittanceSID
from ERSPaymentHeader  where CheckTraceNbr=@CheckTraceNbr)

delete from [dbo].[ERSRemittanceFileInstance]  where RemittanceSID in (select RemittanceSID
from ERSPaymentHeader  where CheckTraceNbr=@CheckTraceNbr)

END