using tweeter_api.Migrations;
using tweeter_api.Models;

namespace tweeter_api.Repositories;

public class TweetRepository : ITweetRepository 
{
    private readonly TweeterDbContext _context;

    public TweetRepository(TweeterDbContext context)
    {
        _context = context;
    }

    public Tweet CreateTweet(Tweet newTweet)
    {
        _context.Tweet.Add(newTweet);
        _context.SaveChanges();
        return newTweet;
    }

    public void DeleteTweetById(int tweetId)
    {
        var tweet = _context.Tweet.Find(tweetId);
        if (tweet != null) {
            _context.Tweet.Remove(tweet); 
            _context.SaveChanges(); 
        }
    }

    public IEnumerable<Tweet> GetAllTweets()
    {
        return _context.Tweet.ToList();
    }

    public Tweet? GetTweetByTitle(string title)
    {
        return _context.Tweet.SingleOrDefault(c => c.Title == title);
    }

    public Tweet? UpdateTweet(Tweet newTweet)
    {
        var originalTweet = _context.Tweet.Find(newTweet.TweetId);
        if (originalTweet != null) {
            originalTweet.Title = newTweet.Title;
            originalTweet.TweetBody = newTweet.TweetBody;
            originalTweet.editedAt = newTweet.editedAt;
            _context.SaveChanges();
        }
        return originalTweet;
    }
}