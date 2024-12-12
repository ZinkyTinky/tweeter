using System.Collections.Generic;
using tweeter_api.Models;

namespace tweeter_api.Repositories;
public interface ITweetRepository
{
    IEnumerable<Tweet> GetAllTweets();
    Tweet? GetTweetById(int tweetId);
    Tweet CreateTweet(Tweet newTweet);
    Tweet? UpdateTweet(Tweet newTweet);
    void DeleteTweetById(int tweetId);

}