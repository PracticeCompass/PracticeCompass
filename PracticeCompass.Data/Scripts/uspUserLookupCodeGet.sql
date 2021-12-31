USE [medman]
GO
--exec [uspUserLookupCodeGet] @LookupType=N'ReferralSource',@isActive=N'I',@lookupCode=N''

--exec [uspUserLookupCodeGet] @LookupType=N'AcctLetterFldGrp',@isActive=N'I',@lookupCode=N''
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
Create or ALTER   PROCEDURE [dbo].[uspUserLookupCodeGet] 
@LookupType varchar(250),
@isActive varchar(50),
@lookupCode varchar(250)
AS
BEGIN
Declare  @isActiveFilter varchar(50) 
 set @isActiveFilter = case @isActive
 when 'I' then ''
 when 'A' then 'A'
 else ''
 end

select (LookupType+ LookupCode) as gridId, LookupType,LookupCode,[order],[Description],CASE WHEN RecordStatus = 'A' THEN 'true'
ELSE 'false' END AS RecordStatus  from userLookupCode  where (lookupType = @LookupType) and
(@isActiveFilter=''or @isActiveFilter is null or RecordStatus=@isActiveFilter) and (@lookupCode is null or @lookupCode='' or LookupCode like @lookupCode+ '%')
order by [order]
END
