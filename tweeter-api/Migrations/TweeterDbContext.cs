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

        modelBuilder.Entity<Tweet>(entity =>
        {
            entity.HasKey(e => e.TweetId);
            entity.Property(e => e.Title).IsRequired();
            entity.Property(e => e.TweetBody).IsRequired();
            entity.Property(e => e.TweeterId).IsRequired();
            entity.HasOne(e => e.Tweeter).WithMany(e => e.Tweets).HasForeignKey(e => e.TweeterId);
        });

        modelBuilder.Entity<Tweet>().HasData(
            new Tweet { 
                TweetId = 1,
                Title = "Cappa lover",
                TweetBody = "I'm just a chill guy who loves capppuccinos",
                TweeterId = 1
            },
            new Tweet { 
                TweetId = 2,
                Title = "HC lover",
                TweetBody = "I'm just a chill guy who loves Hot chocolates",
                TweeterId = 1
            }
        );

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.TweeterId);
            entity.Property(e => e.Email).IsRequired();
            entity.HasIndex(x => x.Email).IsUnique();
            entity.Property(e => e.Password).IsRequired();
            entity.Property(e => e.Username).IsRequired();
            entity.Property(e => e.Bio).IsRequired();
            entity.Property(e => e.ProfilePicture);
            entity.Property(e => e.following);
        });
    }
}