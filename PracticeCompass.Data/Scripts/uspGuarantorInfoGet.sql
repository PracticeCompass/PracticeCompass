USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspInsuranceGridGet]    Script Date: 2022-01-14 12:58:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- exec uspInsuranceGridGet @personid =1782 =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspGuarantorInfoGet] 
@PersonID int
AS
BEGIN
	SET NOCOUNT ON
Select
  Person.SortName as SubscriberName ,
  	HomePhone.Number as HomePhone , WorkPhone.Number as WorkPhone,
	MobilePhone.Number as MobilePhone,
		Address.Line1 as Address1 , Address.Line2 as Address2 ,
	Address.City , CountryState.StateCode , CountryState.State , Address.Zip
from Person 
  left outer join Phone as HomePhone on Person.PersonID = HomePhone.EntitySID and HomePhone.Class = 'H'
	left outer join Phone as WorkPhone on Person.PersonID = WorkPhone.EntitySID and WorkPhone.Class = 'W'
	left outer join Phone as MobilePhone on Person.PersonID = MobilePhone.EntitySID and HomePhone.Class = 'M'	
left outer join Address on [dbo].[Address].[EntitySID] = Person.PersonID
left outer join CountryState on Address.State = CountryState.StateCode
where PersonID=@PersonID

END
