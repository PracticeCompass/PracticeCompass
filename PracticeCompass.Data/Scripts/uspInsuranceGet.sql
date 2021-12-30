
USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspInsuranceGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspInsuranceGet] 
@sortname varchar(126),
@skip int
AS
BEGIN
	SET NOCOUNT ON;

	--select top 20  EntitySID,SortName,prrowid from Entity where Class = 'I' and( @sortname is null or @sortname='' or sortname like @sortname+'%')
select COUNT(*) OVER() as totalCount, PlanID as entitySID,CarrierCode,SortName,prrowid,Code as PlanCode from [Plan] where  (@sortname is null or @sortname='' or SortName like @sortname+'%' ) 
order by SortName
--OFFSET @Skip ROWS -- skip 10 rows
--FETCH NEXT 500 ROWS ONLY; -- take 10 rows
END

GO


