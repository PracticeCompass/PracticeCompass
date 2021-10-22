USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspClaimNotesGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- exec uspPracticeGet ''=============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspClaimNotesGet] 
@ClaimSID int
AS
BEGIN
	SET NOCOUNT ON;
	select ClaimNoteSID,Body,Class from ClaimNote where ClaimSID=@ClaimSID

END

GO


