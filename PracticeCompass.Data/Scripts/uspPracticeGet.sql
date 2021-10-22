USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspPracticeGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- exec uspPracticeGet ''=============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspPracticeGet] 
@practicename varchar(120)
AS
BEGIN
	SET NOCOUNT ON;

	select  practiceid , sortname , PracticeCode from practice
	where (@practicename is null or @practicename='' or sortname like @practicename+'%') and
	( sortname not like '%PM' )
	Order By SortName
END

GO


