USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspFiltersCheck]    Script Date: 7/15/2021 1:35:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- =============================================
CREATE OR ALTER      PROCEDURE [dbo].[uspFiltersCheck]

@Entity nvarchar(50),
@DisplayName nvarchar(50)
AS
BEGIN

select top 1 FilterID from  [dbo].[Filters]
	Where Entity=@Entity and(  DisplayName = @DisplayName) 
    
END
