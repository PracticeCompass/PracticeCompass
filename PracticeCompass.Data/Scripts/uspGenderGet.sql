
USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspGenderGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspGenderGet] 
@description varchar(120)
AS
BEGIN
	SET NOCOUNT ON;

	select lookupcode, description from [dbo].[LookupCode] where lookuptype = 'Gender'
		and( @description is null or @description='' or description like @description+'%')
END

GO


