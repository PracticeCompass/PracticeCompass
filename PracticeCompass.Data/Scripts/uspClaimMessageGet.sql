USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspGenderGet]    Script Date: 9/12/2021 10:55:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
--exec uspClaimMessageGet 1
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspClaimMessageGet] 
@ClaimSID int
AS
BEGIN
	SET NOCOUNT ON;
	Select distinct Person.LastName , Person.FirstName , Person.MiddleName 
,Person.NameSuffix , Person.Sex,CONVERT(varchar,Person.DOB,112) as DOB  ,Person.PersonID
,Address.Line1 , Address.Line2 ,
	Address.City , CountryState.StateCode  , Address.Zip 
	,Provider.ProviderType , Provider.SortName as ProviderName , Provider.FirstName as ProviderFristName
	,Provider.LastName as ProviderLastName , Provider.MiddleName as ProviderMiddleName ,Provider.NameSuffix as ProviderSuffix,
	ProviderSpecialty.SpecialtyCode as TaxonomyCode
	,Provideradress.Line1 as ProviderLine1,
	Provideradress.Line2 as ProviderLine2 , Provideradress.City as ProviderCity,
	ProviderState.StateCode as ProviderState,Provideradress.Zip as ProviderZip , Provider.ProviderID , PolicyMember.CoverageOrder
	,PolicyMember.RelationToSub ,PolicyMember.ClaimMemberID, [Plan].SortName as PlanName,
	PlanAddress.Line1 as PlanLine1 , PlanAddress.Line2 as PlanLine2 , 
	PlanAddress.Zip as PlanZip , PlanAddress.City as PlanCity , PlanAddress.State as PlanState,
	ProcedureEvent.ProcedureCode , Mod1.Modifier as Mod1 , Mod2.Modifier as Mod2, Mod3.Modifier as Mod3, Mod4.Modifier as Mod4 ,
	Dag1.DiagnosisCode as Diag1 ,Dag2.DiagnosisCode as Diag2,Dag3.DiagnosisCode as Diag3,Dag4.DiagnosisCode as Diag4,
	Dag1.[Order] as Order1 ,Dag2.[Order] as Order2,Dag3.[Order] as Order3,Dag4.[Order] as Order4,
	Charge.Amount as ChargeAmount , PendingCharge.Units , CONVERT(varchar,ProcedureEvent.FromServiceDate,112) as  FromServiceDate,
	StaffAltID.ID as NPI , Referring.LastName as RefLastName , Referring.FirstName as RefFirstName , Referring.MiddleName as RefMiddleName,
  Referring.NameSuffix as RefSuffix, [dbo].[RefDoctorAltID].ID as RefNPI,
   Practice.SortName as PracticeName , PracticePhone.Number as PracticePhone ,PracticePhone.Contact as PracticeContact, [Plan].FilingCode , ProviderTaxID.ID as ProviderTaxID ,
   ProcedureEvent.ProcedureEventSID,Charge.ChargeSID,Claim.ClaimNumber,ServiceCenter.POSCode,
   practiceaddress.Line1 as PracticeLine1,
	practiceaddress.Line2 as PracticeLine2 , practiceaddress.City as PracticeCity,
	practiceState.StateCode as PracticeState,practiceaddress.Zip as PracticeZip,
	financialAddress.Line1 as FinancialLine1,
	financialAddress.Line2 as FinancialLine2 , financialAddress.City as FinancialCity,
	financialState.StateCode as FinancialState,financialAddress.Zip as FinancialZip,PracCommSetup.ReceiverID,PracCommSetup.SenderID
	from claim
