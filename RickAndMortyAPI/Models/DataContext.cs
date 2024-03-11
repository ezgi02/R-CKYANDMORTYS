using Microsoft.EntityFrameworkCore;

namespace RickAndMortyAPI.Models
{
    public class DataContext:DbContext
    {
        public DbSet<Character> Characters { get; set; }
        public DbSet<Episode> Episodes { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}
