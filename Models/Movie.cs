namespace MovieListApp.Models
{
    public class Movie
    {
        public int Id { get; set; } // Aceasta va fi cheia primară în baza de date
        public string Title { get; set; }
        public string Genre { get; set; }
        public int Year { get; set; }
    }
}