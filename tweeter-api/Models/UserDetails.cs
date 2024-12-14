using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace tweeter_api.Models;

public class UserDetails 
{
    [JsonIgnore]
    public int tweeterId { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Required]
    public string? UserName { get; set; }
    [Required]
    public string? Bio { get; set; }
    [Url]
    public string? ProfilePicture { get; set; }
    public string[]? following { get; set; }

    public ICollection<Tweet>? Tweets { get; set; }
}