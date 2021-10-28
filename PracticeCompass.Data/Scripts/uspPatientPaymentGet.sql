USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspPatientPaymentGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Patient Payment Grid Data
-- exec uspPatientPaymentGet @PracticeID =142690 , @PatientID=886880
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspPatientPaymentGet] 
	-- Add the parameters for the stored procedure here
    @PracticeID int , @PatientID int
AS
BEGIN
select [dbo].[Payment].[PaymentSID] , Practice.SortName as PracticeName , CONVERT(varchar,PostDate,101) as PostDate , Source , Entity.SortName as PayorName,
LookupCode.Description as paymentClass , Amount , PayMethod.Description as PayMethod , FullyApplied , Voucher , 
case when CreateMethod='M' then 'Manual'
     when CreateMethod='E' then 'ERS ERA - Electronic Remittance Advice'
	 when CreateMethod='A' then 'ESR -Electronic Statement Remittance'
	 else '' end as CreateMethod
from Payment inner join Practice on 
Payment.practiceID = Practice.PracticeID
inner join Entity on Payment.PayorID = Entity.EntitySID
left outer join LookupCode on LookupCode.LookupCode=Payment.class and LookupType='PayClass'
 left outer join LookupCode as PayMethod on [dbo].[Payment].Method = PayMethod.LookupCode and  PayMethod.LookupType='PayMethod'
 where Payment.Source = 'G' and 
 (@PracticeID is null or @PracticeID=0 or Payment.PracticeID=@PracticeID) and
 (@PatientID is null or @PatientID=0 or Payment.PayorID=@PatientID)
 END

