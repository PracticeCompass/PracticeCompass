USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspPatientGridGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

---- =============================================
--exec uspPatientGridGet @PatientID=0,@practiceID=0,@DOBType=0,@DOBvalue=N'',@PatientClass=N'',@BalanceType=0,@BalanceValue=0,@InsuranceType=0,@InsurancID=0,@NoBalancePatients =0
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPatientGridGet] 
@PatientID int, 
@practiceID int,
@PatientClass varchar(12),
@BalanceType int,
@BalanceValue decimal,
@InsuranceType int,
@InsurancID int,
@NoBalancePatients int,
@Skip int,
@SortColumn varchar(50),
@SortDirection varchar(50)

AS
BEGIN
	SET NOCOUNT ON;
	
	Declare  @SQL varchar(max)
	, @Balancefilter varchar(50) , @insurancefilter varchar(200) , @patientfilter varchar(50)
	,@practicefilter varchar(50) , @patientclassfilter varchar(50),@NoPlanaceFilter varchar(200),@sortClaimsfilter varchar(200)

	set @patientfilter = '('+convert(varchar, @PatientID,10)+' = 0  or Patient.PatientID = '+convert(varchar, @PatientID,10)+')'

	 	
		set @Balancefilter=Case @BalanceType 
		when 1 then 'and (Account.Balance > '+convert(varchar, @BalanceValue,10)+' )'
		when 2 then 'and (Account.Balance < '+convert(varchar, @BalanceValue,10)+' )'
		else ''
		end

		set @insurancefilter=Case @InsuranceType 
		when 1 then 'and (([Plan].PlanID = '+convert(varchar, @InsurancID,10)+'  )and (PolicyMember.CoverageOrder = 1))'
		when 2 then 'and (([Plan].PlanID = '+convert(varchar, @InsurancID,10)+'  )and (PolicyMember.CoverageOrder = 2))'
		when 3 then 'and (([Plan].PlanID = '+convert(varchar, @InsurancID,10)+'  )and (PolicyMember.CoverageOrder = 3))'
		else ''
		end

		set @practicefilter = case @practiceID
		 when 0 then ''
		 else 'and ( Account.PracticeID = '+convert(varchar,@practiceID,10)+')'
		 end

	   set @patientclassfilter = case @PatientClass
	   when '' then ''
	   else 'and ( Patient.Class = '''+@PatientClass+''')'
	   end

	   set @NoPlanaceFilter = case @NoBalancePatients
	   when 0 then 'and ( Account.Balance != 0 )'
	   else ''
	   end
	   set  @sortClaimsfilter= Case @SortColumn
	   	when 'email' then 'order by Email '+@SortDirection+''
		when 'zip' then 'order by Zip '+@SortDirection+''
		when 'nextAppt' then 'order by NextAppt '+@SortDirection+''
		when 'practiceName' then 'order by practiceName '+@SortDirection+''
		when 'state' then 'order by Address.State '+@SortDirection+''
		when 'city' then 'order by Address.City '+@SortDirection+''
		when 'address' then 'order by Address '+@SortDirection+''
		when 'dnLastName' then 'order by DNLastName '+@SortDirection+''
		when 'dnFirstName' then 'order by DNFirstName '+@SortDirection+''
		when 'dob' then 'order by DOBValue '+@SortDirection+''
		when 'balance' then 'order by BalanceValue '+@SortDirection+''
		when 'personNumber' then 'order by Person.PersonNumber '+@SortDirection+''
		else 'order by Patient.PatientID'
		end

set @SQL=	'Select distinct COUNT(*) OVER() as totalCount, CONVERT(varchar,patient.PracticeID,50) + CONVERT(varchar,Person.PersonID,50) as PatientgridID,  patient.PracticeID, Person.PersonID , Person.PersonNumber , patient.PatientID, 
	person.LastName as DNLastName , person.FirstName as DNFirstName,  CONVERT(varchar,person.DOB,101) as DOB , CONVERT(Date,person.DOB,101) as DOBValue ,convert(varchar,Account.Balance , 1) as Balance,
	cast(Account.Balance as money) as BalanceValue,Address.Line1 as Address, Address.City , Address.State , case LEN(LTRIM(RTRIM(Address.Zip)))
                            when 9 then
                            STUFF(Address.Zip, 6, 0, ''-'') 
                            else Address.Zip
                            end As Zip ,email.Email as Email , [dbo].[FuncNextApptGet](patient.PatientID) as NextAppt  , practice.sortname  as practiceName
	from Person inner join patient on PersonID= patient.PatientID
left outer join PatientAccount on PatientAccount.PatientID = patient.PatientID  and PatientAccount.PracticeID=patient.PracticeID
left outer join Address on [dbo].[Address].[EntitySID] = PersonID
left outer join Account on Account.AccountSID = PatientAccount.AccountSID
inner join PolicyMember on PolicyMember.PersonID = Person.PersonID
inner join practice on practice.practiceid=patient.PracticeID
inner join [Plan] on PolicyMember.PlanID = [Plan].PlanID
Left outer join Email on email.EntitySID = patient.PatientID
where'

set @SQL = @SQL + @patientfilter+@practicefilter + @patientclassfilter  + @Balancefilter + @insurancefilter + @NoPlanaceFilter+@sortClaimsfilter+'  OFFSET '+convert(varchar, @Skip)+' ROWS FETCH NEXT  '+convert(varchar,500)+' ROWS ONLY'
print @SQL
 exec(@SQL)


END
GO


