USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspInsurancePaymentGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Insurance Payment Grid Data
-- exec uspInsurancePaymentGet @PracticeID =73835 , @InsuranceID=916497
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspInsurancePaymentGet] 
	-- Add the parameters for the stored procedure here
    @PracticeID int , @InsuranceID int
AS
BEGIN
select [dbo].[Payment].[PaymentSID] , Practice.SortName as PracticeName , CONVERT(varchar,PostDate,101) as PostDate  , Source , Entity.SortName as PayorName,
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
 where Payment.Source = 'I' and 
 (@PracticeID is null or @PracticeID=0 or Payment.PracticeID=@PracticeID) and
 (@InsuranceID is null or @InsuranceID=0 or Payment.PayorID=@InsuranceID)
 END

