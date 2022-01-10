USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspInsurancePaymentGet]    Script Date: 10/10/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Insurance Payment Grid Data
-- exec uspInsurancePaymentGet @PracticeID =73835 , @InsuranceID=916497, @DateType=0,@Datevalue='' , @Fullyapplied=1
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspInsurancePaymentGet] 
	-- Add the parameters for the stored procedure here
@PracticeID int , @InsuranceID int, 
@DateType int,
@Datevalue varchar(12),
@totxnDate varchar(12),
@Fullyapplied int,
@amountType int,
@amount int,
@SortColumn varchar(50),
@SortDirection varchar(50)
AS
BEGIN
Declare  @SQL varchar(max), @Datefilter varchar(50) ,@Fullyappliedfilter varchar(50),@sortPaymentfilter varchar(200)

 	set @Datefilter=Case @DateType 
		when 1 then 'and (PostDate =  '''+@Datevalue+''' )'
		when 2 then 'and (PostDate < '''+@Datevalue+''' )'
		when 3 then 'and (PostDate > '''+@Datevalue+''' )'
		when 4 then 'and (PostDate between  '''+@Datevalue+''' and  '''+@totxnDate+''')'
		else ''
		end

		set @Fullyappliedfilter=Case @Fullyapplied
		when 0 then 'and (FullyApplied = ''N'')'
		when 1 then 'and (FullyApplied = ''Y'')'
		else 'and (FullyApplied = ''N'')'
		end
        set  @sortPaymentfilter= Case @SortColumn
	   	when 'amount' then 'order by Amount '+@SortDirection+''
		when 'remaining' then 'order by remaining '+@SortDirection+''
		when 'payorName' then 'order by PayorName '+@SortDirection+''
		when 'postDate' then 'order by postDate '+@SortDirection+''
		when 'fullyApplied' then 'order by FullyApplied '+@SortDirection+''
		when 'practiceName' then 'order by PracticeName '+@SortDirection+''
		when 'payMethod' then 'order by PayMethod '+@SortDirection+''
		when 'paymentClass' then 'order by paymentClass '+@SortDirection+''
		when 'createMethod' then 'order by CreateMethod '+@SortDirection+''
		else 'Order by Practice.SortName, [dbo].[Payment].[PaymentSID], Amount '
		end

set @SQL='select [dbo].[Payment].[PaymentSID] , Practice.SortName as PracticeName , Practice.PracticeID as PracticeID, CONVERT(varchar,PostDate,101) as PostDate  , Source , Entity.SortName as PayorName,Entity.EntitySID as payorID,
LookupCode.Description as paymentClass , Amount , PayMethod.Description as PayMethod , CASE WHEN FullyApplied = ''Y'' THEN ''true''
ELSE ''false'' END AS FullyApplied  , Voucher , 
case when CreateMethod=''M'' then ''Manual''
     when CreateMethod=''E'' then ''ERS ERA - Electronic Remittance Advice''
	 when CreateMethod=''A'' then ''ESR -Electronic Statement Remittance''
	 else '''' end as CreateMethod,
	 (Amount-isNull(m.assigmentamount,0)) as Remaining
from Payment inner join Practice on 
Payment.practiceID = Practice.PracticeID
inner join Entity on Payment.PayorID = Entity.EntitySID
left outer join LookupCode on LookupCode.LookupCode=Payment.class and LookupType=''PayClass''
 left outer join LookupCode as PayMethod on [dbo].[Payment].Method = PayMethod.LookupCode and  PayMethod.LookupType=''PayMethod''
  left outer join (select SUM(amount) as assigmentamount ,PaymentSID as assigmentPaymentSID from PaymentAssignment group by PaymentSID )m 
 on m.assigmentPaymentSID = Payment.PaymentSID
 where Payment.Source = ''I'' and 
 ('+convert(varchar,@PracticeID,10)+' is null or '+convert(varchar,@PracticeID,10)+'=0 or Payment.PracticeID='+convert(varchar,@PracticeID,10)+') and
 ('+convert(varchar,@InsuranceID,10)+' is null or '+convert(varchar,@InsuranceID,10)+'=0 or Payment.PayorID='+convert(varchar,@InsuranceID,10)+')'

 set @SQL = @SQL + @Datefilter + @Fullyappliedfilter + @sortPaymentfilter
 print @SQL
 exec(@SQL)

 END

