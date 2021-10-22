
USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspCountryStateGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspCountryStateGet] 
@statename varchar(42)
AS
BEGIN
	SET NOCOUNT ON;

	select top 20  CountryCode,StateCode,State from CountryState  where ( @statename is null or @statename='' or State like @statename+'%')

	order by State
END

GO


