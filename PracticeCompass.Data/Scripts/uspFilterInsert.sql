USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspFilterInsert]    Script Date: 7/11/2021 12:43:01 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[uspFilterInsert] 
@DisplayName nvarchar(50),
@Body nvarchar(max),
@Entity nvarchar(50),
@Order int,
@userid int
AS
BEGIN
declare @neworder int;
	SET NOCOUNT ON;
	set @neworder = (SELECT CASE WHEN MAX([order]) is null or MAX([order])=0 then 1 else (MAX([order])+1) end  from [Filters] where Entity='patient'); 

INSERT INTO [dbo].[Filters]
           ([DisplayName]
           ,[Body]
           ,[Entity]
           ,[Order]
           ,[CreationDate]
           ,[CreatedBy]
           ,[LastEditDate]
           ,[ModifiedBy])
     VALUES
           (@DisplayName
           ,@Body
           ,@Entity
           ,@neworder
           ,GETDATE()
           ,@userid
           ,GETDATE()
           ,@userid)
END
GO


