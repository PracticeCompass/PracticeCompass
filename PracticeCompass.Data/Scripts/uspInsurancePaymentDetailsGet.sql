USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspInsurancePaymentDetailsGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Insurance Payment Grid Data
-- exec uspInsurancePaymentDetailsGet @PaymentSID =572430 
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspInsurancePaymentDetailsGet] 
	-- Add the parameters for the stored procedure here
    @PaymentSID int 
AS
BEGIN
select top 1  [dbo].[Payment].[PaymentSID] , Practice.SortName as PracticeName , Practice.PracticeID 
, CONVERT(varchar,PostDate,101) as PostDate 
, Source , Entity.SortName as PayorName,Entity.EntitySID as PayorID , 
LookupCode.Description as paymentClass , LookupCode.LookupCode as paymentClasscode
, Amount , PayMethod.Description as PayMethod , PayMethod.LookupCode as Paymentmethodcode , Payment.Voucher , payment.AuthorizationCode
, FullyApplied , Voucher , Payment.CreditCard, CreditCard.Description as CreditCardname,
case when CreateMethod='M' then 'Manual'
     when CreateMethod='E' then 'ERS ERA - Electronic Remittance Advice'
	 when CreateMethod='A' then 'ESR -Electronic Statement Remittance'
	 else '' end as CreateMethod
from Payment inner join Practice on 
Payment.practiceID = Practice.PracticeID
inner join Entity on Payment.PayorID = Entity.EntitySID
left outer join LookupCode on LookupCode.LookupCode=Payment.class and LookupType='PayClass'
 left outer join LookupCode as PayMethod on [dbo].[Payment].Method = PayMethod.LookupCode and  PayMethod.LookupType='PayMethod'
 left outer join LookupCode as CreditCard on Payment.CreditCard=CreditCard.LookupCode and  CreditCard.LookupType='CreditCard'
 where PaymentSID = 572430

 END

