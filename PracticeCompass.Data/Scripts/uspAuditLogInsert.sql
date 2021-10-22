USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspAuditLogInsert]    Script Date: 9/27/2021 11:44:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Procedures Name: uspAuditLogInsert--



CREATE OR ALTER procedure [dbo].[uspAuditLogInsert] 
		@Audit_PatientID varchar(28) , 
		@Audit_PatientName varchar(120), 
		@Audit_EncounterSID int, 
		@Audit_ProcedureEventSID int, 
		@Audit_ProcedureName varchar(150), 
		@Audit_UserName varchar(50), 
		@Audit_Type varchar(50), --Delete Log On New Update
		@Audit_Location varchar(50), --application Name "Billing Module"
		@Audit_Module varchar(50), -- Patient list  , Claim List 
		@Audit_Practice varchar(120),
		@Audit_Comment varchar(1000)
AS  

INSERT INTO [dbo].[AuditLog]
           ([Audit_PatientID]
           ,[Audit_PatientName]
           ,[Audit_EncounterSID]
           ,[Audit_ProcedureEventSID]
           ,[Audit_ProcedureName]
           ,[Audit_UserName]
           ,[Audit_Date]
           ,[Audit_Type]
           ,[Audit_Location]
           ,[Audit_Module]
           ,[Audit_Practice]
           ,[Audit_Comment])
     VALUES
           (@Audit_PatientID
           ,@Audit_PatientName
           ,@Audit_EncounterSID
		   ,@Audit_ProcedureEventSID
           ,@Audit_ProcedureName
           ,@Audit_UserName
           ,getdate()
           ,@Audit_Type
           ,@Audit_Location
           ,@Audit_Module
           ,@Audit_Practice
           ,@Audit_Comment)
GO


