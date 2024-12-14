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
  tweetList: Tweet[] = [];
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
        this.tweetList = tweet;
      });
      this.tweetService.getUserById(tweeterId).subscribe((userDetails) => {
        this.userInfo = userDetails;
      });
    });
  }

  isLoggedIn(): boolean {
    let isLoggedIn = false;
    this.tweetService.getTweeterID().subscribe(
      (id: number) => {
        isLoggedIn = id != 0;
      },
      (error: any) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['signin']);
        }
      }
    );
    return isLoggedIn;
  }

  canEdDelTweet(tweet: Tweet): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    if (tweet.tweeterId == this.getActiveTweeter()) {
      return true;
    }
    return false;
  }

  getActiveTweeter(): number {
    let TweeterId: number = 0;
    this.tweetService.getTweeterID().subscribe(
      (id: number) => {
        TweeterId = id;
      },
      (error: any) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['signin']);
        }
      }
    );
    return TweeterId;
  }

  deleteTweet(tweetId: number): void {
    this.tweetService.deleteTweet(tweetId.toString()).subscribe(
      () => {
        this.loadTweets();
        alert('Tweet was deleted successfully');
      },
      (error: any) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['signin']);
        }
      }
    );
  }

  loadTweets(): void {
    this.route.params.subscribe((params) => {
      const tweeterId = params['tweeterId'];
      this.tweetService.GetTweetsByTweeterId(tweeterId).subscribe((tweet) => {
        this.tweetList = tweet;
      });
    });
  }
}
