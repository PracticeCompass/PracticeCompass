USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPositionGet]     ******/
--exec uspPositionGet @name=N''
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER   PROCEDURE [dbo].[uspPositionGet] 

AS
BEGIN
	SET NOCOUNT ON;

	select PositionCode,Name  from Position 

END