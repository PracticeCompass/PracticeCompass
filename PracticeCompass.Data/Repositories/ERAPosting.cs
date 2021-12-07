using System;
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
                //Get Payment Header
                var ERSPaymentHeader = new ERSPaymentHeader();
                string sql = "SELECT * FROM ERSPaymentHeader WHERE CheckTraceNbr = @CheckTraceNbr";
                ERSPaymentHeader = this.db.QueryFirst<ERSPaymentHeader>(sql, new { CheckTraceNbr = CheckTraceNbr });

                // Get Plan ID
                 sql = "select PlanID from [Plan] where PayerID in(select payerID from payer where EnvoyPayerID = @ESRTracePayerIdent)";
                int PLanID = this.db.QueryFirst<int>(sql, new { ESRTracePayerIdent = ERSPaymentHeader.CheckTraceNbr });
                //Get Charges 
                var ERSChargeReferences = new List<ERSChargeReference>();
                 sql = @"select * from [dbo].[ERSChargeReference] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                            where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID = @ERSPaymentSID )) and ReferenceIDQualifier='6R' ";
                var ERSChargeRef = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeReferences = ERSChargeRef.Read<ERSChargeReference>().ToList();

                //Get Claim Data
                var ERSClaimData = new List<ERSClaimData>();
                sql = @"select * from ERSClaimData where ERSPaymentSID=@ERSPaymentSID";
                var ERSclaim = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSClaimData = ERSclaim.Read<ERSClaimData>().ToList();

                // Get Charge Service info 
                var ERSChargeServiceInfo = new List<ERSChargeServiceInfo>();
                sql = @"select * from [dbo].[ERSChargeServiceInfo]  where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID )";
                var ERSchargeinfo = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeServiceInfo = ERSchargeinfo.Read<ERSChargeServiceInfo>().ToList();

                // Get Charge Claim Adj
                var ERSChargeClaimAdjustment = new List<ERSChargeClaimAdjustment>();
                sql = @"select *from ERSChargeClaimAdjustment  where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                        where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))";
                var ERSchargeAdj = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeClaimAdjustment = ERSchargeAdj.Read<ERSChargeClaimAdjustment>().ToList();

                //Get [ERSChargeMonetaryAmt]
                var ERSChargeMonetaryAmt = new List<ERSChargeMonetaryAmt>();
                sql = @"select * from [dbo].[ERSChargeMonetaryAmt] where ERSChargeSID in (select ERSChargeSID from [dbo].[ERSChargeServiceInfo]  
                            where ERSClaimSID in (select ERSClaimSID from ERSClaimData where ERSPaymentSID=@ERSPaymentSID ))";
                var ERSchargeMonetaryAmt = this.db.QueryMultiple(sql, new { ERSPaymentSID = ERSPaymentHeader.PaymentSID });
                ERSChargeMonetaryAmt = ERSchargeMonetaryAmt.Read<ERSChargeMonetaryAmt>().ToList();

                //Add
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