inner join Person on Person.PersonID = Claim.PatientID
left outer join Address on [dbo].[Address].[EntitySID] = PersonID
left outer join CountryState on Address.State = CountryState.StateCode
inner join PlanClaim on PlanClaim.ClaimSID = claim.ClaimSID
inner join ClaimCharge on ClaimCharge.ClaimSID = Claim.ClaimSID
inner join ProcedureEvent on ProcedureEvent.ChargeSID = ClaimCharge.ChargeSID
inner join Provider on Provider.ProviderID = ProcedureEvent.StaffID
left outer join Address as Provideradress on Provideradress.EntitySID = Provider.ProviderID
left outer join CountryState as ProviderState on Provideradress.State = ProviderState.StateCode
inner join PolicyMember on PolicyMember.PlanID = PlanClaim.PlanID and PolicyMember.PolicyNumber = PlanClaim.PolicyNumber
inner join [Plan] on [Plan].PlanID = PlanClaim.PlanID
left outer join Address as PlanAddress on PlanAddress.EntitySID = PlanClaim.PlanID


left outer join ServiceCenter on ProcedureEvent.ServiceCenterID=ServiceCenter.ServiceCenterID
inner join Practice on ProcedureEvent.PracticeID = Practice.PracticeID
inner join Entity as PracticeEntity on PracticeEntity.EntitySID = Practice.PracticeID
left outer join Phone as PracticePhone on PracticePhone.EntitySID = PracticeEntity.EntitySID and PracticePhone.Class = 'B'
inner join Charge on Charge.ChargeSID = ClaimCharge.ChargeSID
left outer join [dbo].[ProcedureEventModifier] as Mod1 on Mod1.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Mod1.[Order]=1
left outer join [dbo].[ProcedureEventModifier] as Mod2 on Mod2.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Mod2.[Order]=2
left outer join [dbo].[ProcedureEventModifier] as Mod3 on Mod3.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Mod3.[Order]=3
left outer join [dbo].[ProcedureEventModifier] as Mod4 on Mod4.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Mod4.[Order]=4
left outer join [dbo].ProcedureEventDiag as Dag1 on Dag1.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Dag1.[Order]=1
left outer join [dbo].ProcedureEventDiag as Dag2 on Dag2.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Dag2.[Order]=2
left outer join [dbo].ProcedureEventDiag as Dag3 on Dag3.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Dag3.[Order]=3
left outer join [dbo].ProcedureEventDiag as Dag4 on Dag4.[ProcedureEventSID] = ProcedureEvent.ProcedureEventSID and Dag4.[Order]=4
left outer join PendingCharge on ProcedureEvent.EncounterSID = PendingCharge.EncounterSID
left outer join StaffAltID on StaffAltID.staffID = Provider.ProviderID and AidTag ='NPI' and StaffAltID.PracticeID=ProcedureEvent.PracticeID
left outer join StaffAltID as ProviderTaxID on ProviderTaxID.staffID = Provider.ProviderID and ProviderTaxID.AidTag ='TAXID' and StaffAltID.PracticeID=ProcedureEvent.PracticeID
left outer join 
ProviderSpecialty on ProviderSpecialty.ProviderID = Provider.ProviderID
left outer join Specialty on ProviderSpecialty.SpecialtyCode = Specialty.SpecialtyCode and  Specialty.TaxonomyFlag = 1
left outer join Staff on Staff.StaffID=Provider.ProviderID
left outer join Address as practiceaddress on practiceaddress.EntitySID=Staff.PracticeID
left outer join CountryState as practiceState on practiceaddress.State=practiceState.StateCode
left outer join Address as financialAddress on  financialAddress.EntitySID=Staff.FinanceCenterID
left outer join CountryState as financialState on financialAddress.State=financialState.StateCode
left outer join Ailment on Ailment.AilmentSID=ProcedureEvent.AilmentSID
left outer join [dbo].[Provider] as Referring on Referring.[ProviderID] = Ailment.RefDoctorID
left outer join [dbo].[RefDoctorAltID] on [dbo].[RefDoctorAltID].[RefDoctorID] = Referring.[ProviderID] and RefDoctorAltID.AidTag ='NPI'
inner join PracCommSetup on PracCommSetup.PracticeID = Practice.PracticeID
where Claim.ClaimSID=@ClaimSID and PolicyMember.CoverageOrder=1
END

GO


