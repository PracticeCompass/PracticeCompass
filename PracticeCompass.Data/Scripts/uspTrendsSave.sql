USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspTrendsSave]    Script Date: 7/11/2021 11:01:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspTrendsSave] 
@EntityName varchar(50),
@UserID int,
@EntityValueID varchar(100)
AS
BEGIN
IF(NOT EXISTS(select TrendID from Trends where EntityName=@EntityName and UserID=@UserID and EntityValueID= @EntityValueID))
BEGIN
INSERT INTO [dbo].[Trends]
           ([EntityName]
           ,[EntityValueID]
           ,[UserID]
           ,[Timestamp]
           ,[LastEditDate]
           ,[searchcount])
     VALUES
           (@EntityName,
           @EntityValueID,
           @UserID,
           GETDATE()
           ,GETDATE()
           ,1)
		   END
		   else 
		   BEGIN
		    update Trends set searchcount=searchcount+1 where EntityName=@EntityName and UserID=@UserID and EntityValueID= @EntityValueID

		   END

END
GO


