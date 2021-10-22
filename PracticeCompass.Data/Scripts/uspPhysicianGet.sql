
USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspPhysicianGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPhysicianGet] 
@sortname varchar(126),
@Skip int
AS
BEGIN
	SET NOCOUNT ON;

	select COUNT(*) OVER() as totalCount,  EntitySID,SortName from Entity where Class = 'D' and( @sortname is null or @sortname='' or sortname like @sortname+'%')

	order by SortName
		OFFSET @Skip ROWS -- skip 10 rows
    FETCH NEXT 500 ROWS ONLY; -- take 10 rows
END

GO


