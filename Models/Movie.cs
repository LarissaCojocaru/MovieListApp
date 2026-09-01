namespace MovieListApp.Models
{
    public class Movie
    {
        public int Id { get; set; } // Primary key
        public string Title { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public int Year { get; set; }
    }
}