USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspPatientDetailsGet]    Script Date: 7/18/2021 3:38:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Patient Detail on Patient Grid select
-- exec uspPatientDetailsGet 3330,27934
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPatientDetailsGet] 
	-- Add the parameters for the stored procedure here
    @PersonID int , @PracticeID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   Select top 1 Person.PersonID ,patient.PatientID, Person.LastName as DNLastName , Person.FirstName as DNFirstName, 
Person.MiddleName as DNMiddleName , Person.NameSuffix as DNNameSuffix , 
Practice.PracticeCode , Practice.SortName as PracticeName 
--,Provider.SortName as ProviderName , Provider.ProviderID 
,CONVERT(varchar,Person.DOB,101) as DNDOB, 
	Address.Line1 as Address1 , Address.Line2 as Address2 ,
	Address.City , CountryState.StateCode , CountryState.State , Address.Zip,
	person.SSN as DNSSN ,Person.Sex as GenderCode , LookupCode.Description as GenderName ,
	Person.MaritalStatus as MaritalStatusCode , MaritalStatus.Description as MaritalStatusName,
	HomePhone.Number as HomePhone , WorkPhone.Number as WorkPhone , WorkPhone.Extension as WorkPhoneExt,
	MobilePhone.Number as MobilePhone,
	Email.Email as Email ,Patient.Class as patienttypecode , Patienttype.Description as PatienttypeName,m.CopayAmount , m.InsurancePortion , 
	m.PaidAmount,m.PatientPortion,A.TotalDue
	from Person inner join patient on PersonID= patient.PatientID
	inner join Practice on Patient.PracticeID = Practice.PracticeID
	--left outer join Provider on Provider.ProviderID = Patient.StaffID
	inner join [dbo].[LookupCode] on Person.Sex = LookupCode.lookupcode and lookuptype = 'Gender'
	left outer join  [dbo].[LookupCode] as MaritalStatus on Person.MaritalStatus = MaritalStatus.lookupcode and MaritalStatus.lookuptype =  'MaritalStatus'
    left outer join Phone as HomePhone on Person.PersonID = HomePhone.EntitySID and HomePhone.Class = 'H'
	left outer join Phone as WorkPhone on Person.PersonID = WorkPhone.EntitySID and WorkPhone.Class = 'W'
	left outer join Phone as MobilePhone on Person.PersonID = MobilePhone.EntitySID and HomePhone.Class = 'M'
	left outer join  [dbo].[LookupCode] as Patienttype on patient.Class = Patienttype.lookupcode and Patienttype.lookuptype =  'patientclass'
left outer join Address on [dbo].[Address].[EntitySID] = PersonID
left outer join CountryState on Address.State = CountryState.StateCode
Left outer join Email on email.EntitySID = patient.PatientID
left outer join PatientAccount on 
PatientAccount.PracticeID = 
Patient.PracticeID and
PatientAccount.PatientID = 
Patient.PatientID
left outer join (select PatientID,Sum(Account.Balance) as TotalDue from  Account inner join PatientAccount on  Account.AccountSID = PatientAccount.AccountSID  where PatientAccount.PatientID = @PersonID group by PatientID) 
as A on A.PatientID = PatientAccount.PatientID 
left outer join 
(select Charge.PatientID ,Charge.PracticeID,Charge.AccountSID , sum(Amount) as TotalDue , sum(ApprovedAmount) as InsurancePortion
,sum(Amount - ApprovedAmount -InsuranceReceipts) as PatientPortion ,sum(GuarantorReceipts + InsuranceReceipts) as PaidAmount,
sum(CopayAmount) as  CopayAmount
from Charge
where PatientID = @PersonID  
group by PatientID ,Charge.PracticeID,Charge.AccountSID) as m
on m.PracticeID = 
PatientAccount.PracticeID and
m.PatientID = PatientAccount.PatientID 
and
m.AccountSID = 
PatientAccount.AccountSID
--inner join PolicyMember on PolicyMember.PersonID = Person.PersonID
--inner join [Plan] on PolicyMember.PlanID = [Plan].PlanID
where Person.PersonID=@PersonID and Patient.PracticeID=@PracticeID
END
GO


