﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Transactions;
using Dapper;
using PracticeCompass.Common.Models;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Models.ERS;
using PracticeCompass.Core.Repositories;
using System.Linq;
using System.IO;

namespace PracticeCompass.Data.Repositories
{
    public class ERAPostingRepository : IERAPosting
    {
        private IDbConnection db;
        public ERAPostingRepository(string connString)

        {
            this.db = new SqlConnection(connString);
        }
        public Task AddAsync(ERSClaimAdjustment entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<ERSClaimAdjustment> entities)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ERSClaimAdjustment>> FindAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<ERSClaimAdjustment> FirstOrDefaultAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ERSClaimAdjustment>> GetAllAsync(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public bool PostERA(string CheckTraceNbr)
        {
            try
            {
                var practiceCompassHelper = new Utilities.PracticeCompassHelper(this.db);
                var timestamp = practiceCompassHelper.GetTimeStampfromDate(DateTime.Now);
                //Get Payment Header 1 record
                #region Get_PaymentHeader
                var ERSPaymentHeader = new ERSPaymentHeader();
                string sql = "SELECT * FROM ERSPaymentHeader WHERE CheckTraceNbr = @CheckTraceNbr";
                ERSPaymentHeader = this.db.QueryFirst<ERSPaymentHeader>(sql, new { CheckTraceNbr = CheckTraceNbr }); 
                #endregion

                // Get Plan ID
                sql = "select PlanID from [Plan] where PayerID in(select payerID from payer where EnvoyPayerID = @ESRTracePayerIdent)";
                int PLanID = this.db.QueryFirst<int>(sql, new { ESRTracePayerIdent = ERSPaymentHeader.CheckTraceNbr });
                //Get Charges 
                #region Get_Charges
                var ERSChargeReferences = new List<ERSChargeReference>();
                sql = @"select * from [dbo].[ERSChargeReference] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                            where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID = @ERSPaymentSID )) and ReferenceIDQualifier='6R' ";
                var ERSChargeRef = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeReferences = ERSChargeRef.Read<ERSChargeReference>().ToList(); 
                #endregion

                //Get Claim Data
                #region Get_ClaimData
                var ERSClaimData = new List<ERSClaimData>();
                sql = @"select * from ERSClaimData where ERSPaymentSID=@ERSPaymentSID";
                var ERSclaim = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSClaimData = ERSclaim.Read<ERSClaimData>().ToList(); 
                #endregion

                // Get Charge Service info 
                #region Get_ChargeServiceInfo
                var ERSChargeServiceInfo = new List<ERSChargeServiceInfo>();
                sql = @"select * from [dbo].[ERSChargeServiceInfo]  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )";
                var ERSchargeinfo = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeServiceInfo = ERSchargeinfo.Read<ERSChargeServiceInfo>().ToList(); 
                #endregion

                // Get Charge Claim Adj
                #region Get_ChargeClaimAdj
                var ERSChargeClaimAdjustment = new List<ERSChargeClaimAdjustment>();
                sql = @"select *from ERSChargeClaimAdjustment  where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                        where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))";
                var ERSchargeAdj = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeClaimAdjustment = ERSchargeAdj.Read<ERSChargeClaimAdjustment>().ToList(); 
                #endregion

                //Get [ERSChargeMonetaryAmt]
                #region Get_ERSChargeMonetaryAmt
                var ERSChargeMonetaryAmt = new List<ERSChargeMonetaryAmt>();
                sql = @"select * from [dbo].[ERSChargeMonetaryAmt] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                            where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))";
                var ERSchargeMonetaryAmt = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeMonetaryAmt = ERSchargeMonetaryAmt.Read<ERSChargeMonetaryAmt>().ToList();
                #endregion

                //GetPlanClaim 1 record
                var PlanClaim = new PlanClaim();
                sql = "select * from PlanClaim where PlanICN== @PlanICN";
               // PlanClaim = this.db.QueryFirst<PlanClaim>(sql, new { PlanICN = PlanICN });
                //select PlanClaimCharge.* from PlanClaimCharge inner join PlanClaim on PlanClaim.PlanID = PlanClaimCharge.PlanID
                //and PlanClaim.ClaimSID = PlanClaimCharge.ClaimSID and PlanClaim.PolicyNumber = PlanClaimCharge.PolicyNumber
                //where PlanICN in (select PayerClaimControlNumber from ERSClaimData where ERSPaymentSID = 605884 )


                //Add Payment Record
                // Update PaymentHeader add Payment SID

                //Update PLanClaim 
                //Insert Plan Claim Data 
                foreach (var ERSCharge in ERSChargeReferences)
                {
                    //Get Charge
                    var Charge = new Charge();
                    sql = "select * from charge where ChargeSID= = @ChargeSID";
                    Charge = this.db.QueryFirst<Charge>(sql, new { ChargeSID = ERSCharge.ReferenceID });
                    
                    //update Charge update insurance reciept  ,approved amount 
                    //Charge.ApprovedAmount=
                    //Charge.InsuranceReceipts=

                    //update adjustment
                    //Add Charge Activity 
                }

                var PlanClaimChargeMonetaryAmt = new List<PlanClaimChargeMonetaryAmt>();
                foreach (var ERSChargemontAmt in ERSChargeMonetaryAmt)
                {
                    string PlanClaimChargeMonetaryAmtMAXRowID = practiceCompassHelper.GetMAXprrowid("ChargeActivity", PlanClaimChargeMonetaryAmt.Count() != 0 ? PlanClaimChargeMonetaryAmt[PlanClaimChargeMonetaryAmt.Count() - 1].prrowid : "0");

                    PlanClaimChargeMonetaryAmt.Add(new PlanClaimChargeMonetaryAmt
                    {
                        
                        CreateUser = 88,
                        LastUser = 88,
                        pro2created = DateTime.Now,
                        pro2modified = DateTime.Now,
                        Pro2SrcPDB = "medman",
                        prrowid = PlanClaimChargeMonetaryAmtMAXRowID,
                        Amount= ERSChargemontAmt.ServiceSupplementalAmt,
                        ChargeSID= Convert.ToInt32(ERSChargeReferences.FirstOrDefault(x=>x.ERSChargeSID == ERSChargemontAmt.ERSChargeSID).ReferenceID),
                        CreateMethod="R",
                        CreateStamp= timestamp,
                        TimeStamp=timestamp,
                        QualifierCode= ERSChargemontAmt.AmtQualifierCode,
                        

                    });
                }




                return true;
            }
            catch (Exception ex )
            {

                return false;
            }
        }

        public void Remove(ERSClaimAdjustment entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<ERSClaimAdjustment> entities)
        {
            throw new NotImplementedException();
        }

        public Task<ERSClaimAdjustment> SingleOrDefaultAsync(Expression<Func<ERSClaimAdjustment, bool>> predicate, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }
    }
}
