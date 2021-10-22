
using Microsoft.EntityFrameworkCore;

namespace PracticeCompass.Data.Common
{
    public class TechnoMedicDbContext : DbContext
    {


        public TechnoMedicDbContext(DbContextOptions<TechnoMedicDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
           
        }
    }
}
