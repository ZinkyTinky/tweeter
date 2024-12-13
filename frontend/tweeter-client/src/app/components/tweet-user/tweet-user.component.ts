import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/user-detail';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tweet-user',
  templateUrl: './tweet-user.component.html',
  styleUrls: ['./tweet-user.component.css'],
})
export class TweetUserComponent implements OnInit {
  userTweets: Tweet[] = [];
  userInfo: UserDetail = new UserDetail();

  constructor(
    private tweetService: TweetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const tweeterId = params['tweeterId'];
      this.tweetService.GetTweetsByTweeterId(tweeterId).subscribe((tweet) => {
        this.userTweets = tweet;
      });
      this.tweetService.getUserById(tweeterId).subscribe((userDetails) => {
        this.userInfo = userDetails;
      });
    });
  }
}
