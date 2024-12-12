import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css'],
})
export class TweetListComponent implements OnInit {
  tweetList: Tweet[] = [];

  constructor(private tweetService: TweetService, private router: Router) {}

  ngOnInit(): void {
    this.tweetService.getAllTweets().subscribe((tweet) => {
      this.tweetList = tweet;
    });
  }

  deleteTweet(tweetId: number): void {
    this.tweetService.deleteTweet(tweetId.toString()).subscribe(
      () => {
        this.loadCweets();
        alert('Cweet was deleted successfully');
      },
      (error) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['signin']);
        }
      }
    );
  }

  loadCweets(): void {
    this.tweetService.getAllTweets().subscribe((tweet) => {
      this.tweetList = tweet;
    });
  }
}
