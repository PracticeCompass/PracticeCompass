USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspPatientTypeGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPatientTypeGet] 
@description varchar(220)
AS
BEGIN
	SET NOCOUNT ON;

	select  lookupcode, description from[LookupCode] where lookuptype = 'PatientClass'
	 and( @description is null or @description='' or description like @description+'%' or lookupcode like @description+'%')

	order by Description
END

GO


