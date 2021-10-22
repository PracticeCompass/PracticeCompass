USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspFilterUpdate]    Script Date: 7/11/2021 12:46:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- =============================================
CREATE OR ALTER     PROCEDURE [dbo].[uspFilterUpdate] 
@filterID int ,
@DisplayName nvarchar(50),
@Body nvarchar(max),
@Entity nvarchar(50),
@Order int,
@userid int
AS
BEGIN
	SET NOCOUNT ON;

update [dbo].[Filters]
set [DisplayName] = @DisplayName
    ,[Body] = @Body
    --,[Order] = @Order
    ,[LastEditDate] = GETDATE()
    ,[ModifiedBy] = @userid
	Where [FilterID]=@filterID
    
END
GO


