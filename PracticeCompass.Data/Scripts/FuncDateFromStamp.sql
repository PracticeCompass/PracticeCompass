USE [medman]
GO
/****** Object:  UserDefinedFunction [dbo].[DateFromStamp]    Script Date: 11/13/2021 2:06:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER FUNCTION [dbo].[DateFromStamp]
(
	@Stamp VARCHAR(20)
)
RETURNS DATETIME
AS
BEGIN
	RETURN CASE
		WHEN @Stamp IS NULL THEN NULL
		WHEN @Stamp='' THEN NULL
		ELSE CONVERT(DATE, SUBSTRING(@Stamp,1,4) + '-' + SUBSTRING(@Stamp,5,2) + '-' + SUBSTRING(@Stamp,7,2))
	END
END