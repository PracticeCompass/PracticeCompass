USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspICD10PopupGet]    Script Date: 2021-10-13 12:09:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER      PROCEDURE [dbo].[uspModifierGet] 
AS
BEGIN
	SET NOCOUNT ON;

  select distinct Modifier,[Order] from ProcedureEventModifier 
END
