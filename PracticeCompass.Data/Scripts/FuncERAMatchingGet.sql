USE [medman]
GO

/****** Object:  UserDefinedFunction [dbo].[ERAMatchingGet]    Script Date: 11/12/2021 7:02:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


 --select dbo.FuncERAMatchingGet(1913549,1913548,'P')
--ERSChargeSID=1913549 and	ERSClaimSID =1913548
-- example claim number not matched select dbo.FuncERAMatchingGet(1865701,1865699,'P')
-- example patient not matched select dbo.FuncERAMatchingGet(1971881,1971880,'P')
CREATE OR ALTER     FUNCTION [dbo].[FuncERAMatchingGet]
(
	@ERSChargeSID int , @ERSClaimSID int, @RecordStatus varchar(2)
)
RETURNS varchar(500)
AS
BEGIN

	-- Declare the return variable here
	DECLARE @result varchar(500)=''
	if not exists (select * from PlanClaim where PlanICN in (select PayerClaimControlNumber from ERSClaimData where ERSClaimSID=@ERSClaimSID ))
	set @result = @result + 'Claim Number not Matched'
	
	Declare @ERSPaymentSID int
	select @ERSPaymentSID=ERSPaymentSID from ERSClaimData where  ERSClaimSID=1913548
	 if not exists ( select voucher from payment where voucher in(select CheckTraceNbr from ERSPaymentHeader where RecordStatus=@RecordStatus and ERSPaymentSID= @ERSPaymentSID))
	set @result = @result + ', Payment voucher not Matched'

Declare @ERSChargeAmount decimal(17,2), @chargeSID int , @Chargeamount  decimal(17,2)
select @Chargeamount=Amount from Charge where ChargeSID=@chargeSID 
select @ERSChargeAmount=LineItemChargeAmt from ERSChargeServiceInfo where ERSChargeSID=@ERSChargeSID and	ERSClaimSID =@ERSClaimSID
select @chargeSID=ReferenceID from ERSChargeReference where ERSChargeSID=@ERSChargeSID and ReferenceIDQualifier='6R'

if  (@ERSChargeAmount <> @Chargeamount)
set @result = @result + ', Charge Amount not Matched'

declare @ERSServiceDate datetime , @ChargeFromDate datetime , @ProcedureEventSID int , @ProcedureCode varchar(50)
select @ERSServiceDate=ServiceDate from ERSChargeDate where ERSChargeSID=@ERSChargeSID and DateTimeQualifier='472' --DOS
   select @ProcedureEventSID=ProcedureEventSID,@ChargeFromDate=FromServiceDate, @ProcedureCode=ProcedureCode from ProcedureEvent where ChargeSID=@chargeSID
	if (@ERSServiceDate <> @ChargeFromDate)
	set @result = @result + ', Date of Service not Matched'

Declare @ERSCPT varchar(100), @ERSMod1 varchar(4), @ERSMod2 varchar(4), @ERSMod3 varchar(4), @ERSMod4 varchar(4)
  select @ERSCPT=ProductServiceID,@ERSMod1=ProcedureModifier01,
  @ERSMod2=ProcedureModifier02,@ERSMod3=ProcedureModifier03,@ERSMod4=ProcedureModifier04 from ERSChargeServiceInfo where ERSChargeSID=@ERSChargeSID
  --select * from ProcedureEventModifier where ProcedureEventSID=@ProcedureEventSID
	if (@ERSCPT <> @ProcedureCode)
	set @result = @result + ', CPT Code not Matched'
	
Declare @ESRTracePayerIdent varchar(20)
select @ESRTracePayerIdent=TracePayerIdent from ERSPaymentHeader where ERSPaymentSID=@ERSPaymentSID  

--select * from PlanClaimCharge where ChargeSID = 608782
if not exists (select PayerID from [Plan] where PayerID in(select payerID from payer where EnvoyPayerID = @ESRTracePayerIdent))
	set @result = @result + ', Payer not Matched'


 

if not exists (select LastName from Person where PersonID in (
select PersonID from PolicyMember where ClaimMemberID in (
select  IDCode  from ERSClaimName where ERSClaimSID=@ERSClaimSID)))
	set @result = @result + ' Patient not Matched'
	
if (@result = '')
set @result = 'Records are Matched'

	RETURN @result

END
GO


