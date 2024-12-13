using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace tweeter_api.Models;

public class User 
{
    [JsonIgnore]
    public int tweeterId { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
    [Required]
    public string? Username { get; set; }
    [Required]
    public string? Bio { get; set; }
    [Url]
    public string? ProfilePicture { get; set; }
    public string[]? following { get; set; }

    public ICollection<Tweet>? Tweets { get; set; }
}