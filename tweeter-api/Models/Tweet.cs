using System.ComponentModel.DataAnnotations;

namespace tweeter_api.Models;

public class Tweet 
{
    public int TweetId { get; set; }
    [Required]
    public string? Title { get; set; }
    public DateTime? createdAt { get; set; }
    public DateTime? editedAt { get; set; }
    [Required]

    public string? TweetBody { get; set; }
    [Required]

    public int? TweeterId { get; set; }
    public User? Tweeter { get; set; }
}