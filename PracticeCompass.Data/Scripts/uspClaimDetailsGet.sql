USE [medman]
GO
/****** Object:  StoredProcedure [dbo].[uspClaimDetailsGet]    Script Date: 8/6/2021 10:29:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================

-- Description:	Get Claim Detail on Claim Grid select
-- exec uspClaimDetailsGet 378051 ,	73829
-- =============================================
Create or Alter   PROCEDURE [dbo].[uspClaimDetailsGet] 
	-- Add the parameters for the stored procedure here
    @ClaimSID int , @PracticeID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   Select top 1 ClaimNumber , Person.SortName , Practice.SortName as PracticeName , Practice.PracticeCode ,Practice.PracticeID,PatientAccount.PatientID as PatientID,Person.PersonID as PersonID,
    Staff.StaffID ,Claim.ParentClaimSID as OriginalCRN , PrimaryCareProvider.ProviderID as PCPID , PrimaryCareProvider.SortName as PCPName,
	providerstaff.ProviderID as StaffID , providerstaff.SortName as StaffName , m.CopayAmount , m.PatientPaid , 
	m.ClaimTotal - m.InsurancePaid - m.PatientPaid - m.Adjustments as BillBalance,
	m.InsurancePaid,m.Adjustments,m.ClaimTotal , Ailment.AccidentRelated , Ailment.EmploymentRelated,
	PlanClaimPrimary.CurrentStatus as PrimaryStatus ,
	PlanClaimSeconadry.CurrentStatus as SeconadryStatus ,
	PlanClaimTertiary.CurrentStatus as TertiaryStatus,
	CONVERT(varchar,PlanClaimPrimary.BilledDate,101)  as PrimaryBilledDate ,
	CONVERT(varchar,PlanClaimSeconadry.BilledDate,101)  as SeconadryBilledDate ,
	CONVERT(varchar,PlanClaimTertiary.BilledDate,101)  as TertiaryBilledDate,
	CONVERT(varchar,Encounter.OccurDate,101) as Lastseen
   from Claim 
   inner join PatientAccount on 
Claim.PracticeID = 
PatientAccount.PracticeID and
Claim.PatientID = 
PatientAccount.PatientID and
Claim.AccountSID = 
PatientAccount.AccountSID
inner join PlanClaim on 
PlanClaim.ClaimSID = 
Claim.ClaimSID
   inner join patient on 
PatientAccount.PracticeID = 
Patient.PracticeID and
PatientAccount.PatientID = 
Patient.PatientID
inner join Practice on Practice.PracticeID=Patient.PracticeID
inner join Person on Person.PersonID=Patient.PatientID
left outer join Encounter on 
Encounter.PracticeID = Patient.PracticeID and
Encounter.PatientID = Patient.PatientID
left outer join Staff on
Encounter.PracticeID = Staff.PracticeID and
Encounter.StaffID = Staff.StaffID
left outer join [Provider] as PrimaryCareProvider 
on Patient.PrimaryCareProviderID = 
PrimaryCareProvider.ProviderID
left outer join PlanClaim as PlanClaimPrimary on PlanClaimPrimary.ClaimSID = Claim.ClaimSID and PlanClaimPrimary.CoverageOrder=1
left outer join PlanClaim as PlanClaimSeconadry on PlanClaimSeconadry.ClaimSID = Claim.ClaimSID and PlanClaimSeconadry.CoverageOrder=2
left outer join PlanClaim as PlanClaimTertiary on PlanClaimTertiary.ClaimSID = Claim.ClaimSID and PlanClaimTertiary.CoverageOrder=3
left outer join [Provider] as providerstaff
on Staff.StaffID = providerstaff.ProviderID
left outer join [dbo].[Ailment] on 
Claim.AilmentSID = 
Ailment.AilmentSID
left outer join 
(select ClaimCharge.ClaimSID ,Charge.PracticeID , sum(Amount) as ClaimTotal , sum(InsuranceReceipts) as InsurancePaid
,sum(GuarantorReceipts) as PatientPaid ,sum(Adjustments) as Adjustments,
sum(CopayAmount) as  CopayAmount
from Charge
inner join ClaimCharge on 
ClaimCharge.ChargeSID = 
Charge.ChargeSID
where ClaimCharge.ClaimSID = @ClaimSID
group by ClaimCharge.ClaimSID  ,Charge.PracticeID) as m

on 
m.ClaimSID = Claim.ClaimSID
and m.PracticeID = Claim.PracticeID

   where Claim.ClaimSID = @ClaimSID 
   Order by Encounter.OccurDate desc
END
