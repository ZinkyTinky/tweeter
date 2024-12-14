import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';
import { UserDetail } from 'src/app/models/user-detail';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css'],
})
export class TweetListComponent implements OnInit {
  tweetList: Tweet[] = [];
  tweetListNames: { [key: number]: string } = {};

  constructor(private tweetService: TweetService, private router: Router) {}

  ngOnInit(): void {
    this.tweetService.getAllTweets().subscribe((tweet) => {
      this.tweetList = tweet;
      const tweeterIds = new Set<number>();
      for (let tweet of this.tweetList) {
        if (
          tweet.tweeterId !== undefined &&
          !this.tweetListNames[tweet.tweeterId]
        ) {
          tweeterIds.add(tweet.tweeterId);
        }
      }
      //

      tweeterIds.forEach((tweeterId) => {
        this.tweetService.getUserById(tweeterId).subscribe({
          next: (details: UserDetail) => {
            this.tweetListNames[tweeterId] = details.userName ?? 'Unknown User';
            console.log(details);
          },
          error: (error: any) => {
            console.log('Error: ', error);
            if (error.status === 401 || error.status === 403) {
              this.router.navigate(['signin']);
            }
          },
        });
      });
    });
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
    this.tweetService.getAllTweets().subscribe((tweet) => {
      this.tweetList = tweet;
    });
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

  canEdDelTweet(tweet: Tweet): boolean {
    return tweet.tweeterId == this.getActiveTweeter();
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

  connectTweeterToId(tweeterId: number): string {
    return this.tweetListNames[tweeterId];
  }
}
