USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspFilesGet]    Script Date: 7/11/2021 11:01:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspFilesGet] 
@Notes varchar(250),
@isprocessed bit,
@fileName varchar(250),
@fileDate DateTime
AS
BEGIN
select * from ERAFileManager where ( @Notes is null or @Notes='' or Notes like @Notes+'%') and
(@isprocessed is null or IsProcessed=@isprocessed) and (@fileName is null or @fileName='' or FileName like @fileName+ '%')
and (@fileDate is null or FileDate=@fileDate)
END
GO



