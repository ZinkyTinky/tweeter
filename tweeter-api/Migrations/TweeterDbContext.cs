using System.Text.Json;
using tweeter_api.Models;
using Microsoft.EntityFrameworkCore;

namespace tweeter_api.Migrations;

public class TweeterDbContext : DbContext
{
    public DbSet<Tweet> Tweet { get; set; }
    public DbSet<User> Users { get; set; }

    public TweeterDbContext(DbContextOptions<TweeterDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.TweeterId);
            entity.Property(e => e.Email).IsRequired();
            entity.HasIndex(x => x.Email).IsUnique();
            entity.Property(e => e.Password).IsRequired();
            entity.Property(e => e.Username).IsRequired();
            entity.Property(e => e.Bio).IsRequired();
            entity.Property(e => e.ProfilePicture);

            // Configure `following` to be stored as JSON
            entity.Property(e => e.following)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, new JsonSerializerOptions { WriteIndented = false }),
                    v => JsonSerializer.Deserialize<string[]>(v, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                );
        });

        modelBuilder.Entity<User>().HasData(
            new User
            {
                TweeterId = 1,
                FirstName = "Zian",
                LastName = "Jacobsen",
                Email = "zian@tsale.co.za",
                Password = "Password1!",
                Username = "zianjacobsen",
                Bio = "Honestly just a chill guy",
                ProfilePicture = "https://i.imgur.com/1.jpg",
            }
        );

        modelBuilder.Entity<Tweet>(entity =>
        {
            entity.HasKey(e => e.TweetId);
            entity.Property(e => e.Title).IsRequired();
            entity.Property(e => e.TweetBody).IsRequired();
            entity.Property(e => e.TweeterId).IsRequired();
            entity.HasOne(e => e.Tweeter).WithMany(e => e.Tweets).HasForeignKey(e => e.TweeterId);
        });

        modelBuilder.Entity<Tweet>().HasData(
            new Tweet
            {
                TweetId = 1,
                Title = "Cappa lover",
                TweetBody = "I'm just a chill guy who loves cappuccinos",
                TweeterId = 1
            },
            new Tweet
            {
                TweetId = 2,
                Title = "HC lover",
                TweetBody = "I'm just a chill guy who loves Hot chocolates",
                TweeterId = 1
            }
        );

        
    }
}
