USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPatientPoupGet]    Script Date: 2021-10-06 2:35:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPatientPoupGet] 
--first,last name , DOB, MRN,Account Number, Patient Number
@FirstName varchar(50),
@lastName varchar(50),
@DOB varchar(50),
@accountNumber varchar(50),
@PersonNumber varchar(50),
@DOBType int,
@Skip int

AS
BEGIN
	SET NOCOUNT ON;
	Declare  @SQL varchar(max), @DOBfilter varchar(50), @filter varchar(max)

	set @DOBfilter=Case @DOBType 
		when 1 then 'and (person.DOB =  '''+@DOB+''' )'
		when 2 then 'and (person.DOB < '''+@DOB+''' )'
		when 3 then 'and (person.DOB > '''+@DOB+''' )'
		else ''
		end
set @filter= '('''+@FirstName+''' is null or '''+@FirstName+'''='''' or (Person.FirstName  like'''+@FirstName+'%'' ))
	and
	('''+@lastName+''' is null or '''+@lastName+'''='''' or (Person.LastName  like '''+@lastName+'%'' ))
	and
	('''+@accountNumber+''' is null or '''+@accountNumber+'''='''' or (Account.AccountNumber = '''+@accountNumber+''' ))
	and
	('''+@PersonNumber+''' is null or '''+@PersonNumber+'''='''' or (Person.PersonNumber = '''+@PersonNumber+''' ))'

set @SQL=	'select distinct COUNT(*) OVER() as totalCount,practice.SortName as practiceName,  Person.SortName,PersonID as PatientID ,CONVERT(varchar,Account.AccountNumber,50) + CONVERT(varchar,Person.PersonID,50) + CONVERT(varchar,Person.PersonNumber,50) as PatientListgridID, Account.AccountNumber AS AccountNumber,Person.PersonNumber AS PersonNumber,CONVERT(varchar,person.DOB,101) as DOB from  [dbo].Person 
	inner join Patient on 
	Patient.PatientID = Person.PersonID
	inner join PatientAccount on 
	PatientAccount.PracticeID = 
	Patient.PracticeID and
	PatientAccount.PatientID = 
	Patient.PatientID
	inner join Account on 
	PatientAccount.AccountSID = 
    Account.AccountSID
	inner join practice on practice.practiceid=patient.PracticeID
	where Patient.RecordStatus=''A'' and '

	set @SQL = @SQL + +@filter+@DOBfilter +'	Order By PatientID OFFSET '+convert(varchar, @Skip)+' ROWS FETCH NEXT  '+convert(varchar,500)+' ROWS ONLY'
print @SQL
 exec(@SQL)
END
