USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspProviderGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspProviderGet] 
@filter varchar(126)
AS
BEGIN
	SET NOCOUNT ON;
	select  distinct providerID, sortName from [ProcedureEvent] 
         inner join Staff as RenderingStaff on ProcedureEvent.PracticeID = RenderingStaff.PracticeID 
          and ProcedureEvent.StaffID = RenderingStaff.StaffID
		  inner join [Provider] on [Provider].[ProviderID] = RenderingStaff.StaffID
	where ( @filter is null or @filter=''or lastName like @filter+'%' or FirstName like @filter+'%' or SortName like @filter+'%')
	order by SortName
END

GO


