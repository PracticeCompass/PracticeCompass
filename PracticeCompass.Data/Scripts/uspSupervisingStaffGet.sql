USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspProviderGet]    Script Date: 7/10/2021 11:29:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspSupervisingStaffGet] 
@Entity varchar(126),
@Skip int
AS
BEGIN
	SET NOCOUNT ON;
	select distinct providerID, sortName from [ProcedureEvent] 
         inner join Staff as SupervisingStaff on ProcedureEvent.PracticeID = SupervisingStaff.PracticeID 
          and ProcedureEvent.SupervisingStaffID = SupervisingStaff.StaffID
		  inner join [Provider] on [Provider].[ProviderID] = SupervisingStaff.StaffID
	where ( @Entity is null or @Entity=''or lastName like @Entity+'%' or FirstName like @Entity+'%' or SortName like @Entity+'%')

	order by SortName

END

GO


