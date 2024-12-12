using tweeter_api.Models;
using tweeter_api.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace tweeter_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TweetController : ControllerBase 
    {
        private readonly ILogger<TweetController> _logger;
        private readonly ITweetRepository _tweetRepository;

        public TweetController(ILogger<TweetController> logger, ITweetRepository repository)
        {
            _logger = logger;
            _tweetRepository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Tweet>> GetTweet() 
        {
            return Ok(_tweetRepository.GetAllTweets());
        }

        [HttpGet]
        [Route("{tweetId:int}")]
        public ActionResult<Tweet> GetTweetById(int id) 
        {
            var tweet = _tweetRepository.GetTweetById(id);
            if (id == null) {
                return NotFound();
            }
            return Ok(id);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<Tweet> CreateTweet(Tweet tweet) 
        {
            if (!ModelState.IsValid || tweet == null) {
                return BadRequest();
            }
            var newTweet = _tweetRepository.CreateTweet(tweet);
            return Created(nameof(GetTweetById), newTweet);
        }

        [HttpPut]
        [Route("{tweetId:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<Tweet> UpdateTweet(Tweet tweet) 
        {
            if (!ModelState.IsValid || tweet == null) {
                return BadRequest();
            }
            return Ok(_tweetRepository.UpdateTweet(tweet));
        }

        [HttpDelete]
        [Route("{tweetId:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult DeleteTweet(int tweetId) 
        {
            _tweetRepository.DeleteTweetById(tweetId); 
            return NoContent();
        }
    }
}