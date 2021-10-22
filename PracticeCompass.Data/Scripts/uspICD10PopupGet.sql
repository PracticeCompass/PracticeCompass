USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspICD10PopupGet]    Script Date: 7/11/2021 11:01:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspICD10PopupGet] 
  @filter varchar(200),
  @Skip int
AS
BEGIN
	SET NOCOUNT ON;

	select  COUNT(*) OVER() as totalCount,  [DiagnosisCode],[ShortDescription],[LongDescription] from [dbo].[ICD10Diagnosis]
where @filter='' OR @filter is NULL OR [DiagnosisCode] like @filter+'%' OR [ShortDescription] like @filter+'%' OR [LongDescription] like @filter+'%'
order by [DiagnosisCode],[ShortDescription]
OFFSET @Skip ROWS -- skip 10 rows
FETCH NEXT 500 ROWS ONLY; -- take 10 rows
END
GO


