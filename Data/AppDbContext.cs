using Microsoft.EntityFrameworkCore;
using MovieListApp.Models;

namespace MovieListApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Aici îi spunem să creeze o tabelă numită "Movies"
        public DbSet<Movie> Movies { get; set; }
    }
}