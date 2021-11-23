USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspPhysicianDetailsGet]    Script Date: 7/18/2021 3:38:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Patient Detail on Patient Grid select
-- exec  uspPhysicianDetailsGet @ProviderID =659736
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPhysicianDetailsGet] 
	-- Add the parameters for the stored procedure here
    @ProviderID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

select Top(1)  Provider.ProviderID , Staff.PositionCode,Position.Name as PositionName, Provider.MiddleName ,Provider.NameSuffix,Provider.SSN,
Provider.LastName as DNLastName , Provider.FirstName as DNFirstName ,
Address.Line1 as Address1,Address.Line2 as Address2 , Address.City , case  LEN(LTRIM(RTRIM(Address.Zip)))
                            when 9 then
                            STUFF(Address.Zip, 6, 0, '-') 
                            else Address.Zip
                            end As Zip ,email.Email as Email ,HomePhone.Number as HomePhone , WorkPhone.Number as WorkPhone , WorkPhone.Extension as WorkPhoneExt,
MobilePhone.Number as MobilePhone, CountryState.StateCode , CountryState.State , Address.Zip,
FaxPhone.Number as FaxPhone,taxid.ID  as Taxcode , NPI.ID as IdentificationNumber , UPIN.ID as UPIN , DEA.ID as DEA
from Provider 
left outer join Staff on [dbo].[Staff].[StaffID] = ProviderID
left outer join Address on [dbo].[Address].[EntitySID] = ProviderID
left outer join Email on Email.EntitySID=ProviderID
left outer join Position on Position.PositionCode=Staff.PositionCode
left outer join CountryState on Address.State = CountryState.StateCode
left outer join Phone as HomePhone on Provider.ProviderID = HomePhone.EntitySID and HomePhone.Class = 'H'
left outer join Phone as WorkPhone on Provider.ProviderID  = WorkPhone.EntitySID and WorkPhone.Class = 'W'
left outer join Phone as MobilePhone on Provider.ProviderID = MobilePhone.EntitySID and MobilePhone.Class = 'M'
left outer join Phone as FaxPhone on Provider.ProviderID = FaxPhone.EntitySID and FaxPhone.Class = 'F'
left outer join StaffAltID as taxid  on provider.ProviderID=taxid.StaffID  and taxid.AidTag='taxid'
left outer join StaffAltID as NPI  on provider.ProviderID=NPI.StaffID  and NPI.AidTag='NPI'
left outer join StaffAltID as UPIN  on provider.ProviderID=UPIN.StaffID  and UPIN.AidTag='UPIN'
left outer join StaffAltID as DEA  on provider.ProviderID=DEA.StaffID  and DEA.AidTag='DEA'
where ProviderID=@ProviderID
END




