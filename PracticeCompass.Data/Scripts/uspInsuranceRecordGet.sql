USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspInsuranceRecordGet]    Script Date: 9/12/2021 10:55:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
--exec uspInsuranceRecordGet 232562
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspInsuranceRecordGet] 
@PlanID int
AS
BEGIN
	SET NOCOUNT ON;
select top 1 [Plan].PlanID , CarrierCode, [Plan].SortName , [Plan].Class , [Plan].RecordStatus , DNZip,FilingCode,LookupCode.Description ,
case when LineOfBusiness='B' Then 'Both'
     when LineOfBusiness='P' Then 'Professional'
	 when LineOfBusiness='H' Then 'institutional '
	 else '' end as LineOfBusiness,
	 payer.SortName as payername,
	 payer.EDIOptions,
	 payer.GovernmentType,
	 claimcode.Description as PlanType,
	 payer.ProviderIDTag,
	 payer.ProviderIDTag,
	 payer.WebURL,
	 payer.AffiliatedState,
	 payer.EnrollInstructions,
	 Address.Line1,
	 Address.Line2,
	 Address.City,
	 Address.State,
	 Address.Country,
	 Address.Zip,
	 Address.Attention,
	 phone.Number
 from [Plan]
left outer join LookupCode on LookupCode.LookupCode=[Plan].Class and LookupType='PlanClass'
left outer join payer on [Plan].PayerID = payer.PayerID
left outer join Address on Address.EntitySID = [plan].PlanID
left outer join Phone on Phone.EntitySID = [plan].PlanID
left outer join LookupCode as claimcode on claimcode.lookupcode = payer.PlanType and claimcode.LookupType='ClaimCode'

where PlanID= @PlanID
END