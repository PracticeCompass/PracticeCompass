USE [medman]
GO

/****** Object:  StoredProcedure [dbo].[uspGuarantoreGet]    Script Date: 7/11/2021 11:01:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--exec uspGuarantorPoupGet 'Freddie'  =============================================
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[uspGuarantorPoupGet] 
@Guarantorname varchar(80)
AS
BEGIN
	SET NOCOUNT ON;

	select distinct top 200 SortName,EntitySID from  Entity where EntitySID in (select GuarantorID from Account)
	and  (@Guarantorname is null or @Guarantorname='' or (SortName like '%'+@Guarantorname+'%' ))
	Order By SortName
END
GO


