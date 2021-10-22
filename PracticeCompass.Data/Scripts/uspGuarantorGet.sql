USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspGuarantorGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspGuarantorGet] 
@Entity varchar(126),
@Skip int
AS
BEGIN
	SET NOCOUNT ON;

	select COUNT(*) OVER() as totalCount, EntitySID,SortName from entity where (Class = 'c' or Class='p') and( @Entity is null or @Entity='' or SortName like @Entity+'%')

	order by SortName
	OFFSET @Skip ROWS -- skip 10 rows
    FETCH NEXT 500 ROWS ONLY; -- take 10 rows
END

GO


