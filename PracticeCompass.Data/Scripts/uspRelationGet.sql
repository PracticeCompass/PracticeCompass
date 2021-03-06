USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspRelationGet]    Script Date: 2021-09-20 2:47:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspRelationGet] 
@description varchar(120)
AS
BEGIN
	SET NOCOUNT ON;

	select lookupcode, description from [dbo].[LookupCode] where lookuptype = 'Relation'
		and( @description is null or @description='' or description like @description+'%') and description != 'Self' and RecordStatus='A'
END

