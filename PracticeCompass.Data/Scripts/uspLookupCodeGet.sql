USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspLookupCodeGet]    Script Date: 2021-12-12 6:52:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
Create or ALTER   PROCEDURE [dbo].[uspLookupCodeGet] 
@LookupType varchar(250),
@isActive varchar(50),
@lookupCode varchar(250)
AS
BEGIN
select * from LookupCode where ( @LookupType is null or @LookupType='' or lookupType like @LookupType+'%') and
(@isActive is null or RecordStatus=@isActive) and (@lookupCode is null or @lookupCode='' or LookupCode like @lookupCode+ '%')
order by [order]
END
