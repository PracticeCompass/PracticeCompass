USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspLookupType]    Script Date: 2021-12-12 6:37:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- exec uspPracticeGet ''=============================================
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspUserLookupType] 
@search varchar(120)
AS
BEGIN
	SET NOCOUNT ON;

	select  LookupType , Description , DescriptionLabel from userLookupType
	where @search is null or @search='' or LookupType like @search+'%' or [Description] like @search+'%'
	Order By LookupType
END

