using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PracticeCompass.Core.Common;
using PracticeCompass.Core.Models;
using PracticeCompass.Core.Repositories;

namespace PracticeCompass.Data.Repositories
{
    public class ChargeDetailsRepository : IChargeDetailsRepository
    {
        private IDbConnection db;
        public ChargeDetailsRepository(string connString)
           
        { this.db = new SqlConnection(connString); }


        public Task AddAsync(ChargeDetails entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<ChargeDetails> entities)
        {
            throw new NotImplementedException();
        }

        public ChargeDetails ChargeDetailsGet(int ChargeSID)
        {

            var data = this.db.QueryMultiple("uspChargeDetailsGet", new
            {
                @ChargeSID = ChargeSID
            },
               commandType: CommandType.StoredProcedure);
            return data.Read<ChargeDetails>().FirstOrDefault();
        }

        public List<ChargeActivityDTO> ChargeActivityGet(int ChargeSID)
        {
            var data = this.db.QueryMultiple("uspChargeActivityGet", new
            {
                @ChargeSID = ChargeSID,
            },
               commandType: CommandType.StoredProcedure);
            return data.Read<ChargeActivityDTO>().ToList();
        }

        public Task<int> CountAsync(Expression<Func<ChargeDetails, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public List<ICD10> ICD10PopupGet(string filter,int skip)
        {
            var data = this.db.QueryMultiple("uspICD10PopupGet", new
            {
                @filter = filter,
                @Skip= skip
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<ICD10>().ToList();
        }

        public List<Reading> ProviderGet(string filter)
        {
            var data = this.db.QueryMultiple("uspProviderGet", new
            {
                @filter = filter
            },
             commandType: CommandType.StoredProcedure);
            return data.Read<Reading>().ToList();
        }
        public List<Modifier> ModifierGet()
        {
            var data = this.db.QueryMultiple("uspModifierGet", new
            {
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<Modifier>().ToList();
        }
        public List<CPTCode> CptCodesGet(string cptCode)
        {
            var data = this.db.QueryMultiple("uspCptCodesGet", new
            {
                @cptCode = cptCode
            },
                commandType: CommandType.StoredProcedure);
            return data.Read<CPTCode>().ToList();
        }
        public  bool ChargeDetailsUpdate(ChargeDetails chargeDetails)
        {
            var data = this.db.QueryMultiple("uspChargeDetailsUpdate", new
            {
                @ChargeSID = chargeDetails.ChargeSID,
                @ProcedureCode = chargeDetails.ProcedureCode,
                @Units = chargeDetails.Units,
                @Amount = chargeDetails.Amount,
                @FromServiceDate = chargeDetails.FromServiceDate,
                @ToServiceDate = chargeDetails.ToServiceDate,
                @RecordStatus = chargeDetails.RecordStatus,
                @Modifier1 = chargeDetails.Modifier1,
                @Modifier2 = chargeDetails.Modifier2,
                @Modifier3 = chargeDetails.Modifier3,
                @Modifier4 = chargeDetails.Modifier4,
                @CurrentStatus = chargeDetails.CurrentStatus,
                @Diag1 = chargeDetails.Diag1,
                @Diag2 = chargeDetails.Diag2,
                @Diag3 = chargeDetails.Diag3,
                @Diag4 = chargeDetails.Diag4,
                @Diag5 = chargeDetails.Diag5,
                @Diag6 = chargeDetails.Diag6,
                @Diag7 = chargeDetails.Diag7,
                @Diag8 = chargeDetails.Diag8,
                @AuthorizationNumber = chargeDetails.AuthorizationNumber,
                @RenderingID = chargeDetails.RenderingID,
                @SupervisingID = chargeDetails.SupervisingID,
                @ApprovedAmount = chargeDetails.ApprovedAmount,
                @PatientPaid = chargeDetails.PatientPaid,
                @InsurancePaid = chargeDetails.InsurancePaid,
                @userID = 0


            }, commandType: CommandType.StoredProcedure);
            return true;
        }

        public void Remove(ChargeDetails entity)
        {
            throw new NotImplementedException();
        }


        public void RemoveRange(IEnumerable<ChargeDetails> entities)
        {
            throw new NotImplementedException();
        }


        Task<IEnumerable<ChargeDetails>> IRepository<ChargeDetails>.FindAsync(Expression<Func<ChargeDetails, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<ChargeDetails> IRepository<ChargeDetails>.FirstOrDefaultAsync(Expression<Func<ChargeDetails, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<ChargeDetails>> IRepository<ChargeDetails>.GetAllAsync(bool trackChanges)
        {
            throw new NotImplementedException();
        }

        Task<ChargeDetails> IRepository<ChargeDetails>.SingleOrDefaultAsync(Expression<Func<ChargeDetails, bool>> predicate, bool trackChanges)
        {
            throw new NotImplementedException();
        }
       
    }
}
