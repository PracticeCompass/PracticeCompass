USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPlanGroupGet]    Script Date: 2021-12-02 1:49:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 CREATE OR ALTER  PROCEDURE [dbo].[uspPlanGroupGet] 
  @search varchar(220)
AS
BEGIN
	SET NOCOUNT ON;
	select top(30) PlanID,GroupNumber,GroupName  from PlanGroup where @search is Null OR @search ='' OR GroupNumber like @search+'%'

END