using System.ComponentModel.DataAnnotations;

namespace tweeter_api.Models;

public class Tweet 
{
    public int TweetId { get; set; }
    [Required]
    public string? Title { get; set; }
    [Required]

    public string? TweetBody { get; set; }
    [Required]

    public string? TweeterId { get; set; }
}