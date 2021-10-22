USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspFilterDelete]    Script Date: 7/11/2021 12:47:54 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- =============================================
CREATE OR ALTER     PROCEDURE [dbo].[uspFilterDelete] 
@filterID int
AS
BEGIN
	SET NOCOUNT ON;

Delete from  [dbo].[Filters]
	Where [FilterID]=@filterID
    
END
GO


