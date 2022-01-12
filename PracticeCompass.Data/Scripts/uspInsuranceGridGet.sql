USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspInsuranceGridGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- exec uspInsuranceGridGet @personid =1782 =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspInsuranceGridGet] 
@PersonID int
AS
BEGIN
	SET NOCOUNT ON;
	
Select  PolicyMember.CoverageOrder , [Plan].SortName as PlanName , [Plan].PlanID , convert(varchar,[Plan].PlanID,10) + convert(varchar,PolicyMember.CoverageOrder,10) + convert(varchar,PolicyMember.PolicyNumber,10) as GridID,
    InsuranceType.Description as InsuranceTypeName , PolicyMember.InsuranceType as InsuranceTypeCode,
	PolicyMember.PolicyNumber , [Plan].Class as plantypecode , PlanClass.Description as PlanTypeName,
	Policy.GroupNumber , convert(varchar, Policy.StartDate, 101) as StartDate , convert(varchar,Policy.EndDate, 101) as EndDate, 
	PolicyMember.RelationToSub ,
	CASE WHEN  PolicyMember.RecordStatus ='A'  THEN 'True'
    ELSE 'False'END  As RecordStatus,PolicyMember.EDIMemberID AS InsuredID,
	CASE
    WHEN PolicyMember.CoverageOrder in (1,2,3)  THEN 'True'
    ELSE 'False'
END AS Insured ,
  Carrier.Name as CompanyName , Carrier.CarrierID as CarrierID,
  Subscriber.SortName as SubscriberName ,Relation.Description as ReleationDescription  ,
  	HomePhone.Number as HomePhone , WorkPhone.Number as WorkPhone,
	MobilePhone.Number as MobilePhone,
		Address.Line1 as Address1 , Address.Line2 as Address2 ,
	Address.City , CountryState.StateCode , CountryState.State , Address.Zip
	from Person left outer join
 PolicyMember on PolicyMember.PersonID = Person.PersonID
inner join [Plan] on PolicyMember.PlanID = [Plan].PlanID
left outer join [dbo].[LookupCode] as InsuranceType  on PolicyMember.InsuranceType = InsuranceType.lookupcode and lookuptype = 'InsuranceType'
left outer join [dbo].[LookupCode] as PlanClass on [plan].Class = PlanClass.LookupCode and PlanClass.lookuptype = 'planclass'
inner join Policy on PolicyMember.PolicyNumber = Policy.[PolicyNumber] and PolicyMember.PlanID = Policy.PlanID
inner join Carrier on Carrier.carriercode = [Plan].carriercode
left outer join Person as Subscriber on Policy.SubscriberID = Subscriber.PersonID and PolicyMember.RelationToSub !='S'
left outer join LookupCode as Relation on Relation.LookupCode = PolicyMember.RelationToSub and Relation.LookupType='Relation'
  left outer join Phone as HomePhone on Subscriber.PersonID = HomePhone.EntitySID and HomePhone.Class = 'H'
	left outer join Phone as WorkPhone on Subscriber.PersonID = WorkPhone.EntitySID and WorkPhone.Class = 'W'
	left outer join Phone as MobilePhone on Subscriber.PersonID = MobilePhone.EntitySID and HomePhone.Class = 'M'	
left outer join Address on [dbo].[Address].[EntitySID] = Subscriber.PersonID
left outer join CountryState on Address.State = CountryState.StateCode
--left outer join PlanAltName on PlanAltName.PlanID = [Plan].PlanID 

where Person.PersonID=@PersonID 
order by CoverageOrder



END
GO


