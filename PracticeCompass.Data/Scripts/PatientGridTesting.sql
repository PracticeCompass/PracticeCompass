--USE [medman]
--GO
----918958	PATIENT	Shannon	05/22/1969	1740.00	96 West 43rd Street, #1	Bayonne	NJ	07002		581673	99	INSUR	400219
--DECLARE @RC int
--DECLARE @PatientID int = 918958
--DECLARE @practiceID int=400219
--DECLARE @DOBType int=0
--DECLARE @DOBvalue varchar(50)=''
--DECLARE @PatientClass varchar(12)='INSUR'
--DECLARE @BalanceType int=0
--DECLARE @BalanceValue decimal(18,0)=1740
--DECLARE @InsuranceType int=1
--DECLARE @InsurancID int=640667

---- TODO: Set parameter values here.

--EXECUTE @RC = [dbo].[uspPatientGridGet] 
--   @PatientID
--  ,@practiceID
--  ,@DOBType
--  ,@DOBvalue
--  ,@PatientClass
--  ,@BalanceType
--  ,@BalanceValue
--  ,@InsuranceType
--  ,@InsurancID
--GO


