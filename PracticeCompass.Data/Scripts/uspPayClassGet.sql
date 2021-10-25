USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPayClassGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Payment Class Lookup
-- exec uspPayClassGet 
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspPayClassGet] 
	-- Add the parameters for the stored procedure here

AS
BEGIN
select LookupCode,Description,[Order] from LookupCode where LookupType='payclass' and RecordStatus ='A' order by [Order]
END