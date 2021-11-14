USE [medman]
GO
/****** Object:  UserDefinedFunction [dbo].[GetStampFromDate]    Script Date: 11/13/2021 2:06:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER  FUNCTION [dbo].[GetStampFromDate]
(
	@Date DATETIME
)
RETURNS VARCHAR(15)
AS
BEGIN
	DECLARE @Today DATE = @Date
	RETURN CONVERT(VARCHAR(8), @Date, 112)+'-'+REPLACE(STR(DATEDIFF(SECOND, @Today, @Date),5), ' ', '0')
END
