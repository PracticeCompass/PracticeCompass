USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspInsuranceTypesGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspInsuranceTypesGet] 
@description varchar(220)
AS
BEGIN
	SET NOCOUNT ON;

	select top 20  lookupcode, description from [dbo].[LookupCode] where lookuptype = 'InsuranceType' and RecordStatus = 'A' and( @description is null or @description='' or description like @description+'%')

	order by Description
END

GO


