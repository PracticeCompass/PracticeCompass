USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspFiltersGet]    Script Date: 7/15/2021 1:35:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- =============================================
CREATE OR ALTER      PROCEDURE [dbo].[uspFiltersGet]

@Entity nvarchar(50),
@DisplayName nvarchar(50)
AS
BEGIN

select FilterID,DisplayName,body from  [dbo].[Filters]
	Where Entity=@Entity and( @DisplayName is null or @DisplayName='' or DisplayName like @DisplayName+'%') order by [Order]
    
END
