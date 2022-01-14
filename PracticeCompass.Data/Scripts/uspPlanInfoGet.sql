USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspInsuranceGridGet]    Script Date: 2022-01-14 12:58:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- exec uspInsuranceGridGet @personid =1782 =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspPlanInfoGet] 
@PlanId int
AS
BEGIN
	SET NOCOUNT ON
Select top (1)  PolicyMember.CoverageOrder , [Plan].SortName as PlanName , [Plan].PlanID ,
    InsuranceType.Description as InsuranceTypeName , PolicyMember.InsuranceType as InsuranceTypeCode,
	PolicyMember.PolicyNumber , [Plan].Class as plantypecode , PlanClass.Description as PlanTypeName,
	Policy.GroupNumber , convert(varchar, Policy.StartDate, 101) as StartDate , convert(varchar,Policy.EndDate, 101) as EndDate, 
	PolicyMember.RelationToSub ,
  Carrier.Name as CompanyName , Carrier.CarrierID as CarrierID
	from Person left outer join
 PolicyMember on PolicyMember.PersonID = Person.PersonID
inner join [Plan] on PolicyMember.PlanID = [Plan].PlanID
left outer join [dbo].[LookupCode] as InsuranceType  on PolicyMember.InsuranceType = InsuranceType.lookupcode and lookuptype = 'InsuranceType'
left outer join [dbo].[LookupCode] as PlanClass on [plan].Class = PlanClass.LookupCode and PlanClass.lookuptype = 'planclass'
inner join Policy on PolicyMember.PolicyNumber = Policy.[PolicyNumber] and PolicyMember.PlanID = Policy.PlanID
inner join Carrier on Carrier.carriercode = [Plan].carriercode
where [plan].PlanID=@planId
END