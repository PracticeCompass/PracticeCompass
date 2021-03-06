USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPhysicianGridGet]    Script Date: 2021-11-23 1:33:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

---- =============================================
--exec uspPhysicianGridGet @ProviderID=0,@firstName=N'Michael',@lastName=N'',@Skip=0,@SortColumn=N'',@SortDirection=N'',@zip=0
--select  * from Entity where Class = 'D' and EntitySID=579893
--select * from Provider where ProviderID=579893
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspPlanGridGet] 
@PlanID int, 
@Zip varchar(50),
@Skip int,
@SortColumn varchar(50),
@SortDirection varchar(50),
@PlanGroup nvarchar(200)

AS
BEGIN
	SET NOCOUNT ON;
	
	Declare  @SQL varchar(max)
	, @planfilter varchar(50) ,@planZipfilter varchar(100),  @sortProviderfilter varchar(200),@planGroupfilter varchar(200)
	  
	  set @planfilter = '('+convert(varchar, @PlanID,10)+' = 0  or [Plan].PlanID = '+convert(varchar, @PlanID,10)+')'
	 
	  set @planGroupfilter = case @planGroup
	   when '' then ''
	   else 'and ( [PlanGroup].GroupNumber= '''+@planGroup+''')'
	   end

	   if(@Zip = '')
	   begin
	    set  @planZipfilter=''
	   end
	   else
	   begin
	   set @planZipfilter =  'and ( Zip= '''+@Zip+''')'
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
		else 'order by [PLan].PlanID '
		end

set @SQL=	'Select distinct   [Plan].PlanID , convert(varchar,[Plan].PlanID,10)+[PlanGroup].GroupNumber   as GridID,[Plan].SortName as PlanName,
[Plan].Class as plantypecode , PlanClass.Description as PlanTypeName,[PlanGroup].GroupNumber,
  Carrier.Name as CompanyName , Carrier.CarrierID as CarrierID,
		Address.Line1 as Address ,
	Address.City , CountryState.StateCode , CountryState.State , Address.Zip
from [Plan] 
inner join Carrier on Carrier.carriercode = [Plan].carriercode
left outer join [dbo].[LookupCode] as PlanClass on [plan].Class = PlanClass.LookupCode and PlanClass.lookuptype = ''planclass''
left outer join Address on [dbo].[Address].[EntitySID] = [PLan].PlanID 
left outer join CountryState on Address.State = CountryState.StateCode
left outer join PlanGroup on PlanGroup.PlanID = [plan].PlanID
where
'
set @SQL = @SQL+ @planfilter +  @planZipfilter +@planGroupfilter+ @sortProviderfilter
print @SQL
 exec(@SQL)


END
