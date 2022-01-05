USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspCptCodesGet]    Script Date: 7/11/2021 11:01:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspCptCodesGet] 
  @cptCode varchar(200)
AS
BEGIN
	SET NOCOUNT ON;

	select distinct [Procedure].ProcedureCode,[Procedure].class as className,[Procedure].[Description]  from [Procedure] 
	where (@cptCode is null or @cptCode='' or [Procedure].[Description] like @cptCode+'%' or ProcedureCode like @cptCode+'%')
END
GO


