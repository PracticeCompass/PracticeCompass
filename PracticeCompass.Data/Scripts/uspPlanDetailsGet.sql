USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPhysicianDetailsGet]    Script Date: 2021-11-24 2:24:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Plan Detail on Plan Grid select
-- exec  uspPlanDetailsGet @PlanID =659736
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspPlanDetailsGet] 
	-- Add the parameters for the stored procedure here
    @PlanID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

Select distinct  [Plan].PlanID , convert(varchar,[Plan].PlanID,10)  as GridID,[Plan].SortName as PlanName,
[Plan].Class as PlanTypeCode , PlanClass.Description as PlanTypeName,
  Carrier.Name as CompanyName , Carrier.CarrierID as CarrierID,
		Address.Line1 as Address1 ,Address.Line2 as Address2,
	Address.City , CountryState.StateCode , CountryState.State , Address.Zip,FaxPhone.Number as FaxPhone,HomePhone.Number as HomePhone , WorkPhone.Number as WorkPhone , WorkPhone.Extension as WorkPhoneExt,
MobilePhone.Number as MobilePhone
from [Plan] 
inner join Carrier on Carrier.carriercode = [Plan].carriercode
left outer join [dbo].[LookupCode] as PlanClass on [plan].Class = PlanClass.LookupCode and PlanClass.lookuptype = 'planclass'
left outer join Address on [dbo].[Address].[EntitySID] = [PLan].PlanID 
left outer join CountryState on Address.State = CountryState.StateCode
left outer join Phone as HomePhone on [Plan].PlanID  = HomePhone.EntitySID and HomePhone.Class = 'H'
left outer join Phone as WorkPhone on [Plan].PlanID   = WorkPhone.EntitySID and WorkPhone.Class = 'W'
left outer join Phone as MobilePhone on [Plan].PlanID = MobilePhone.EntitySID and MobilePhone.Class = 'M'
left outer join Phone as FaxPhone on [Plan].PlanID = FaxPhone.EntitySID and FaxPhone.Class = 'F'
where PlanID=@PlanID
END


