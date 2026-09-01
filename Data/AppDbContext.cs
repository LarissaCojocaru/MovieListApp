using Microsoft.EntityFrameworkCore;
using MovieListApp.Models;

namespace MovieListApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Maps to a "Movies" table in the database.
        public DbSet<Movie> Movies { get; set; }
    }
}