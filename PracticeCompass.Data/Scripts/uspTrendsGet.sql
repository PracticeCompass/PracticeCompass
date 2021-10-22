USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspTrendsGet]    Script Date: 7/11/2021 11:01:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspTrendsGet] 
@EntityName varchar(50),
@UserID int
AS
BEGIN
delete from Trends where (UserID=@UserID and EntityName =@EntityName and (cast(Timestamp  as date) < cast(GETDATE() as date))and EntityName<>'CPT')
IF @EntityName='Patient'

       SELECT distinct   Trends.EntityValueID as EntityId,Person.SortName as EntityName,searchcount from Trends inner join Person on Person.PersonID=EntityValueID
	   where Trends.UserID=@UserID and Trends.EntityName =@EntityName order by searchcount desc

ELSE if  @EntityName='Insurance'

        SELECT distinct   Trends.EntityValueID as EntityId,Carrier.Name as EntityName,searchcount from Trends inner join Carrier on Carrier.CarrierID=EntityValueID
		where Trends.UserID=@UserID and Trends.EntityName =@EntityName order by searchcount desc

ELSE if  @EntityName='Guarantor'

	  SELECT distinct   Trends.EntityValueID as EntityId,Entity.SortName as EntityName,searchcount from Trends inner join Entity on Entity.EntitySID=EntityValueID
		where Trends.UserID=@UserID and Trends.EntityName =@EntityName and  (Entity.Class = 'c' or Entity.Class='p') order by searchcount desc
ELSE if  @EntityName='Practice'

	  SELECT distinct   Trends.EntityValueID as EntityId,practice.SortName as EntityName,searchcount from Trends inner join practice on practice.practiceid=EntityValueID
		where Trends.UserID=@UserID and Trends.EntityName =@EntityName order by searchcount desc
ELSE if  @EntityName='PatientType'

	  SELECT distinct   Trends.EntityValueID as EntityId,LookupCode.Description as EntityName,searchcount from Trends inner join LookupCode on LookupCode.LookupCode=EntityValueID
		where Trends.UserID=@UserID and Trends.EntityName =@EntityName and  LookupCode.lookuptype = 'PatientClass' order by searchcount desc

ELSE if  @EntityName='Physician'

	  SELECT distinct   Trends.EntityValueID as EntityId,Entity.SortName as EntityName,searchcount from Trends inner join Entity  on Entity.EntitySID=EntityValueID
		where Trends.UserID=@UserID and Trends.EntityName =@EntityName and  Class = 'D' order by searchcount desc
ELSE IF @EntityName='CPT'

       SELECT distinct   Trends.EntityValueID as entityId,[Procedure].Description as entityName,[Procedure].Class as className ,searchcount from Trends inner join [Procedure] on [Procedure].ProcedureCode=EntityValueID
	   where Trends.UserID=@UserID and Trends.EntityName =@EntityName  order by searchcount desc
ELSE IF @EntityName='ICD10'
        SELECT distinct   Trends.EntityValueID as entityId,Diagnosis.Description as entityName ,searchcount from Trends inner join Diagnosis on Diagnosis.DiagnosisCode=EntityValueID
	   where Trends.UserID=@UserID and Trends.EntityName =@EntityName  order by searchcount desc
END
GO



