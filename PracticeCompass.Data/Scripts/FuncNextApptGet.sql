USE [medman]
GO

/****** Object:  UserDefinedFunction [dbo].[FuncNextApptGet]    Script Date: 7/18/2021 3:30:35 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER FUNCTION [dbo].[FuncNextApptGet]
(
	@PatientID int
)
RETURNS Datetime
AS
BEGIN
	-- Declare the return variable here
	DECLARE @ApptDateTime Datetime

	-- Add the T-SQL statements to compute the return value here
	select  top 1 @ApptDateTime=ApptDate from Appointment where PatientID=@PatientID and ApptDate > GETDATE()
	and   apptstatus ='P' and reasoncode !='abort'
	order by ApptDate

	-- Return the result of the function
	RETURN @ApptDateTime

END
GO


