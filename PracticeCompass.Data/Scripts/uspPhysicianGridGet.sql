USE [medman]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

---- =============================================
--exec uspPhysicianGridGet @ProviderID=0,@firstName=N'Michael',@lastName=N'',@Skip=0,@SortColumn=N'',@SortDirection=N'',@zip=0
--select  * from Entity where Class = 'D' and EntitySID=579893
--select * from Provider where ProviderID=579893
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPhysicianGridGet] 
@ProviderID int, 
@firstName nvarchar(200),
@lastName nvarchar(200),
@Zip int,
@Skip int,
@SortColumn varchar(50),
@SortDirection varchar(50)

AS
BEGIN
	SET NOCOUNT ON;
	
	Declare  @SQL varchar(max)
	, @providerfilter varchar(50) ,@providerFirstNamefilter varchar(100),@providerLastNamefilter varchar(100),@providerZipfilter varchar(100),  @sortProviderfilter varchar(200)
	  set @providerfilter = '('+convert(varchar, @ProviderID,10)+' = 0  or Provider.ProviderID = '+convert(varchar, @ProviderID,10)+')'
	 
	 set @providerFirstNamefilter = case @firstName
	   when '' then ''
	   else 'and ( person.FirstName= '''+@firstName+''')'
	   end

	   set @providerLastNamefilter = case @lastName
	   when '' then ''
	   else 'and ( person.LastName= '''+@lastName+''')'
	   end

	   if(@Zip = 0)
	   begin
	    set  @providerZipfilter=''
	   end
	   else
	   begin
	   set @providerZipfilter =  'and ( Zip= '''+@Zip+''')'
	   end


	   set  @sortProviderfilter= Case @SortColumn
	   	when 'email' then 'order by Email '+@SortDirection+''
		when 'zip' then 'order by Zip '+@SortDirection+''
		when 'state' then 'order by Address.State '+@SortDirection+''
		when 'city' then 'order by Address.City '+@SortDirection+''
		when 'address' then 'order by Address '+@SortDirection+''
		when 'dnLastName' then 'order by DNLastName '+@SortDirection+''
		when 'dnFirstName' then 'order by DNFirstName '+@SortDirection+''
		when 'dob' then 'order by DOB '+@SortDirection+''
		when 'personNumber' then 'order by Person.PersonNumber '+@SortDirection+''
		else 'order by Provider.ProviderID'
		end

set @SQL=	'select CONVERT(varchar,Provider.ProviderID,50) as ProvidergridID ,Provider.ProviderID
,Provider.LastName as DNLastName , Provider.FirstName as DNFirstName ,
Address.Line1 as Address, Address.City , Address.State , case  LEN(LTRIM(RTRIM(Address.Zip)))
                            when 9 then
                            STUFF(Address.Zip, 6, 0, ''-'') 
                            else Address.Zip
                            end As Zip ,email.Email as Email 
from Provider 
left outer join Address on [dbo].[Address].[EntitySID] = ProviderID
left outer join Email
on Email.EntitySID=ProviderID
where
'

set @SQL = @SQL+@providerfilter + @providerFirstNamefilter+@providerLastNamefilter + @providerZipfilter +@sortProviderfilter
print @SQL
 exec(@SQL)


END
GO


